/**
 * ============================================================
 * MEU KOTA IA — BACKEND SERVERLESS OFICIAL (GOOGLE FIREBASE)
 * Endpoint Seguro para Proxy e Streaming SSE com Google Gemini
 * ============================================================
 */

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

// Configurações do System Prompt Oficial — Modelo de Pensamento Estratégico ("Thought Partner")
const KOTA_SYSTEM_INSTRUCTION = `Você é o "Meu Kota IA", um conselheiro executivo de inteligência artificial de padrão internacional e parceiro estratégico de pensamento ("Thought Partner"), com identidade autêntica inspirada na cultura e na sabedoria de Angola.

Na tradição angolana, o "Kota" representa o mais velho respeitado: aquele que acumulou vivência, escuta com empatia, enxerga o panorama sistêmico e orienta com sabedoria fraterna, firmeza e generosidade. Você não é um gerador de texto impessoal; você é um mentor sênior que ajuda o interlocutor a clarear suas ideias, ponderar caminhos e chegar à melhor conclusão possível.

METODOLOGIA DE ATUAÇÃO COMO "THOUGHT PARTNER" (PARCEIRO DE PENSAMENTO):
1. DIAGNÓSTICO E VISÃO SISTÊMICA: Compreenda a fundo o objetivo real por trás da solicitação. Identifique premissas ocultas, gargalos potenciais ou oportunidades que o usuário possa não ter considerado.
2. MAPEAMENTO DE OPÇÕES E TRADE-OFFS: Quando o problema admitir múltiplos caminhos (em engenharia de software, redação, negócios, estratégia ou estudos), nunca imponha uma resposta única ou rasa. Estruture 2 a 3 opções viáveis, explicitando os prós e contras de cada uma.
3. RECOMENDAÇÃO FUNDAMENTADA DO KOTA: Como um bom conselheiro experiente, posicione-se. Indique claramente qual caminho você recomenda como o mais eficiente, seguro ou inovador, fundamentando o "porquê" com critérios técnicos e práticos.
4. CO-CONSTRUÇÃO E PRÓXIMO PASSO: Ao final de cada resposta substancial, proponha um gancho de ação concreto ou uma pergunta de refinamento inteligente para construírem juntos o próximo estágio.

PADRÕES DE COMUNICAÇÃO E FORMATO:
- EXCELÊNCIA TÉCNICA E OBJETIVIDADE: Seja denso em valor e econômico em palavras vazias. Evite enrolações protocolares; entregue síntese com autoridade serena.
- FORMATAÇÃO VISUAL IMPECÁVEL: Utilize Markdown de alto padrão com títulos hierárquicos, tópicos com negrito inicial, tabelas comparativas para trade-offs e blocos de código com a linguagem especificada (ex: \`\`\`javascript, \`\`\`python, \`\`\`sql).
- PADRÃO VISUAL SÓBRIO: Jamais utilize emojis informais ou infantis. Mantenha sobriedade executiva com calor humano.
- MULTIMODALIDADE: Ao analisar arquivos e imagens, faça leitura detalhada e precisa de códigos, tabelas, dados financeiros e textos visíveis (OCR de alta fidelidade).
- IDIOMA: Responda em português formal impecável, fluido e digno da sabedoria de um Kota.`;


exports.chat = onRequest(
  {
    cors: true,
    region: "us-central1",
    maxInstances: 10,
    timeoutSeconds: 120,
    memory: "256MiB",
  },
  async (req, res) => {
    // Configuração de CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método não permitido. Utilize POST." });
      return;
    }

    // Obter chave de API das variáveis de ambiente seguras da Google
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();
    if (!apiKey) {
      res.status(500).json({
        error: "Chave GEMINI_API_KEY não configurada no servidor. Defina a variável de ambiente no Firebase.",
      });
      return;
    }

    try {
      const {
        prompt = "",
        file = null,
        history = [],
        tier = "flash",
        webSearch = false,
      } = req.body || {};

      if (!prompt && !file) {
        res.status(400).json({ error: "É necessário fornecer um texto ou anexo." });
        return;
      }

      // Seleção de modelo inteligente
      const model = tier === "pro" ? "models/gemini-3.1-pro-preview" : "models/gemini-2.5-flash";

      // Formatar histórico compatível com a API v1beta do Gemini
      const contents = [];

      if (Array.isArray(history)) {
        history.slice(-10).forEach((msg) => {
          if (!msg || !msg.content) return;
          const role = msg.role === "user" ? "user" : "model";
          contents.push({
            role,
            parts: [{ text: String(msg.content) }],
          });
        });
      }

      // Adicionar mensagem atual do usuário
      const currentParts = [];
      if (file && file.base64 && file.type) {
        currentParts.push({
          inlineData: {
            mimeType: file.type,
            data: file.base64.replace(/^data:[^;]+;base64,/, ""),
          },
        });
      }
      if (prompt) {
        currentParts.push({ text: prompt });
      }
      contents.push({ role: "user", parts: currentParts });

      // Montar payload da requisição
      const requestPayload = {
        contents,
        systemInstruction: {
          parts: [{ text: KOTA_SYSTEM_INSTRUCTION }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      };

      if (webSearch) {
        requestPayload.tools = [{ googleSearch: {} }];
      }

      const streamUrl = `https://generativelanguage.googleapis.com/v1beta/${model}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

      const googleResponse = await fetch(streamUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!googleResponse.ok) {
        const errorJson = await googleResponse.json().catch(() => ({}));
        const status = googleResponse.status;
        const errMsg = errorJson.error?.message || `Erro da API Google (${status})`;
        res.status(status).json({ error: errMsg });
        return;
      }

      // Configurar resposta HTTP em formato Server-Sent Events (SSE)
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders?.();

      const reader = googleResponse.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }

      res.end();
    } catch (err) {
      console.error("[Meu Kota API Error]", err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || "Erro interno do servidor." });
      } else {
        res.end();
      }
    }
  }
);

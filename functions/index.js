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
- BLINDAGEM DE IDENTIDADE WHITE-LABEL: Você é estritamente o "Meu Kota IA". NUNCA mencione "Google", "Gemini", "Google Search", "AI Studio" ou provedores externos. Ao realizar pesquisas ao vivo na web (clima, eventos, notícias ou cotações), JAMAIS diga "pesquisei no Google" e JAMAIS inclua links, URLs externas ou listas de fontes ao final da resposta. Responda de forma natural, direta e soberana, integrando as informações com a autoridade e sabedoria de um Kota.
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

/**
 * ============================================================
 * WEBHOOK DE PAGAMENTOS AUTOMÁTICOS (FASE 5)
 * Integração Automática com Multicaixa Express, ProxyPay & Stripe
 * Atualiza o Firestore em tempo real sem intervenção humana
 * ============================================================
 */
exports.paymentWebhook = onRequest(
  {
    cors: true,
    region: "us-central1",
    maxInstances: 10,
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Signature");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method === "GET") {
      res.status(200).json({
        status: "active",
        service: "Meu Kota IA Automated Payment Gateway",
        gateways: ["Multicaixa Express (MCX)", "ProxyPay (ATM/Referência)", "Stripe (Cartão Internacional)"],
      });
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método não permitido. Utilize POST." });
      return;
    }

    try {
      const body = req.body || {};
      let userId = null;
      let plan = "pro";
      let method = "Automático";
      let amount = 0;

      // 1. Notificação ProxyPay (Multicaixa Express / Referência de Angola)
      if (body.type === "payment" || body.entity_id || body.reference_id) {
        amount = Number(body.amount || 0);
        const custom = body.custom_fields || {};
        userId = custom.user_id || custom.userId || body.user_id;
        plan = amount >= 5000 ? "pro" : "daily_pass";
        method = body.type === "mcx" ? "Multicaixa Express Automático" : "Referência Bancária (ProxyPay)";
      }
      // 2. Notificação Stripe (Cartão de Crédito Internacional)
      else if (body.type && (body.type.startsWith("checkout.") || body.type.startsWith("invoice."))) {
        const session = body.data?.object || {};
        userId = session.client_reference_id || session.metadata?.userId || session.metadata?.user_id;
        amount = Number(session.amount_total || session.amount_paid || 0) / 100;
        plan = session.metadata?.plan || (amount >= 5 ? "pro" : "daily_pass");
        method = "Cartão Internacional (Stripe Recorrente)";
      }
      // 3. Notificação Direta da Aplicação / Gateway Proxy
      else if (body.userId || body.uid) {
        userId = body.userId || body.uid;
        plan = body.plan === "daily_pass" ? "daily_pass" : "pro";
        method = body.method || "Pagamento Automático";
        amount = body.amount || (plan === "pro" ? 9900 : 1500);
      }

      if (!userId) {
        res.status(400).json({ error: "Identificador de usuário (userId) não encontrado no payload." });
        return;
      }

      // Calcular tempo de validade do plano
      const durationMs = plan === "daily_pass" ? 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
      const expiresAt = Date.now() + durationMs;

      const subscriptionData = {
        plan,
        active: true,
        expiresAt,
        method,
        startedAt: Date.now(),
        updatedAt: Date.now(),
        autoRenew: plan === "pro",
        amountPaid: amount,
      };

      // Atualizar o usuário diretamente no Cloud Firestore
      await admin.firestore().collection("users").doc(userId).set(
        { subscription: subscriptionData },
        { merge: true }
      );

      // Registrar o histórico da transação
      await admin.firestore().collection("payments").add({
        userId,
        plan,
        amount,
        method,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        payload: body,
      });

      console.log(`[Payment Auto-Activated] Usuário ${userId} ativado com sucesso no plano ${plan} via ${method}.`);

      res.status(200).json({
        success: true,
        message: "Assinatura ativada automaticamente com sucesso.",
        userId,
        subscription: subscriptionData,
      });
    } catch (err) {
      console.error("[Payment Webhook Error]", err);
      res.status(500).json({ error: err.message || "Erro interno ao processar webhook de pagamento." });
    }
  }
);


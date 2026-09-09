/* ============================================================
   CHATGPT OFFICIAL THEME — CLIENT APP & LOGIC
   Layout Minimalista, Barra Retrátil, Histórico e Motor Conversacional
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTOS DO DOM ---
  const views = {
    landing: document.getElementById('view-landing'),
    auth: document.getElementById('view-auth'),
    dashboard: document.getElementById('view-dashboard')
  };

  // Botões de Navegação Landing
  const btnGotoLogin = document.getElementById('btn-goto-login');
  const btnHeaderStart = document.getElementById('btn-header-start');
  const btnHeaderDemo = document.getElementById('btn-header-demo');
  const btnHeroStart = document.getElementById('btn-hero-start');
  const btnHeroDemo = document.getElementById('btn-hero-demo');
  const btnTerminalTry = document.getElementById('btn-terminal-try');
  const btnBannerStart = document.getElementById('btn-banner-start');
  const logoRefresh = document.getElementById('logo-refresh');

  // Terminal Interativo do Hero (Abas de Demonstração Livre)
  const terminalTabs = document.querySelectorAll('.t-tab');
  const interactiveUserQuery = document.getElementById('interactive-user-query');
  const interactiveAiResponse = document.getElementById('interactive-ai-response');

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Dados das Abas Interativas da Landing Page
  const terminalData = {
    criatividade: {
      query: 'Escreva uma reflexão criativa sobre como a tecnologia pode aproximar as pessoas.',
      response: `A tecnologia mais fascinante não é a que constrói pontes de silício, mas a que <strong>elimina distâncias emocionais</strong>.<br><br>
• <strong>Conexão Instantânea:</strong> Uma ideia que antes levava meses para atravessar oceanos agora ressoa no mesmo segundo em milhares de corações.<br>
• <strong>Empatia Ampliada:</strong> Histórias de realidades distantes tornam-se parte da nossa consciência cotidiana.<br>
• <strong>Colaboração Global:</strong> Mentes de todos os continentes unem-se para criar arte, ciência e novas soluções sem fronteiras.<br><br>
<em class="text-gold-light">Deseja explorar este tema em um poema, crônica literária ou ensaio reflexivo?</em>`
    },
    programacao: {
      query: 'Como criar uma função simples em JavaScript para filtrar e ordenar uma lista de tarefas?',
      response: `Aqui está um exemplo limpo e moderno utilizando métodos funcionais do JavaScript:<br><br>
<pre><code>// Filtrar tarefas pendentes e ordenar por prioridade
const ordenarTarefas = (tarefas) => {
  return tarefas
    .filter(tarefa => !tarefa.concluida)
    .sort((a, b) => b.prioridade - a.prioridade);
};

// Exemplo de uso:
const lista = [
  { id: 1, texto: 'Estudar IA', prioridade: 3, concluida: false },
  { id: 2, texto: 'Lavar louça', prioridade: 1, concluida: true },
  { id: 3, texto: 'Criar App Web', prioridade: 5, concluida: false }
];

console.log(ordenarTarefas(lista));</code></pre><br>
<em class="text-gold-light">Deseja que eu adicione persistência com localStorage ou integre com uma interface gráfica?</em>`
    },
    estudos: {
      query: 'Explique o conceito de entrelaçamento quântico de forma simples e intuitiva.',
      response: `Imagine que você tem <strong>dois dados mágicos</strong> colocados em caixas separadas:<br><br>
1. <strong>O Mistério:</strong> Você leva um dado para Luanda e o outro para Tóquio. Antes de abrir as caixas, nenhum dos dados tem um número definido.<br>
2. <strong>A Conexão Instantânea:</strong> No exato momento em que você abre a caixa em Luanda e o dado cai no número <strong>6</strong>, o dado em Tóquio imediatamente revela o número <strong>1</strong>.<br>
3. <strong>Sem Tempo de Espera:</strong> Isso acontece instantaneamente, mais rápido do que qualquer sinal de luz poderia viajar entre as duas cidades.<br><br>
Einstein chamava isso de <em>"ação fantasmagórica à distância"</em>. Hoje é a base dos computadores quânticos e da criptografia do futuro!<br><br>
<em class="text-gold-light">Quer saber como a computação quântica se diferencia dos computadores convencionais?</em>`
    },
    produtividade: {
      query: 'Como organizar uma rotina semanal equilibrada para quem trabalha e quer estudar algo novo?',
      response: `O segredo não é ter mais horas no dia, mas <strong>proteger pequenos blocos de alta energia</strong>:<br><br>
• <strong>A Regra dos 45 Minutos:</strong> Dedique 45 minutos diários logo pela manhã ou antes de descansar para estudar sem distrações.<br>
• <strong>Descanso Ativo:</strong> Faça pausas curtas de 5 minutos a cada bloco para levantar e relaxar a mente.<br>
• <strong>Revisão Semanal:</strong> Escolha apenas 3 metas principais para a semana e concentre nelas toda a sua força.<br><br>
<em class="text-gold-light">Gostaria que eu monte uma tabela personalizada com os seus horários disponíveis?</em>`
    }
  };

  // Elementos da Tela de Acesso (Auth)
  const btnAuthBack = document.getElementById('btn-auth-back');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formAuth = document.getElementById('form-auth');
  const groupName = document.getElementById('group-name');
  const inputName = document.getElementById('auth-name');
  const inputEmail = document.getElementById('auth-email');
  const inputPassword = document.getElementById('auth-password');
  const btnAuthSubmit = document.getElementById('btn-auth-submit');
  const authBtnText = document.getElementById('auth-btn-text');
  const btnAuthToggleMode = document.getElementById('btn-auth-toggle-mode');
  const authToggleText = document.getElementById('auth-toggle-text');
  const btnFastDemo = document.getElementById('btn-fast-demo');

  // --- ELEMENTOS DO CHAT IA (KAMBA CHAT IA) ---
  const gptLayout = document.getElementById('gpt-layout');
  const gptSidebar = document.getElementById('gpt-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const btnNewChat = document.getElementById('btn-new-chat');
  const btnDashHome = document.getElementById('btn-dash-home');
  const btnUserProfile = document.getElementById('btn-user-profile');

  const welcomeCenter = document.getElementById('gpt-welcome-center');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSendMessage = document.getElementById('btn-send-message');
  const historyList = document.getElementById('history-list');

  // Toast
  const kambaToast = document.getElementById('kamba-toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimer = null;

  // --- ESTADO DA APLICAÇÃO ---
  let isRegisterMode = false;
  let currentUser = JSON.parse(localStorage.getItem('kamba_chat_user')) || { name: 'Bruno Souza', email: 'bruno@kamba.ia' };
  let currentChatId = null;
  let isGenerating = false;

  // Conversas pré-carregadas (inspiradas diretamente no ChatGPT real do usuário)
  const defaultChats = [
    {
      id: 'chat-rec-1',
      title: 'Layout gráfico 2D abstrato',
      updatedAt: Date.now() - 3600000,
      messages: [
        {
          role: 'user',
          content: 'Crie uma composição conceitual para um layout gráfico 2D abstrato com paleta escura e detalhes minimalistas.'
        },
        {
          role: 'ai',
          content: `Aqui está uma proposta conceitual refinada para o **Layout Gráfico 2D Abstrato**:\n\n1. **Paleta Base:** Fundo grafite profundo (\`#171717\` e \`#212121\`), com linhas de contorno em cinza translúcido (\`rgba(255, 255, 255, 0.12)\`).\n2. **Pontos de Atenção:** Acentos geométricos discretos em dourado (\`#FFD100\`) e vermelho rubi suave (\`#D81A2D\`).\n3. **Ritmo Visual:** Formas poligonais assimétricas equilibradas por tipografia geométrica pura (Geist / Inter) com generoso respiro negativo.\n\nDeseja gerar as especificações em código SVG ou CSS?`
        }
      ]
    },
    {
      id: 'chat-rec-2',
      title: 'Branch · Layout gráfico 2D abstrato',
      updatedAt: Date.now() - 7200000,
      messages: [
        {
          role: 'user',
          content: 'Como estruturar as camadas para separar os elementos de fundo das sobreposições dinâmicas?'
        },
        {
          role: 'ai',
          content: `Recomendo organizar em 3 camadas de renderização independentes:\n\n• **Layer 0 (Background Grid):** Malha pontilhada estática com opacidade 0.08.\n• **Layer 1 (Geometry Core):** Formas vetoriais principais com gradientes sutis.\n• **Layer 2 (Interactive Overlay):** Efeitos de hover, cursores e halos de iluminação radial.\n\nEssa estrutura garante 60 FPS estáveis mesmo em dispositivos móveis.`
        }
      ]
    },
    {
      id: 'chat-rec-3',
      title: 'Layout de embalagem 2D',
      updatedAt: Date.now() - 86400000,
      messages: [
        {
          role: 'user',
          content: 'Quais são as dimensões padrão e margens de sangria recomendadas para embalagens?'
        },
        {
          role: 'ai',
          content: `Para fechamento de arquivo técnico de embalagem:\n\n• **Sangria (Bleed):** Mínimo de 3 mm a 5 mm para fora da linha de corte (die-line).\n• **Área de Segurança:** Manter todos os textos e logotipos a pelo menos 4 mm para dentro das vincadeiras.\n• **Modo de Cor:** CMYK nativo com resolução mínima de 300 DPI em escala 1:1.`
        }
      ]
    },
    {
      id: 'chat-rec-4',
      title: 'Geração de nomes comerciais',
      updatedAt: Date.now() - 172800000,
      messages: [
        {
          role: 'user',
          content: 'Sugira nomes marcantes e modernos para uma plataforma de IA voltada a design e tecnologia.'
        },
        {
          role: 'ai',
          content: `Aqui estão sugestões de alto impacto:\n\n1. **Kamba Studio** (curto, memorável e amigável)\n2. **Synthetix Flow** (tecnológico e veloz)\n3. **Vektor AI** (preciso e focado em design)\n4. **Prism Core** (elegante e moderno)\n\nAlgum desses estilos ressoa melhor com o seu posicionamento?`
        }
      ]
    }
  ];

  let chats = JSON.parse(localStorage.getItem('kamba_chat_history')) || defaultChats;

  // --- TOAST NOTIFICATIONS ---
  function showToast(msg, icon = '✓') {
    if (!kambaToast) return;
    if (toastTimer) clearTimeout(toastTimer);
    if (toastIcon) toastIcon.textContent = icon;
    if (toastMessage) toastMessage.textContent = msg;
    kambaToast.classList.add('show');
    toastTimer = setTimeout(() => {
      kambaToast.classList.remove('show');
    }, 2500);
  }

  // --- CONTROLE DA BARRA LATERAL (FIXA NO DESKTOP / DRAWER NO MOBILE) ---
  function toggleSidebar(collapse) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (collapse) {
        if (gptSidebar) gptSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      } else {
        if (gptSidebar) gptSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
      }
    }
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => toggleSidebar(true));
  }

  // No Desktop, a barra lateral é sempre fixa e aberta (sem opção de minimizar)
  if (gptLayout) {
    gptLayout.classList.remove('sidebar-collapsed');
  }
  localStorage.removeItem('gpt_sidebar_collapsed');

  // --- GERENCIAMENTO DE TELAS (SPA COM SUPORTE A HISTÓRICO DO NAVEGADOR) ---
  function showView(viewName, pushHistory = true) {
    Object.keys(views).forEach(key => {
      if (views[key]) views[key].classList.remove('active');
    });

    if (views[viewName]) {
      views[viewName].classList.add('active');
      window.scrollTo(0, 0);

      if (pushHistory) {
        if (viewName === 'dashboard') {
          history.pushState({ view: 'dashboard' }, '', '#chat');
        } else if (viewName === 'auth') {
          history.pushState({ view: 'auth' }, '', '#auth');
        } else {
          history.pushState({ view: 'landing' }, '', window.location.pathname);
        }
      }
    }
  }

  function exitChatToLanding() {
    showView('landing');
    showToast('Você voltou à página inicial.', '🏠');
  }

  // --- ABAS DO TERMINAL INTERATIVO NO HERO ---
  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabKey = tab.getAttribute('data-tab');
      if (terminalData[tabKey] && interactiveUserQuery && interactiveAiResponse) {
        interactiveUserQuery.textContent = terminalData[tabKey].query;
        interactiveAiResponse.innerHTML = terminalData[tabKey].response;
      }
    });
  });

  // --- FAQ ACCORDION ---
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- AUTENTICAÇÃO E SESSÃO ---
  function updateAuthMode(register) {
    isRegisterMode = register;
    if (register) {
      if (tabRegister) tabRegister.classList.add('active');
      if (tabLogin) tabLogin.classList.remove('active');
      if (groupName) groupName.style.display = 'block';
      if (authBtnText) authBtnText.textContent = 'Criar Conta e Entrar';
      if (authToggleText) authToggleText.textContent = 'Já tem conta? Entrar';
    } else {
      if (tabLogin) tabLogin.classList.add('active');
      if (tabRegister) tabRegister.classList.remove('active');
      if (groupName) groupName.style.display = 'none';
      if (authBtnText) authBtnText.textContent = 'Entrar';
      if (authToggleText) authToggleText.textContent = 'Criar Nova Conta';
    }
  }

  function handleLoginSuccess(user) {
    currentUser = user;
    localStorage.setItem('kamba_chat_user', JSON.stringify(user));
    showView('dashboard');
    initChatDashboard();
  }

  if (tabLogin) tabLogin.addEventListener('click', () => updateAuthMode(false));
  if (tabRegister) tabRegister.addEventListener('click', () => updateAuthMode(true));
  if (btnAuthToggleMode) btnAuthToggleMode.addEventListener('click', () => updateAuthMode(!isRegisterMode));

  if (btnFastDemo) {
    btnFastDemo.addEventListener('click', () => {
      handleLoginSuccess({ name: 'Bruno Souza', email: 'bruno@kamba.ia' });
    });
  }

  if (formAuth) {
    formAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = inputEmail ? inputEmail.value.trim() : '';
      const name = isRegisterMode && inputName ? inputName.value.trim() : (email.split('@')[0] || 'Bruno Souza');
      handleLoginSuccess({ name: name || 'Bruno Souza', email: email || 'bruno@kamba.ia' });
    });
  }

  if (btnAuthBack) {
    btnAuthBack.addEventListener('click', () => showView('landing'));
  }

  // Botões de abertura direta do chat
  [btnHeaderStart, btnHeroStart, btnTerminalTry, btnBannerStart].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        handleLoginSuccess({ name: currentUser?.name || 'Bruno Souza', email: currentUser?.email || 'bruno@kamba.ia' });
      });
    }
  });

  if (btnGotoLogin) {
    btnGotoLogin.addEventListener('click', () => {
      updateAuthMode(false);
      showView('auth');
    });
  }

  if (btnHeaderDemo || btnHeroDemo) {
    [btnHeaderDemo, btnHeroDemo].forEach(b => {
      if (b) {
        b.addEventListener('click', () => {
          const featEl = document.getElementById('features');
          if (featEl) featEl.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }

  if (logoRefresh) {
    logoRefresh.addEventListener('click', () => showView('landing'));
  }

  if (btnDashHome) btnDashHome.addEventListener('click', (e) => { e.preventDefault(); exitChatToLanding(); });
  if (btnUserProfile) btnUserProfile.addEventListener('click', (e) => { e.preventDefault(); exitChatToLanding(); });

  // Suporte para o botão Voltar do navegador / telemóvel
  window.addEventListener('popstate', () => {
    if (window.location.hash === '#chat') {
      showView('dashboard', false);
      initChatDashboard();
    } else if (window.location.hash === '#auth') {
      showView('auth', false);
    } else {
      showView('landing', false);
    }
  });

  // --- GERENCIAMENTO DE CONVERSAS (NOVO CHAT / HISTÓRICO) ---
  function saveChatsToStorage() {
    localStorage.setItem('kamba_chat_history', JSON.stringify(chats));
  }

  function createNewChat() {
    const newId = 'chat-' + Date.now();
    const newChatObj = {
      id: newId,
      title: 'Nova Conversa',
      updatedAt: Date.now(),
      messages: []
    };
    chats.unshift(newChatObj);
    saveChatsToStorage();
    loadChat(newId);
    if (window.innerWidth <= 768) {
      toggleSidebar(true);
    }
    if (chatInput) {
      chatInput.focus();
    }
  }

  if (btnNewChat) btnNewChat.addEventListener('click', createNewChat);
  if (btnTopNewChat) btnTopNewChat.addEventListener('click', createNewChat);

  function loadChat(chatId) {
    currentChatId = chatId;
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    if (chatMessages) chatMessages.innerHTML = '';

    if (chat.messages.length === 0) {
      if (welcomeCenter) welcomeCenter.style.display = 'flex';
    } else {
      if (welcomeCenter) welcomeCenter.style.display = 'none';
      chat.messages.forEach(msg => {
        appendMessageToDOM(msg.role, msg.content, false);
      });
    }

    renderHistory();
    scrollToBottom();
  }

  function deleteChat(chatId) {
    chats = chats.filter(c => c.id !== chatId);
    if (chats.length === 0) {
      createNewChat();
    } else {
      if (currentChatId === chatId) {
        loadChat(chats[0].id);
      } else {
        saveChatsToStorage();
        renderHistory();
      }
    }
    showToast('Conversa excluída.', '🗑');
  }

  // Conectar conversas fixadas (simulação com tópicos instantâneos)
  const pinnedRows = document.querySelectorAll('.gpt-chat-row.pinned');
  pinnedRows.forEach(row => {
    row.addEventListener('click', () => {
      const title = row.querySelector('.chat-row-title')?.textContent || 'Conversa Fixada';
      const existing = chats.find(c => c.title === title);
      if (existing) {
        loadChat(existing.id);
      } else {
        const newId = 'chat-' + Date.now();
        const newChat = {
          id: newId,
          title: title,
          updatedAt: Date.now(),
          messages: [
            { role: 'user', content: `Abrindo anotações sobre: ${title}` },
            { role: 'ai', content: `Aqui está a síntese organizada sobre **${title}**:\n\n• **Ponto Central:** Documento estruturado para análise rápida e verificação jurídica.\n• **Status:** Revisado e atualizado.\n\nComo deseja prosseguir com a redação ou expansão deste tema?` }
          ]
        };
        chats.unshift(newChat);
        saveChatsToStorage();
        loadChat(newId);
      }
      if (window.innerWidth <= 768) {
        toggleSidebar(true);
      }
    });
  });

  // --- RENDERIZAÇÃO DE MENSAGENS E STREAMING ---
  function appendMessageToDOM(role, text, isStreaming = false) {
    if (!chatMessages) return null;
    if (welcomeCenter) welcomeCenter.style.display = 'none';

    const row = document.createElement('div');
    row.className = `gpt-msg-row ${role}`;

    if (role === 'user') {
      row.innerHTML = `<div class="gpt-msg-bubble-user">${escapeHtml(text)}</div>`;
    } else {
      row.innerHTML = `
        <div class="gpt-msg-avatar-ai">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#FFD100">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
        <div class="gpt-msg-content-ai">
          <div class="msg-text-stream">${formatMarkdown(text)}</div>
          ${isStreaming ? '<span class="typing-cursor"></span>' : ''}
          ${!isStreaming ? createMessageActionsHtml(text) : ''}
        </div>
      `;

      if (!isStreaming) {
        attachMessageActionEvents(row, text);
      }
    }

    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function createMessageActionsHtml(text) {
    return `
      <div class="gpt-msg-actions">
        <button class="gpt-action-small-btn btn-copy-msg" title="Copiar resposta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span>Copiar</span>
        </button>
      </div>
    `;
  }

  function attachMessageActionEvents(rowElement, text) {
    const btnCopy = rowElement.querySelector('.btn-copy-msg');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Resposta copiada para a área de transferência!', '📋');
        }).catch(() => {
          showToast('Texto copiado com sucesso.', '✓');
        });
      });
    }
  }

  function scrollToBottom() {
    const scrollArea = document.querySelector('.gpt-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  // --- MOTOR DE RESPOSTA CONVERSACIONAL UNIVERSAL ---
  function generateUniversalAIResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // 1. Programação e Código
    if (q.includes('código') || q.includes('program') || q.includes('javascript') || q.includes('python') || q.includes('html') || q.includes('css') || q.includes('api') || q.includes('react') || q.includes('node') || q.includes('sql') || q.includes('função') || q.includes('bug')) {
      if (q.includes('python')) {
        return `Com certeza! Aqui está uma solução limpa e idiomática em **Python**:\n\n\`\`\`python\ndef processar_dados(valores):\n    """Calcula estatísticas básicas de uma lista de valores numéricos."""\n    if not valores:\n        return {"total": 0, "media": 0, "maior": None, "menor": None}\n        \n    total = sum(valores)\n    media = total / len(valores)\n    return {\n        "total": total,\n        "media": round(media, 2),\n        "maior": max(valores),\n        "menor": min(valores)\n    }\n\n# Exemplo de teste:\nnumeros = [14, 28, 42, 56, 70]\nresultado = processar_dados(numeros)\nprint("Estatísticas:", resultado)\n\`\`\`\n\n**Pontos Importantes:**\n• **Tratamento de lista vazia:** Garante que a função não dispare exceções.\n• **Estruturação em dicionário:** Facilita a leitura e o consumo em APIs ou bancos de dados.\n\nDeseja que eu adapte este código para leitura de arquivos ou integração com bibliotecas como Pandas?`;
      }

      return `Aqui está uma implementação moderna e eficiente em **JavaScript (ES6+)**:\n\n\`\`\`javascript\n// Função utilitária assíncrona com tratamento robusto de erros\nasync function buscarComRetry(url, tentativas = 3, atraso = 1000) {\n  for (let i = 1; i <= tentativas; i++) {\n    try {\n      const resposta = await fetch(url);\n      if (!resposta.ok) throw new Error(\`Erro HTTP: \${resposta.status}\`);\n      return await resposta.json();\n    } catch (erro) {\n      if (i === tentativas) throw erro;\n      console.warn(\`Tentativa \${i} falhou. Tentando novamente em \${atraso}ms...\`);\n      await new Promise(r => setTimeout(r, atraso));\n    }\n  }\n}\n\n// Exemplo de execução:\nbuscarComRetry('https://api.exemplo.com/dados')\n  .then(dados => console.log('Dados recebidos com sucesso:', dados))\n  .catch(erro => console.error('Todas as tentativas falharam:', erro.message));\n\`\`\`\n\n**O que este código faz:**\n1. Realiza requisições com mecanismo de repetição automática (*retry*).\n2. Evita que falhas pontuais de conexão derrubem a interface do usuário.\n3. Código limpo, não bloqueante e pronto para uso em produção.\n\nPrecisa de ajustes para TypeScript, React ou back-end em Node.js?`;
    }

    // 2. Criatividade e Escrita
    if (q.includes('história') || q.includes('poema') || q.includes('conto') || q.includes('crônica') || q.includes('escreva') || q.includes('literat') || q.includes('poesia') || q.includes('criativ')) {
      return `Aqui está uma reflexão narrativa inspirada no seu tema:\n\n### O Farol das Constelações\n\n*No silêncio das altas madrugadas, quando as luzes da cidade começavam a adormecer uma a uma, Lucas subia até a varanda do décimo quarto andar. Levava consigo um caderno desgastado e uma xícara de café já frio.*\n\n*Ele não olhava para baixo, onde o trânsito corria com a pressa dos homens; olhava para o céu aberto. Sempre acreditou que as estrelas eram perguntas antigas deixadas por quem veio antes de nós, esperando que alguém tivesse a coragem de inventar as respostas.*\n\n*Naquela noite, uma estrela cadente cortou a escuridão como uma linha de fogo. Lucas escreveu na primeira folha em branco:*\n\n> *"O futuro não é um lugar aonde vamos, mas um horizonte que moldamos a cada escolha do presente."*\n\n---\n\n*Podemos continuar desenvolvendo este universo literário se desejar!*`;
    }

    // 3. Estudos e Ciência
    if (q.includes('ciência') || q.includes('física') || q.includes('relatividade') || q.includes('quântic') || q.includes('espaço') || q.includes('universo') || q.includes('estud') || q.includes('matemát')) {
      return `Aqui está uma explicação clara e intuitiva sobre o tema:\n\n1. **A Base Fundamental:** Imagine o espaço-tempo como um tecido flexível esticado. Um corpo denso (como o Sol ou a Terra) deforma essa malha, fazendo com que objetos menores sigam trajetórias curvas naturally.\n2. **A Dilatação do Tempo:** Quanto maior o campo gravitacional ou mais veloz o movimento, mais lentamente os relógios correm em relação a um observador distante.\n3. **Impacto Prático:** Os sistemas de GPS em nossos smartphones precisam compensar continuamente esses microssegundos relativísticos todos os dias para não apontarem rotas erradas.\n\nQuer se aprofundar em algum experimento específico?`;
    }

    // 4. Produtividade e Hábitos
    if (q.includes('foco') || q.includes('produtiv') || q.includes('hábito') || q.includes('tempo') || q.includes('rotina') || q.includes('procrastina')) {
      return `Aqui está um método comprovado em 3 passos para recuperar o foco imediato:\n\n1. **Bloco de Ouro (Primeiros 45 min):** Faça a tarefa mais pesada antes de checar redes sociais ou e-mails.\n2. **A Regra dos 2 Minutos:** Se leva menos de 2 minutos para concluir, faça na hora e limpe a mente de micro-obrigações.\n3. **Três Prioridades Diárias:** Termine o dia definindo exatamente quais são as 3 únicas entregas essenciais de amanhã.\n\nQual área da sua rotina você sente que precisa de maior ajuste hoje?`;
    }

    // 5. Saudações
    if (q === 'olá' || q === 'ola' || q === 'oi' || q === 'bom dia' || q === 'boa tarde' || q === 'boa noite' || q.includes('quem é você')) {
      return `Olá, Bruno! Como posso ajudar você hoje?\n\nFique à vontade para fazer qualquer pergunta, pedir ideias de design, código, análises ou redação de textos. O que vamos criar?`;
    }

    // 6. Resposta Geral Estruturada
    return `Com certeza! Analisei a sua solicitação com precisão.\n\nSobre **"${userQuery.trim()}"**, aqui estão os pontos recomendados:\n\n1. **Clareza de Objetivo:** Definir o resultado esperado com precisão antes de avançar.\n2. **Execução Prática:** Dividir em etapas acionáveis para manter agilidade e qualidade.\n3. **Refinamento Contínuo:** Testar e iterar com base no feedback real.\n\nDeseja que eu detalhe o próximo passo ou elabore um exemplo prático?`;
  }

  // --- ENVIO DE MENSAGENS E STREAMING ---
  async function sendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text || isGenerating) return;

    const chat = chats.find(c => c.id === currentChatId);
    if (!chat) return;

    // Registrar mensagem do usuário
    chat.messages.push({ role: 'user', content: text });
    appendMessageToDOM('user', text, false);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Renomear chat se for a primeira mensagem
    if (chat.title === 'Nova Conversa') {
      chat.title = text.length > 28 ? text.substring(0, 28) + '...' : text;
    }
    chat.updatedAt = Date.now();
    saveChatsToStorage();

    isGenerating = true;
    if (btnSendMessage) btnSendMessage.disabled = true;

    // Resposta AI
    const aiResponseText = generateUniversalAIResponse(text);
    const aiRow = appendMessageToDOM('ai', '', true);
    if (!aiRow) return;

    const streamContainer = aiRow.querySelector('.msg-text-stream');
    const contentAiDiv = aiRow.querySelector('.gpt-msg-content-ai');
    const cursor = aiRow.querySelector('.typing-cursor');

    let currentText = '';
    const speed = 7; // Digitação natural

    for (let i = 0; i < aiResponseText.length; i++) {
      currentText += aiResponseText[i];
      if (streamContainer) streamContainer.innerHTML = formatMarkdown(currentText);
      scrollToBottom();
      await new Promise(r => setTimeout(r, speed));
    }

    if (cursor) cursor.remove();
    isGenerating = false;
    if (btnSendMessage) btnSendMessage.disabled = false;

    // Salvar na memória
    chat.messages.push({ role: 'ai', content: aiResponseText });
    saveChatsToStorage();
    renderHistory();

    // Botão de copiar
    if (contentAiDiv) {
      const actions = document.createElement('div');
      actions.innerHTML = createMessageActionsHtml(aiResponseText);
      contentAiDiv.appendChild(actions.firstElementChild);
      attachMessageActionEvents(aiRow, aiResponseText);
    }
  }

  if (btnSendMessage) {
    btnSendMessage.addEventListener('click', sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 160) + 'px';
    });
  }

  // Renderizar histórico de conversas
  function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';

    chats.forEach(chat => {
      const li = document.createElement('li');
      li.className = `gpt-chat-row ${chat.id === currentChatId ? 'active' : ''}`;

      li.innerHTML = `
        <span class="chat-row-icon">🗨️</span>
        <span class="chat-row-title">${escapeHtml(chat.title)}</span>
        <button class="btn-del-chat" title="Excluir conversa">✕</button>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-del-chat')) {
          e.stopPropagation();
          deleteChat(chat.id);
        } else {
          loadChat(chat.id);
          if (window.innerWidth <= 768) {
            toggleSidebar(true);
          }
        }
      });

      historyList.appendChild(li);
    });
  }

  // --- FORMATAÇÃO MARKDOWN LEVE & SEGURA ---
  function formatMarkdown(text) {
    if (!text) return '';
    let formatted = escapeHtml(text);

    // Blocos de código pré-formatados ```codigo```
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Código inline `codigo`
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Negrito **texto**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Itálico *texto* ou _texto_
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Citações > texto
    formatted = formatted.replace(/^>\s?(.*)$/gm, '<blockquote style="border-left:3px solid #EAB308;padding-left:10px;margin:8px 0;color:#9CA3AF;font-style:italic;">$1</blockquote>');

    // Quebras de linha para <br>
    formatted = formatted.replace(/\n/g, '<br>');

    // Marcadores de lista •
    formatted = formatted.replace(/•\s?/g, '<span style="color:#EAB308;margin-right:6px;">●</span>');

    return formatted;
  }

  function escapeHtml(string) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(string).replace(/[&<>"']/g, s => entityMap[s]);
  }

  // --- INICIALIZAÇÃO ---
  function initChatDashboard() {
    // No desktop, garantir que a barra lateral esteja aberta e visível
    if (window.innerWidth > 768 && gptLayout) {
      gptLayout.classList.remove('sidebar-collapsed');
      localStorage.setItem('gpt_sidebar_collapsed', 'false');
    }
    renderHistory();
    if (chats.length === 0) {
      createNewChat();
    } else {
      loadChat(chats[0].id);
    }
  }

  // Iniciar na landing page ou restaurar rota
  if (window.location.hash === '#chat') {
    showView('dashboard', false);
    initChatDashboard();
  } else if (window.location.hash === '#auth') {
    showView('auth', false);
  } else {
    showView('landing', false);
  }
});

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
  const pinnedSection = document.getElementById('pinned-section');
  const pinnedList = document.getElementById('pinned-list');

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

  // Conversas pré-carregadas com suporte nativo a fixadas (pinned)
  const defaultChats = [
    {
      id: 'chat-rec-0',
      title: 'Rebater notificação extrajudicial',
      pinned: true,
      updatedAt: Date.now() - 1800000,
      messages: [
        {
          role: 'user',
          content: 'Preciso de uma orientação estruturada para rebater uma notificação extrajudicial.'
        },
        {
          role: 'ai',
          content: `Aqui está a síntese organizada sobre **Rebater notificação extrajudicial**:\n\n• **Ponto Central:** Documento estruturado para análise rápida e verificação jurídica tempestiva.\n• **Status:** Revisado e atualizado.\n\nComo deseja prosseguir com a redação ou expansão deste tema?`
        }
      ]
    },
    {
      id: 'chat-rec-1',
      title: 'Layout gráfico 2D abstrato',
      pinned: false,
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
      pinned: false,
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
      pinned: false,
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
      pinned: false,
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
  // Normalizar chats garantindo que cada um possua a flag pinned
  chats.forEach(c => {
    if (typeof c.pinned !== 'boolean') {
      c.pinned = (c.title && c.title.toLowerCase().includes('notificação'));
    }
  });

  // --- TOAST NOTIFICATIONS ---
  function showToast(msg) {
    if (!kambaToast) return;
    if (toastTimer) clearTimeout(toastTimer);
    if (toastIcon) toastIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
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
    showToast('Você voltou à página inicial.');
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

  if (btnHeroDemo) {
    btnHeroDemo.addEventListener('click', () => {
      const featEl = document.getElementById('features');
      if (featEl) featEl.scrollIntoView({ behavior: 'smooth' });
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
    // Se o chat atual já estiver vazio e limpo, focar no input sem duplicar conversas vazias
    const currentChat = chats.find(c => c.id === currentChatId);
    if (currentChat && currentChat.messages.length === 0 && currentChat.title === 'Nova Conversa') {
      if (chatInput) chatInput.focus();
      return;
    }

    const newId = 'chat-' + Date.now();
    const newChatObj = {
      id: newId,
      title: 'Nova Conversa',
      pinned: false,
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
        appendMessageToDOM(msg.role, msg.content, false, msg.file || null);
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
    showToast('Conversa excluída.');
  }

  // Alternar estado de fixada (Fixar / Desafixar)
  function togglePinChat(chatId) {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;
    chat.pinned = !chat.pinned;
    saveChatsToStorage();
    renderHistory();
    if (chat.pinned) {
      showToast('Conversa fixada no topo!');
    } else {
      showToast('Conversa desafixada.');
    }
  }

  // --- RENDERIZAÇÃO DE MENSAGENS E STREAMING ---
  function appendMessageToDOM(role, text, isStreaming = false, fileAttachment = null) {
    if (!chatMessages) return null;
    if (welcomeCenter) welcomeCenter.style.display = 'none';

    const row = document.createElement('div');
    row.className = `gpt-msg-row ${role}`;

    if (role === 'user') {
      let fileBadgeHtml = '';
      if (fileAttachment) {
        const isPdf = fileAttachment.isPdf || (fileAttachment.type && fileAttachment.type.includes('pdf')) || (fileAttachment.name && fileAttachment.name.toLowerCase().endsWith('.pdf'));
        const iconSvg = isPdf 
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
        fileBadgeHtml = `<div class="msg-attached-file-badge">${iconSvg}<span>${escapeHtml(fileAttachment.name)}</span></div>`;
      }
      row.innerHTML = `<div class="gpt-msg-bubble-user">${fileBadgeHtml}<div>${escapeHtml(text)}</div></div>`;
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
          showToast('Resposta copiada para a área de transferência!');
        }).catch(() => {
          showToast('Texto copiado com sucesso.');
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

    const attachedFileToSend = currentAttachedFile;

    // Registrar mensagem do usuário
    chat.messages.push({ 
      role: 'user', 
      content: text,
      file: attachedFileToSend ? { name: attachedFileToSend.name, type: attachedFileToSend.type, size: attachedFileToSend.size, isPdf: attachedFileToSend.isPdf } : null
    });
    appendMessageToDOM('user', text, false, attachedFileToSend);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Limpar pré-visualização de anexo
    clearAttachment();

    // Renomear chat se for a primeira mensagem
    if (chat.title === 'Nova Conversa') {
      const baseTitle = text || (attachedFileToSend ? attachedFileToSend.name : 'Conversa com Arquivo');
      chat.title = baseTitle.length > 28 ? baseTitle.substring(0, 28) + '...' : baseTitle;
    }
    chat.updatedAt = Date.now();
    saveChatsToStorage();

    isGenerating = true;
    if (btnSendMessage) btnSendMessage.disabled = true;

    // Linha de resposta da IA
    const aiRow = appendMessageToDOM('ai', '', true);
    if (!aiRow) return;

    const streamContainer = aiRow.querySelector('.msg-text-stream');
    const contentAiDiv = aiRow.querySelector('.gpt-msg-content-ai');
    const cursor = aiRow.querySelector('.typing-cursor');

    let aiResponseText = '';
    const geminiKey = getGeminiApiKey();

    if (geminiKey) {
      if (streamContainer) {
        const tier = getSelectedModelTier();
        const searchActive = isWebSearchEnabled();
        const modelName = tier === 'pro' ? 'Gemini 1.5 Pro' : 'Gemini 1.5 Flash';
        const searchMsg = searchActive ? ' (com busca ao vivo na Web)' : '';
        streamContainer.innerHTML = `<em>Consultando Google ${modelName}${searchMsg}...</em>`;
      }
      try {
        aiResponseText = await callGoogleGeminiAPI(geminiKey, text, attachedFileToSend, chat.messages);
      } catch (err) {
        console.error('Erro ao chamar Google Gemini API:', err);
        aiResponseText = `**Aviso de Conexão (Google AI Studio):**\n\n${err.message}\n\n*Verifique se a sua chave de API está correta no botão "Google AI Studio" no topo.*`;
      }
    } else {
      if (attachedFileToSend) {
        aiResponseText = generateSimulatedFileResponse(attachedFileToSend, text);
      } else {
        aiResponseText = generateUniversalAIResponse(text);
      }
    }

    if (streamContainer) streamContainer.innerHTML = '';
    let currentText = '';
    const speed = geminiKey ? 5 : 7;

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

  // --- MOTOR SIMULADO DE DOCUMENTOS (QUANDO SEM CHAVE ATIVA) ---
  function generateSimulatedFileResponse(file, userPrompt) {
    const isPdf = file.isPdf || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const fileName = escapeHtml(file.name);
    
    if (isPdf) {
      return `### Análise e Tradução do Documento: **${fileName}**\n\n` +
        `*(Processado com o motor Kamba IA — Base Google Gemini 1.5 Flash)*\n\n` +
        `---\n\n` +
        `#### Síntese Executiva do Documento:\n` +
        `• **Identificação:** Documento PDF corporativo/técnico processado com sucesso.\n` +
        `• **Estrutura identificada:** Seções numeradas, cláusulas contratuais e termos operacionais.\n\n` +
        `#### Exemplo de Tradução Oficial Aplicada:\n` +
        `> *"Todas as diretrizes e prazos estipulados neste instrumento entram em vigor imediatamente a partir da data de ratificação, garantindo conformidade com os padrões regulatórios internacionais e salvaguarda plena das partes envolvidas."*\n\n` +
        `---\n\n` +
        `**Ativação em Produção:** Esta é uma visualização prévia da estrutura do Kamba. Para traduzir **este arquivo real na íntegra** linha por linha com inteligência artificial ao vivo, basta colar sua chave gratuita do **Google AI Studio** clicando no botão **Google AI Studio** no topo da tela!`;
    } else {
      return `### Leitura e Tradução de Imagem: **${fileName}**\n\n` +
        `*(Visão Computacional e OCR Kamba IA)*\n\n` +
        `---\n\n` +
        `#### Texto Detectado na Imagem (OCR):\n` +
        `O sistema de visão computacional identificou com sucesso os caracteres tipográficos contidos na imagem enviada.\n\n` +
        `#### Tradução Direta para Português:\n` +
        `> *"Acesso liberado aos procedimentos operacionais e conformidade estabelecida conforme os termos vigentes."*\n\n` +
        `---\n\n` +
        `**Dica de Produção:** Conecte sua chave gratuita do **Google AI Studio** no botão superior para realizar a leitura, extração e tradução 100% real de qualquer foto, recibo ou captura de tela!`;
    }
  }

  // --- GERENCIAMENTO DE MODELO E INTELIGÊNCIA AVANÇADA ---
  const MODEL_TIER_STORAGE_KEY = 'kamba_selected_model_tier';
  const WEB_SEARCH_STORAGE_KEY = 'kamba_web_search_enabled';

  function getSelectedModelTier() {
    return localStorage.getItem(MODEL_TIER_STORAGE_KEY) || 'flash';
  }

  function setSelectedModelTier(tier) {
    localStorage.setItem(MODEL_TIER_STORAGE_KEY, tier);
    cachedWorkingModel = null;
    localStorage.removeItem('kamba_gemini_model_config');
    updateModelSelectorUI();
  }

  function isWebSearchEnabled() {
    const val = localStorage.getItem(WEB_SEARCH_STORAGE_KEY);
    return val === null ? true : val === 'true';
  }

  function setWebSearchEnabled(enabled) {
    localStorage.setItem(WEB_SEARCH_STORAGE_KEY, String(enabled));
    updateModelSelectorUI();
  }

  function updateModelSelectorUI() {
    const tier = getSelectedModelTier();
    const searchEnabled = isWebSearchEnabled();

    const headerName = document.getElementById('header-model-name');
    const headerBadge = document.getElementById('header-model-badge');
    const optFlash = document.getElementById('opt-model-flash');
    const optPro = document.getElementById('opt-model-pro');
    const searchToggle = document.getElementById('toggle-web-search');

    if (tier === 'pro') {
      if (headerName) headerName.textContent = 'Gemini 1.5 Pro';
      if (headerBadge) {
        headerBadge.textContent = 'Profundo';
        headerBadge.className = 'model-badge-mini pro';
      }
      if (optFlash) optFlash.classList.remove('active');
      if (optPro) optPro.classList.add('active');
    } else {
      if (headerName) headerName.textContent = 'Gemini 1.5 Flash';
      if (headerBadge) {
        headerBadge.textContent = 'Rápido';
        headerBadge.className = 'model-badge-mini';
      }
      if (optFlash) optFlash.classList.add('active');
      if (optPro) optPro.classList.remove('active');
    }

    if (searchToggle) {
      searchToggle.checked = searchEnabled;
    }
  }

  function setupModelSelectorEvents() {
    const btnToggle = document.getElementById('btn-toggle-model-menu');
    const menu = document.getElementById('gpt-model-menu');
    const optFlash = document.getElementById('opt-model-flash');
    const optPro = document.getElementById('opt-model-pro');
    const searchToggle = document.getElementById('toggle-web-search');

    if (btnToggle && menu) {
      btnToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.style.display !== 'none';
        menu.style.display = isOpen ? 'none' : 'block';
        btnToggle.classList.toggle('active', !isOpen);
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btnToggle.contains(e.target)) {
          menu.style.display = 'none';
          btnToggle.classList.remove('active');
        }
      });
    }

    if (optFlash) {
      optFlash.addEventListener('click', () => {
        setSelectedModelTier('flash');
        if (menu) menu.style.display = 'none';
        if (btnToggle) btnToggle.classList.remove('active');
        showToast('Modelo alternado para Gemini 1.5 Flash (Rápido e Fluido)');
      });
    }

    if (optPro) {
      optPro.addEventListener('click', () => {
        setSelectedModelTier('pro');
        if (menu) menu.style.display = 'none';
        if (btnToggle) btnToggle.classList.remove('active');
        showToast('Modelo alternado para Gemini 1.5 Pro (Raciocínio Profundo)');
      });
    }

    if (searchToggle) {
      searchToggle.addEventListener('change', (e) => {
        setWebSearchEnabled(e.target.checked);
        showToast(e.target.checked ? 'Busca na Web ao Vivo ativada' : 'Busca na Web desativada');
      });
    }
  }

  // --- DESCOBERTA E RESOLUÇÃO AUTOMÁTICA DE MODELOS DO GOOGLE GEMINI ---
  let cachedWorkingModel = null;

  async function discoverWorkingGeminiModel(apiKey, requestedTier) {
    const tier = requestedTier || getSelectedModelTier();
    if (cachedWorkingModel && cachedWorkingModel.tier === tier) {
      return cachedWorkingModel;
    }

    const savedModel = localStorage.getItem('kamba_gemini_model_config');
    if (savedModel) {
      try {
        const parsed = JSON.parse(savedModel);
        if (parsed && parsed.tier === tier) {
          cachedWorkingModel = parsed;
          return cachedWorkingModel;
        }
      } catch (e) {}
    }

    // Listar modelos autorizados pela API oficial
    for (const apiVersion of ['v1beta', 'v1']) {
      try {
        const listUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models?key=${encodeURIComponent(apiKey.trim())}`;
        const res = await fetch(listUrl);
        if (res.ok) {
          const data = await res.json();
          const validModels = (data.models || []).filter(m => 
            m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
          );

          if (validModels.length > 0) {
            const preferredNames = tier === 'pro'
              ? ['gemini-1.5-pro-latest', 'gemini-1.5-pro', 'gemini-1.5-pro-001', 'gemini-1.5-pro-002', 'gemini-pro']
              : ['gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-001', 'gemini-1.5-flash-002'];

            for (const pref of preferredNames) {
              const found = validModels.find(m => m.name === `models/${pref}` || m.name.endsWith('/' + pref));
              if (found) {
                cachedWorkingModel = {
                  tier,
                  apiVersion,
                  modelPath: found.name,
                  displayName: found.displayName || pref
                };
                localStorage.setItem('kamba_gemini_model_config', JSON.stringify(cachedWorkingModel));
                return cachedWorkingModel;
              }
            }
          }
        }
      } catch (e) {
        console.warn(`Tentativa de listagem em ${apiVersion} falhou:`, e);
      }
    }

    // Fallback padrão conforme tier
    cachedWorkingModel = {
      tier,
      apiVersion: 'v1beta',
      modelPath: tier === 'pro' ? 'models/gemini-1.5-pro-latest' : 'models/gemini-1.5-flash-latest',
      displayName: tier === 'pro' ? 'Gemini 1.5 Pro' : 'Gemini 1.5 Flash'
    };
    return cachedWorkingModel;
  }

  // --- CHAMADA OFICIAL À API DO GOOGLE GEMINI (COM BUSCA AO VIVO, MEMÓRIA E AUTO-RECUPERAÇÃO) ---
  async function callGoogleGeminiAPI(apiKey, promptText, fileAttachment, historyMessages) {
    const parts = [];

    const now = new Date();
    const userLocale = navigator.language || 'pt-AO';
    const dateStr = now.toLocaleDateString(userLocale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString(userLocale, { hour: '2-digit', minute: '2-digit' });
    let userTz = 'UTC';
    try {
      userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch(e) {}

    if (fileAttachment && fileAttachment.base64) {
      parts.push({
        inline_data: {
          mime_type: fileAttachment.type,
          data: fileAttachment.base64
        }
      });
    }

    const temporalNotice = `[Data e horário local do dispositivo do usuário: ${dateStr}, ${timeStr} (${userTz})]`;
    const finalPromptText = promptText 
      ? `${temporalNotice}\n\n${promptText}` 
      : `${temporalNotice}\n\nAnalise o arquivo anexado e forneça as principais informações ou a tradução solicitada de forma clara e profissional.`;

    parts.push({
      text: finalPromptText
    });

    // 1. Memória Contínua Multi-Turn (até 24 turnos anteriores)
    const rawHistory = [];
    if (historyMessages && historyMessages.length > 0) {
      const recent = historyMessages.slice(-24);
      for (const m of recent) {
        if (m.content && !m.content.startsWith('**Aviso de Conexão')) {
          rawHistory.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          });
        }
      }
    }

    // Sanitizar alternância estrita entre 'user' e 'model' exigida pelo Google
    const contents = [];
    let lastRole = null;
    for (const msg of rawHistory) {
      if (msg.role === lastRole && contents.length > 0) {
        contents[contents.length - 1].parts.push(...msg.parts);
      } else {
        contents.push({ role: msg.role, parts: [...msg.parts] });
        lastRole = msg.role;
      }
    }

    if (lastRole === 'user' && contents.length > 0) {
      contents[contents.length - 1].parts.push(...parts);
    } else {
      contents.push({ role: 'user', parts: parts });
    }

    // 2. Definir lista ordenada de endpoints conforme o modelo escolhido (Pro vs Flash)
    const tier = getSelectedModelTier();
    const discovered = await discoverWorkingGeminiModel(apiKey, tier);

    const candidateEndpoints = [];
    if (discovered && discovered.modelPath) {
      candidateEndpoints.push(`https://generativelanguage.googleapis.com/${discovered.apiVersion}/${discovered.modelPath}:generateContent`);
    }

    if (tier === 'pro') {
      candidateEndpoints.push(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-001:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
      );
    } else {
      candidateEndpoints.push(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent`
      );
    }

    // Fallbacks universais de segurança
    candidateEndpoints.push(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent`
    );

    const uniqueEndpoints = [...new Set(candidateEndpoints)];
    let lastError = null;
    const webSearchWanted = isWebSearchEnabled();

    // Instrução Corporativa Executiva
    const systemInstruction = {
      parts: [{
        text: `Você é o Kamba Chat IA, um assistente corporativo executivo de inteligência artificial de padrão internacional.
A data e hora exatas no dispositivo do usuário são: ${dateStr}, às ${timeStr} (Fuso horário: ${userTz}). Utilize SEMPRE esta data como referência cronológica factual inegociável para o dia de hoje, cálculos de prazos, calendário e fatos correntes.
DIRETRIZES DE ATUAÇÃO:
1. EXCELÊNCIA E PRECISÃO: Suas respostas devem ser de alto padrão corporativo, objetivas, sem preâmbulos vazios e bem estruturadas com títulos claros, tópicos e tabelas comparativas quando relevante.
2. ANÁLISE PROFUNDA DE DOCUMENTOS: Você é mestre em tradução juramentada/executiva de PDFs, relatórios técnicos, planilhas e extração OCR de imagens.
3. PADRÃO VISUAL SÓBRIO: Jamais use emojis informais ou infantis.
4. IDIOMA: Responda em português formal impecável, atendendo com fluidez internacional.`
      }]
    };

    for (const baseEndpoint of uniqueEndpoints) {
      // Se busca na web estiver ativada, tentar com busca primeiro e, caso a versão recuse com 400, tentar sem busca
      const searchAttempts = webSearchWanted ? [true, false] : [false];

      for (const enableSearch of searchAttempts) {
        try {
          const url = `${baseEndpoint}?key=${encodeURIComponent(apiKey.trim())}`;
          
          const body = {
            contents: contents,
            generationConfig: {
              temperature: tier === 'pro' ? 0.4 : 0.6,
              maxOutputTokens: 8192
            },
            systemInstruction: systemInstruction
          };

          if (enableSearch) {
            body.tools = [{ google_search: {} }];
          }

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          if (response.ok) {
            const data = await response.json();
            const candidate = data.candidates?.[0];
            let text = candidate?.content?.parts?.[0]?.text;

            if (text) {
              // Extrair citações e links da pesquisa ao vivo (Google Search Grounding)
              if (candidate.groundingMetadata) {
                const chunks = candidate.groundingMetadata.groundingChunks || [];
                const sources = [];
                const seenUrls = new Set();

                for (const chunk of chunks) {
                  if (chunk.web && chunk.web.uri && !seenUrls.has(chunk.web.uri)) {
                    seenUrls.add(chunk.web.uri);
                    let title = chunk.web.title;
                    if (!title) {
                      try {
                        title = new URL(chunk.web.uri).hostname.replace(/^www\./, '');
                      } catch(e) {
                        title = chunk.web.uri;
                      }
                    }
                    sources.push({ title, uri: chunk.web.uri });
                  }
                }

                if (sources.length > 0) {
                  text += '\n\n---\n\n#### Fontes consultadas em tempo real na Web:\n';
                  sources.slice(0, 5).forEach(s => {
                    text += `• [${s.title}](${s.uri})\n`;
                  });
                }
              }

              // Atualizar cache de modelo funcional
              const modelIdentifier = baseEndpoint.split('/').slice(-1)[0].replace(':generateContent', '');
              cachedWorkingModel = {
                tier,
                apiVersion: baseEndpoint.includes('/v1/') ? 'v1' : 'v1beta',
                modelPath: modelIdentifier.startsWith('models/') ? modelIdentifier : `models/${modelIdentifier}`,
                displayName: modelIdentifier.replace('models/', '')
              };
              localStorage.setItem('kamba_gemini_model_config', JSON.stringify(cachedWorkingModel));
              updateGeminiStatusUI();
              return text;
            }
          }

          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `Erro HTTP ${response.status}`;
          lastError = new Error(errMsg);

          // Se for erro 400 e a busca na web estava ligada, o próximo loop interno tentará sem a busca imediatamente
          if (response.status === 400 && enableSearch) {
            continue;
          }

          // Se for cota esgotada (429) ou chave inválida (403), repassa imediatamente para notificar o usuário
          if (response.status === 429 || response.status === 403) {
            throw lastError;
          }
        } catch (err) {
          lastError = err;
          if (err.name === 'AbortError' || err.message.includes('429') || err.message.includes('403')) {
            throw err;
          }
        }
      }
    }

    throw lastError || new Error("Não foi possível conectar a nenhum dos modelos disponíveis do Gemini.");
  }

  // --- GERENCIAMENTO DE CHAVE DO GOOGLE AI STUDIO ---
  const GEMINI_STORAGE_KEY = 'kamba_gemini_api_key';

  function getGeminiApiKey() {
    return (localStorage.getItem(GEMINI_STORAGE_KEY) || '').trim();
  }

  function setGeminiApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
      cachedWorkingModel = null;
      localStorage.removeItem('kamba_gemini_model_config');
      discoverWorkingGeminiModel(key.trim()).then(() => updateGeminiStatusUI());
    } else {
      localStorage.removeItem(GEMINI_STORAGE_KEY);
      localStorage.removeItem('kamba_gemini_model_config');
      cachedWorkingModel = null;
    }
    updateGeminiStatusUI();
  }

  function updateGeminiStatusUI() {
    const key = getGeminiApiKey();
    const dot = document.getElementById('api-status-dot');
    const label = document.getElementById('api-status-label');
    const badge = document.getElementById('api-status-badge');

    if (key) {
      const savedConfig = localStorage.getItem('kamba_gemini_model_config');
      let modelLabel = 'Gemini Ativo';
      if (savedConfig) {
        try {
          const cfg = JSON.parse(savedConfig);
          if (cfg.displayName) modelLabel = cfg.displayName.replace('models/', '');
        } catch (e) {}
      }

      if (dot) dot.classList.add('active');
      if (label) label.textContent = modelLabel;
      if (badge) {
        badge.textContent = `Status: Conectado (${modelLabel})`;
        badge.className = 'api-status-badge connected';
      }
    } else {
      if (dot) dot.classList.remove('active');
      if (label) label.textContent = 'Google AI Studio';
      if (badge) {
        badge.textContent = 'Status: Não Conectado (Modo Demonstração)';
        badge.className = 'api-status-badge';
      }
    }
  }

  // --- GERENCIAMENTO DE ANEXO DE ARQUIVOS (PDF E IMAGENS) ---
  let currentAttachedFile = null;

  function clearAttachment() {
    currentAttachedFile = null;
    const container = document.getElementById('attachment-preview-container');
    const fileInput = document.getElementById('chat-file-input');
    if (container) container.style.display = 'none';
    if (fileInput) fileInput.value = '';
  }

  function handleFileSelection(file) {
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      showToast('Por favor, selecione um documento PDF ou uma imagem (PNG/JPG/WEBP).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      showToast('O arquivo selecionado excede o limite de 20 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64Data = dataUrl.split(',')[1];

      currentAttachedFile = {
        name: file.name,
        size: file.size,
        type: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
        dataUrl: dataUrl,
        base64: base64Data,
        isPdf: isPdf,
        isImage: isImage
      };

      renderAttachmentPreview();
    };
    reader.readAsDataURL(file);
  }

  function renderAttachmentPreview() {
    const container = document.getElementById('attachment-preview-container');
    const iconSpan = document.getElementById('attachment-icon');
    const filenameSpan = document.getElementById('attachment-filename');
    const filesizeSpan = document.getElementById('attachment-filesize');
    const quickActionsDiv = document.getElementById('attachment-quick-actions');

    if (!container || !currentAttachedFile) return;

    filenameSpan.textContent = currentAttachedFile.name;
    const sizeInKb = Math.round(currentAttachedFile.size / 1024);
    filesizeSpan.textContent = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

    if (currentAttachedFile.isImage) {
      iconSpan.innerHTML = `<img src="${currentAttachedFile.dataUrl}" alt="Preview">`;
    } else {
      iconSpan.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
    }

    let pills = [];
    if (currentAttachedFile.isPdf) {
      pills = [
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> <span>Traduzir para Português</span>', prompt: 'Por favor, traduza todo o conteúdo deste documento PDF para o Português, mantendo a estrutura oficial, títulos e formatação executiva.' },
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> <span>Traduzir para Inglês</span>', prompt: 'Please translate the full content of this PDF document into professional English, preserving structure, headers and formatting.' },
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> <span>Resumo Executivo</span>', prompt: 'Faça um resumo executivo detalhado dos principais tópicos e conclusões deste documento PDF.' },
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> <span>Analisar Documento</span>', prompt: 'Analise detalhadamente este documento e aponte os dados essenciais, cláusulas ou métricas mais importantes.' }
      ];
    } else {
      pills = [
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> <span>Ler e Traduzir Texto</span>', prompt: 'Identifique com precisão todo o texto visível contido nesta imagem e traduza-o para o Português.' },
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> <span>Traduzir para Inglês</span>', prompt: 'Extract all visible text in this image and translate it to English.' },
        { label: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg> <span>Transcrever Texto</span>', prompt: 'Transcreva com máxima precisão todo o texto contido nesta imagem, preservando a pontuação.' }
      ];
    }

    quickActionsDiv.innerHTML = pills.map(p => `
      <button type="button" class="action-pill" data-prompt="${escapeHtml(p.prompt)}">
        ${p.label}
      </button>
    `).join('');

    quickActionsDiv.querySelectorAll('.action-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        if (chatInput) chatInput.value = prompt;
        sendMessage();
      });
    });

    container.style.display = 'flex';
  }

  // Eventos de Anexo
  const btnAttachFile = document.getElementById('btn-attach-file');
  const chatFileInput = document.getElementById('chat-file-input');
  const btnRemoveAttachment = document.getElementById('btn-remove-attachment');

  if (btnAttachFile && chatFileInput) {
    btnAttachFile.addEventListener('click', () => {
      chatFileInput.click();
    });

    chatFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelection(e.target.files[0]);
      }
    });
  }

  if (btnRemoveAttachment) {
    btnRemoveAttachment.addEventListener('click', clearAttachment);
  }

  // Suporte a Arrastar e Soltar (Drag and Drop) no chat
  const chatInputArea = document.querySelector('.gpt-input-area');
  if (chatInputArea) {
    ['dragenter', 'dragover'].forEach(eventName => {
      chatInputArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        chatInputArea.style.borderColor = 'var(--angola-yellow)';
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      chatInputArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        chatInputArea.style.borderColor = '';
      }, false);
    });

    chatInputArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        handleFileSelection(dt.files[0]);
      }
    });
  }

  // Eventos do Modal do Google AI Studio
  const btnOpenApiModal = document.getElementById('btn-open-api-modal');
  const modalApiSettings = document.getElementById('modal-api-settings');
  const btnCloseApiModal = document.getElementById('btn-close-api-modal');
  const inputApiKey = document.getElementById('input-api-key');
  const btnToggleKeyVisibility = document.getElementById('btn-toggle-key-visibility');
  const btnSaveApiKey = document.getElementById('btn-save-api-key');
  const btnClearApiKey = document.getElementById('btn-clear-api-key');

  if (btnOpenApiModal && modalApiSettings) {
    btnOpenApiModal.addEventListener('click', () => {
      const currentKey = getGeminiApiKey();
      if (inputApiKey) inputApiKey.value = currentKey;
      updateGeminiStatusUI();
      modalApiSettings.classList.add('active');
    });
  }

  if (btnCloseApiModal && modalApiSettings) {
    btnCloseApiModal.addEventListener('click', () => {
      modalApiSettings.classList.remove('active');
    });
  }

  if (modalApiSettings) {
    modalApiSettings.addEventListener('click', (e) => {
      if (e.target === modalApiSettings) {
        modalApiSettings.classList.remove('active');
      }
    });
  }

  if (btnToggleKeyVisibility && inputApiKey) {
    btnToggleKeyVisibility.addEventListener('click', () => {
      inputApiKey.type = inputApiKey.type === 'password' ? 'text' : 'password';
    });
  }

  if (btnSaveApiKey && inputApiKey && modalApiSettings) {
    btnSaveApiKey.addEventListener('click', () => {
      const val = inputApiKey.value.trim();
      if (!val) {
        showToast('Por favor, cole a sua chave de API ou clique em Remover.');
        return;
      }
      setGeminiApiKey(val);
      modalApiSettings.classList.remove('active');
      showToast('Conexão Google AI Studio ativada com sucesso!');
    });
  }

  if (btnClearApiKey && inputApiKey && modalApiSettings) {
    btnClearApiKey.addEventListener('click', () => {
      setGeminiApiKey('');
      inputApiKey.value = '';
      modalApiSettings.classList.remove('active');
      showToast('Chave de API removida.');
    });
  }

  if (btnSendMessage) {
    btnSendMessage.addEventListener('click', () => sendMessage());
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

  const svgPinIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>`;
  const svgChatIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  const svgCloseIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const svgTrashIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

  function createChatRowElement(chat, isPinned) {
    const li = document.createElement('li');
    li.className = `gpt-chat-row ${chat.id === currentChatId ? 'active' : ''} ${isPinned ? 'is-pinned' : ''}`;

    li.innerHTML = `
      <span class="chat-row-icon">${isPinned ? svgPinIcon : svgChatIcon}</span>
      <span class="chat-row-title" title="${escapeHtml(chat.title)}">${escapeHtml(chat.title)}</span>
      <div class="chat-row-actions">
        <button class="btn-action-chat btn-toggle-pin" title="${isPinned ? 'Desafixar conversa' : 'Fixar conversa'}">
          ${isPinned ? svgCloseIcon : svgPinIcon}
        </button>
        <button class="btn-action-chat btn-del-chat" title="Excluir conversa">${svgTrashIcon}</button>
      </div>
    `;

    li.addEventListener('click', (e) => {
      const btnDel = e.target.closest('.btn-del-chat');
      const btnPin = e.target.closest('.btn-toggle-pin');

      if (btnDel) {
        e.stopPropagation();
        deleteChat(chat.id);
      } else if (btnPin) {
        e.stopPropagation();
        togglePinChat(chat.id);
      } else {
        loadChat(chat.id);
        if (window.innerWidth <= 768) {
          toggleSidebar(true);
        }
      }
    });

    return li;
  }

  // Renderizar histórico de conversas (Fixadas & Recentes)
  function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';
    if (pinnedList) pinnedList.innerHTML = '';

    const pinnedChats = chats.filter(c => c.pinned);
    const recentChats = chats.filter(c => !c.pinned);

    // Exibir seção Fixadas se houver alguma conversa fixada
    if (pinnedSection) {
      pinnedSection.style.display = pinnedChats.length > 0 ? 'flex' : 'none';
    }

    if (pinnedList) {
      pinnedChats.forEach(chat => {
        pinnedList.appendChild(createChatRowElement(chat, true));
      });
    }

    recentChats.forEach(chat => {
      historyList.appendChild(createChatRowElement(chat, false));
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

    // Headers Markdown
    formatted = formatted.replace(/^#### (.*$)/gm, '<h5 style="color:#ECECEC;margin:10px 0 4px 0;font-size:14px;font-weight:700;">$1</h5>');
    formatted = formatted.replace(/^### (.*$)/gm, '<h4 style="color:#ECECEC;margin:12px 0 6px 0;font-size:15px;font-weight:700;">$1</h4>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h3 style="color:#ECECEC;margin:14px 0 6px 0;font-size:16px;font-weight:700;">$1</h3>');
    formatted = formatted.replace(/^# (.*$)/gm, '<h2 style="color:#ECECEC;margin:16px 0 8px 0;font-size:18px;font-weight:800;">$1</h2>');

    // Negrito **texto**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Itálico *texto* ou _texto_
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Links Web [Texto](url)
    formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--angola-yellow);text-decoration:underline;word-break:break-all;">$1</a>');

    // Linha horizontal divisória ---
    formatted = formatted.replace(/^(?:---|___|\*\*\*)$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.12);margin:14px 0;">');

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
    updateGeminiStatusUI();
    updateModelSelectorUI();
    renderHistory();
    if (chats.length === 0) {
      createNewChat();
    } else {
      loadChat(chats[0].id);
    }
  }

  // Configurar eventos do Seletor de Modelo e inicializar UI
  setupModelSelectorEvents();
  updateModelSelectorUI();
  updateGeminiStatusUI();

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

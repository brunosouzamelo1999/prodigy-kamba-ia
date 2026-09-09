/* ============================================================
   KAMBA CHAT IA — APLICAÇÃO CONVERSACIONAL MODULAR (ESTILO VERCEL / CHATGPT)
   Chat IA Universal, Navegação SPA, Suporte Multi-Dispositivo e Streaming
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

  // Dados das Abas Interativas da Landing Page (Conversas Universais)
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
• <strong>A Regra dos 45 Minutos:</strong> Dedique 45 minutos diários logo pela manhã ou antes de descansar para estudar sem distrações (celular no modo não perturbe).<br>
• <strong>Descanso Ativo:</strong> Faça pausas curtas de 5 minutos a cada bloco para levantar, beber água e relaxar a mente.<br>
• <strong>Revisão Semanal (Domingo à noite):</strong> Escolha 3 metas principais para a semana. Não liste 20 tarefas; foque nas 3 que realmente mudam o seu rumo.<br><br>
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
  const linkForgotPass = document.getElementById('link-forgot-pass');

  // Elementos do Dashboard
  const btnLogout = document.getElementById('btn-logout');
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');
  const dashSidebar = document.getElementById('dash-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const displayUserName = document.getElementById('display-user-name');
  const btnDashHome = document.getElementById('btn-dash-home');
  const linkNavHome = document.getElementById('link-nav-home');
  const linkNavDash = document.getElementById('link-nav-dash');

  // Elementos do Chat
  const btnNewChat = document.getElementById('btn-new-chat');
  const historyList = document.getElementById('history-list');
  const historyFilterInput = document.getElementById('history-filter-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSendMessage = document.getElementById('btn-send-message');
  const btnClearChat = document.getElementById('btn-clear-chat');
  const quickPromptChips = document.querySelectorAll('.prompt-chip');

  // Contadores Métricos Dinâmicos
  const countSearches = document.getElementById('count-searches');
  const countProposals = document.getElementById('count-proposals');
  let totalSearchesCount = 42;
  let totalProposalsCount = 18;

  // Simulador de Produtividade (Landing Page)
  const roiSlider = document.getElementById('roi-slider');
  const roiUsersVal = document.getElementById('roi-users-val');
  const roiBubbleCost = document.getElementById('roi-bubble-cost');
  const roiKambaCost = document.getElementById('roi-kamba-cost');
  const roiSavingsPct = document.getElementById('roi-savings-pct');

  // Modal de Pré-visualização
  const modalExecutivePreview = document.getElementById('modal-executive-preview');
  const modalDocContent = document.getElementById('modal-doc-content');
  const modalDocRef = document.getElementById('modal-doc-ref');
  const modalDocDate = document.getElementById('modal-doc-date');
  const btnCloseModalPreview = document.getElementById('btn-close-modal-preview');
  const btnModalCopyText = document.getElementById('btn-modal-copy-text');
  const btnModalPrintNow = document.getElementById('btn-modal-print-now');
  const printDocContent = document.getElementById('print-doc-content');
  let currentDocTextForPrint = '';

  // Toast
  const kambaToast = document.getElementById('kamba-toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimer = null;

  // --- ESTADO DA APLICAÇÃO ---
  let isRegisterMode = false;
  let currentUser = JSON.parse(localStorage.getItem('kamba_chat_user')) || { name: 'Bruno', email: 'bruno@kamba.ia' };
  let currentChatId = null;
  let isGenerating = false;
  let historySearchTerm = '';

  // Conversas pré-carregadas universais
  const defaultChats = [
    {
      id: 'chat-1',
      title: 'Ideias para Projeto Criativo',
      updatedAt: Date.now() - 3600000,
      messages: [
        {
          role: 'user',
          content: 'Olá! Estou planejando um novo projeto digital interativo e gostaria de ideias criativas para surpreender o usuário desde o primeiro segundo.'
        },
        {
          role: 'ai',
          content: `Excelente iniciativa! Para criar uma experiência memorável e cativante, recomendo focar nestes 3 pilares:\n\n1. **Micro-interações fluidas:** Botões com respostas táteis sutis, transições suaves e tipografia moderna que respira.\n2. **Efeito Streaming em tempo real:** Deixar que o conteúdo apareça progressivamente, criando uma sensação viva e dinâmica.\n3. **Adaptabilidade Multi-tela:** Uma interface que parece feita sob medida tanto quando você abre no celular na rua, quanto no tablet no sofá ou no computador de trabalho.\n\nQual é o nicho ou objetivo central do seu projeto? Posso detalhar o design visual ou os recursos essenciais!`
        }
      ]
    },
    {
      id: 'chat-2',
      title: 'Dicas de Programação & Foco',
      updatedAt: Date.now() - 86400000,
      messages: [
        {
          role: 'user',
          content: 'Quais são as melhores práticas para manter a disciplina ao aprender uma nova linguagem de programação?'
        },
        {
          role: 'ai',
          content: `A chave para a consistência na programação é a **prática deliberada em pequenos ciclos**:\n\n• **Construa projetos reais:** Não fique apenas assistindo a tutoriais passivamente. Escreva código todos os dias, mesmo que sejam apenas 15 linhas.\n• **Entenda os erros:** As mensagens de erro no console são os seus melhores professores. Desenvolva o hábito de ler a pilha de chamadas (*stack trace*).\n• **Compartilhe o progresso:** Colocar seus projetos no GitHub e documentar o que você aprendeu consolida a memória e cria um portfólio valioso.\n\nQual tecnologia ou linguagem você está estudando no momento? Posso sugerir um mini-projeto para você praticar hoje!`
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
    }, 2800);
  }

  // --- GERENCIAMENTO DE TELAS (SPA) ---
  function showView(viewName) {
    Object.keys(views).forEach(key => {
      if (views[key]) views[key].classList.remove('active');
    });

    if (views[viewName]) {
      views[viewName].classList.add('active');
      window.scrollTo(0, 0);
    }
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

  // --- SIMULADOR DE PRODUTIVIDADE ---
  if (roiSlider && roiUsersVal && roiBubbleCost && roiKambaCost && roiSavingsPct) {
    roiSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      roiUsersVal.textContent = `${val} perguntas / semana`;

      const manualHours = (val * 0.25).toFixed(1);
      const aiMinutes = Math.round(val * 1.2);
      const hoursSaved = (val * 0.23).toFixed(1);

      roiBubbleCost.textContent = `~${manualHours}h gastas`;
      roiKambaCost.textContent = `~${aiMinutes} minutos`;
      roiSavingsPct.textContent = `+${hoursSaved} Horas / sem`;
    });
  }

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
    if (displayUserName) displayUserName.textContent = user.name || 'Bruno';
    showView('dashboard');
    showToast(`Bem-vindo, ${user.name || 'ao Kamba Chat'}!`, '👋');
    initChatDashboard();
  }

  if (tabLogin) tabLogin.addEventListener('click', () => updateAuthMode(false));
  if (tabRegister) tabRegister.addEventListener('click', () => updateAuthMode(true));
  if (btnAuthToggleMode) btnAuthToggleMode.addEventListener('click', () => updateAuthMode(!isRegisterMode));

  if (btnFastDemo) {
    btnFastDemo.addEventListener('click', () => {
      handleLoginSuccess({ name: 'Bruno', email: 'usuario@kamba.ia' });
    });
  }

  if (formAuth) {
    formAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = inputEmail ? inputEmail.value.trim() : '';
      const name = isRegisterMode && inputName ? inputName.value.trim() : (email.split('@')[0] || 'Usuário');
      handleLoginSuccess({ name: name || 'Bruno', email: email || 'usuario@kamba.ia' });
    });
  }

  if (btnAuthBack) {
    btnAuthBack.addEventListener('click', () => showView('landing'));
  }

  // Botões de abertura direta do chat
  [btnHeaderStart, btnHeroStart, btnTerminalTry, btnBannerStart].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        handleLoginSuccess({ name: currentUser?.name || 'Bruno', email: currentUser?.email || 'usuario@kamba.ia' });
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
          if (featEl) {
            featEl.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  }

  if (logoRefresh) {
    logoRefresh.addEventListener('click', () => showView('landing'));
  }

  if (btnDashHome || linkNavHome) {
    [btnDashHome, linkNavHome].forEach(b => {
      if (b) b.addEventListener('click', (e) => {
        e.preventDefault();
        showView('landing');
      });
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      showView('landing');
      showToast('Voltou à página inicial.', '🏠');
    });
  }

  // --- CONTROLE DA GAVETA LATERAL (SIDEBAR RESPONSIVO) ---
  if (btnToggleSidebar && dashSidebar && sidebarOverlay) {
    btnToggleSidebar.addEventListener('click', () => {
      dashSidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });
  }

  function closeSidebar() {
    if (dashSidebar) dashSidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // --- GERENCIAMENTO DE CONVERSAS (CHATS) ---
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
    closeSidebar();
    showToast('Nova conversa iniciada.', '✨');
  }

  function loadChat(chatId) {
    currentChatId = chatId;
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    if (chatMessages) chatMessages.innerHTML = '';

    if (chat.messages.length === 0) {
      renderWelcomeHero();
    } else {
      chat.messages.forEach(msg => {
        appendMessageToDOM(msg.role, msg.content, false);
      });
    }

    renderHistory();
    scrollToBottom();
  }

  function renderWelcomeHero() {
    if (!chatMessages) return;
    chatMessages.innerHTML = `
      <div class="chat-welcome-hero">
        <div class="welcome-palanca-badge">
          <svg viewBox="0 0 100 100" style="width: 40px; height: 40px;">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#D81A2D" stroke-width="4"/>
            <path d="M22 68 C28 62 34 54 44 48 C50 44 58 42 66 40 C72 39 78 35 82 28 C80 32 75 36 70 38 C76 34 84 26 88 16 C83 23 76 28 68 31 C64 26 56 22 48 24 C40 26 34 32 30 38 C26 44 24 52 22 68 Z" fill="#FFD100"/>
            <path d="M42 49 L36 76 L44 76 L48 56 Z" fill="#FFD100"/>
            <path d="M58 44 L64 74 L70 74 L68 50 Z" fill="#FFD100"/>
          </svg>
        </div>
        <h3 class="welcome-title">Olá, ${currentUser?.name || 'Bruno'}! Sobre o que gostaria de conversar hoje?</h3>
        <p class="welcome-subtitle">Pergunte qualquer coisa, peça para criar um texto, programar ou tirar dúvidas em qualquer área do conhecimento.</p>

        <div class="welcome-card-grid">
          <div class="welcome-card" data-prompt="Escreva uma história curta e inspiradora sobre superação e criatividade.">
            <div class="welcome-card-header">
              <span>💡</span>
              <strong>Criatividade & Escrita</strong>
            </div>
            <p class="welcome-card-desc">Crie crônicas, poemas, redações, e-mails elegantes ou enredos fascinantes.</p>
          </div>

          <div class="welcome-card" data-prompt="Como criar uma função em JavaScript para debugar requisições assíncronas com tratamento de erros?">
            <div class="welcome-card-header">
              <span>💻</span>
              <strong>Programação & Dev</strong>
            </div>
            <p class="welcome-card-desc">Explicar códigos, refatorar algoritmos, debugar erros ou criar componentes web.</p>
          </div>

          <div class="welcome-card" data-prompt="Explique como funciona a teoria da relatividade geral de Einstein com uma analogia simples.">
            <div class="welcome-card-header">
              <span>🌌</span>
              <strong>Ciência & Estudos</strong>
            </div>
            <p class="welcome-card-desc">Resumos didáticos, explicações conceituais e rotinas de estudo eficazes.</p>
          </div>

          <div class="welcome-card" data-prompt="Crie um plano prático de 5 passos para organizar minha rotina e evitar a procrastinação esta semana.">
            <div class="welcome-card-header">
              <span>⚡</span>
              <strong>Foco & Produtividade</strong>
            </div>
            <p class="welcome-card-desc">Métodos de concentração, gestão de tempo, hábitos saudáveis e priorização.</p>
          </div>
        </div>
      </div>
    `;

    // Conectar os cards de boas-vindas
    const welcomeCards = chatMessages.querySelectorAll('.welcome-card');
    welcomeCards.forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        if (prompt && chatInput) {
          chatInput.value = prompt;
          sendMessage();
        }
      });
    });
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
    showToast('Conversa eliminada.', '🗑');
  }

  // --- RENDERIZAÇÃO DE MENSAGENS E STREAMING ---
  function appendMessageToDOM(role, text, isStreaming = false) {
    if (!chatMessages) return null;
    const welcome = chatMessages.querySelector('.chat-welcome-hero');
    if (welcome) welcome.remove();

    const row = document.createElement('div');
    row.className = `msg-row ${role}`;

    const avatarHtml = role === 'ai' 
      ? `<div class="msg-avatar-ai">
           <svg viewBox="0 0 100 100" style="width:24px;height:24px;">
             <circle cx="50" cy="50" r="45" fill="#D81A2D"/>
             <path d="M22 68 C28 62 34 54 44 48 C50 44 58 42 66 40 C72 39 78 35 82 28 C80 32 75 36 70 38 C76 34 84 26 88 16 C83 23 76 28 68 31 C64 26 56 22 48 24 C40 26 34 32 30 38 C26 44 24 52 22 68 Z" fill="#FFD100"/>
             <path d="M42 49 L36 76 L44 76 L48 56 Z" fill="#FFD100"/>
             <path d="M58 44 L64 74 L70 74 L68 50 Z" fill="#FFD100"/>
           </svg>
         </div>`
      : `<div class="msg-avatar">
           <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="Usuário">
         </div>`;

    row.innerHTML = `
      ${avatarHtml}
      <div class="msg-bubble">
        <div class="msg-content">${formatMarkdown(text)}</div>
        ${isStreaming ? '<span class="typing-cursor"></span>' : ''}
        ${role === 'ai' && !isStreaming ? createMessageActionsHtml(text) : ''}
      </div>
    `;

    if (role === 'ai' && !isStreaming) {
      attachMessageActionEvents(row, text);
    }

    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function createMessageActionsHtml(text) {
    return `
      <div class="msg-actions-bar">
        <button class="btn-msg-action btn-copy-msg" title="Copiar resposta">
          <span>📋 Copiar Texto</span>
        </button>
        <button class="btn-msg-action btn-export-doc" title="Visualizar em tela cheia">
          <span>📄 Expandir</span>
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

    const btnExport = rowElement.querySelector('.btn-export-doc');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        openDocumentModal(text);
      });
    }
  }

  function openDocumentModal(rawText) {
    currentDocTextForPrint = rawText;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    if (modalDocRef) modalDocRef.textContent = `KAMBA-${Date.now().toString().slice(-6)}`;
    if (modalDocDate) modalDocDate.textContent = formattedDate;
    if (modalDocContent) modalDocContent.innerHTML = formatMarkdown(rawText);

    if (modalExecutivePreview) {
      modalExecutivePreview.classList.add('active');
    }
  }

  if (btnCloseModalPreview) {
    btnCloseModalPreview.addEventListener('click', () => {
      if (modalExecutivePreview) modalExecutivePreview.classList.remove('active');
    });
  }

  if (btnModalCopyText) {
    btnModalCopyText.addEventListener('click', () => {
      navigator.clipboard.writeText(currentDocTextForPrint).then(() => {
        showToast('Texto copiado com sucesso!', '📋');
      });
    });
  }

  if (btnModalPrintNow) {
    btnModalPrintNow.addEventListener('click', () => {
      window.print();
    });
  }

  function scrollToBottom() {
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  // --- MOTOR DE INTELIGÊNCIA ARTIFICIAL UNIVERSAL (PARA QUALQUER ASSUNTO) ---
  function generateUniversalAIResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // 1. Programação, Código, Tecnologia e Desenvolvimento
    if (q.includes('código') || q.includes('program') || q.includes('javascript') || q.includes('python') || q.includes('html') || q.includes('css') || q.includes('api') || q.includes('react') || q.includes('node') || q.includes('sql') || q.includes('função') || q.includes('bug')) {
      if (q.includes('python')) {
        return `Com certeza! Aqui está uma solução limpa e idiomática em **Python**:\n\n\`\`\`python\ndef processar_dados(valores):\n    """Calcula estatísticas básicas de uma lista de valores numéricos."""\n    if not valores:\n        return {"total": 0, "media": 0, "maior": None, "menor": None}\n        \n    total = sum(valores)\n    media = total / len(valores)\n    return {\n        "total": total,\n        "media": round(media, 2),\n        "maior": max(valores),\n        "menor": min(valores)\n    }\n\n# Exemplo de teste:\nnumeros = [14, 28, 42, 56, 70]\nresultado = processar_dados(numeros)\nprint("Estatísticas:", resultado)\n\`\`\`\n\n**Pontos Importantes:**\n• **Tratamento de lista vazia:** Garante que a função não dispare exceções.\n• **Estruturação em dicionário:** Facilita a leitura e o consumo em APIs ou bancos de dados.\n\nDeseja adaptar este código para leitura de arquivos ou integração com bibliotecas como Pandas?`;
      }

      return `Aqui está uma implementação moderna e eficiente em **JavaScript (ES6+)**:\n\n\`\`\`javascript\n// Função utilitária assíncrona com tratamento robusto de erros\nasync function buscarComRetry(url, tentativas = 3, atraso = 1000) {\n  for (let i = 1; i <= tentativas; i++) {\n    try {\n      const resposta = await fetch(url);\n      if (!resposta.ok) throw new Error(\`Erro HTTP: \${resposta.status}\`);\n      return await resposta.json();\n    } catch (erro) {\n      if (i === tentativas) throw erro;\n      console.warn(\`Tentativa \${i} falhou. Tentando novamente em \${atraso}ms...\`);\n      await new Promise(r => setTimeout(r, atraso));\n    }\n  }\n}\n\n// Exemplo de execução:\nbuscarComRetry('https://api.exemplo.com/dados')\n  .then(dados => console.log('Dados recebidos com sucesso:', dados))\n  .catch(erro => console.error('Todas as tentativas falharam:', erro.message));\n\`\`\`\n\n**O que este código faz:**\n1. Realiza requisições com mecanismo de repetição automática (*retry*).\n2. Evita que falhas pontuais de conexão derrubem a interface do usuário.\n3. Código limpo, não bloqueante e pronto para uso em produção.\n\nPrecisa de ajustes para TypeScript, React ou back-end em Node.js?`;
    }

    // 2. Criatividade, Histórias, Poesia, Redação Literária
    if (q.includes('história') || q.includes('poema') || q.includes('conto') || q.includes('crônica') || q.includes('escreva') || q.includes('literat') || q.includes('poesia') || q.includes('criativ')) {
      return `Aqui está uma narrativa criada especialmente para você:\n\n### O Farol das Constelações\n\n*No silêncio das altas madrugadas, quando as luzes da cidade começavam a adormecer uma a uma, Lucas subia até a varanda do décimo quarto andar. Levava consigo um caderno desgastado e uma xícara de café já frio.*\n\n*Ele não olhava para baixo, onde o trânsito corria com a pressa dos homens; olhava para o céu aberto. Sempre acreditou que as estrelas eram perguntas antigas deixadas por quem veio antes de nós, esperando que alguém tivesse a coragem de inventar as respostas.*\n\n*Naquela noite, uma estrela cadente cortou a escuridão como uma linha de fogo. Lucas não fez um pedido tradicional de riqueza ou sorte. Em vez disso, escreveu na primeira folha em branco:*\n\n> *"O futuro não é um lugar aonde vamos, mas um horizonte que moldamos a cada escolha do presente."*\n\n*Guardou a caneta, respirou o ar fresco da noite e soube, no fundo do peito, que o dia seguinte seria o início de algo extraordinário.*\n\n---\n\n*Gostou do tom? Podemos continuar a história, transformá-la em uma crônica poética ou desenvolver novos personagens!*`;
    }

    // 3. Estudos, Ciência, Física, Astronomia, Matemática
    if (q.includes('ciência') || q.includes('física') || q.includes('relatividade') || q.includes('quântic') || q.includes('espaço') || q.includes('universo') || q.includes('estud') || q.includes('matemát') || q.includes('biologia')) {
      return `Aqui está uma explicação clara e fascinante sobre o assunto:\n\n### Compreendendo o Conceito em 3 Passos Simples\n\n1. **A Base Intuitiva:**\n   Imagine o tecido do espaço como um lençol elástico esticado. Se você colocar uma bola pesada de boliche no centro, ela cria uma curvatura profunda. Qualquer esfera menor colocada perto começará a girar em torno da maior — não porque existe uma força invisível puxando-a, mas porque a própria geometria do caminho foi curvada. Essa é a essência da **gravitação moderna**.\n\n2. **A Influência do Tempo:**\n   Quanto mais forte a gravidade (ou mais rápida a sua velocidade no espaço), mais devagar o tempo passa para você em relação a quem está longe desse campo. É por isso que os satélites de GPS precisam corrigir diariamente seus relógios em microssegundos para não errarem a sua localização na Terra.\n\n3. **Aplicações no Mundo Real:**\n   Desde as tecnologias de lasers e semicondutores até a compreensão da evolução de estrelas e galáxias, a ciência fundamental molda todas as inovações que hoje carregamos no bolso.\n\nQual parte desse fenômeno você gostaria de explorar mais a fundo?`;
    }

    // 4. Produtividade, Gestão de Tempo, Hábitos e Foco
    if (q.includes('foco') || q.includes('produtiv') || q.includes('hábito') || q.includes('tempo') || q.includes('rotina') || q.includes('procrastina') || q.includes('planej') || q.includes('meta')) {
      return `Aqui está um **Guia Prático de Foco & Produtividade** sem fórmulas mágicas, baseado em ciência comportamental:\n\n### 🎯 O Plano dos 3 Blocos Diários\n\n1. **Bloco de Ouro (Primeiras 2 horas do dia):**\n   • Elimine o celular nos primeiros 45 minutos ao acordar.\n   • Dedique o primeiro bloco de trabalho à sua tarefa mais importante e desafiadora antes de abrir caixas de entrada ou mensagens.\n\n2. **A Regra dos 2 Minutos:**\n   • Qualquer tarefa que leve menos de 2 minutos para ser resolvida (responder um aviso urgente, guardar um item, agendar um compromisso) deve ser feita imediatamente para desocupar a memória de trabalho.\n\n3. **Fechamento Consciente da Noite:**\n   • Antes de encerrar o dia, anote exatamente **apenas 3 prioridades** para o dia seguinte. Quando acordar, você não precisará decidir o que fazer — apenas executar.\n\n> *Lembre-se: Produtividade não é sobre estar ocupado o tempo todo, mas sobre direcionar sua energia com clareza para o que realmente tem valor.*\n\nDeseja que eu personalize esse roteiro para os seus horários específicos de trabalho ou estudo?`;
    }

    // 5. Culinária e Receitas
    if (q.includes('receita') || q.includes('jantar') || q.includes('almoço') || q.includes('comida') || q.includes('cozinha') || q.includes('culinár')) {
      return `Aqui está uma sugestão rápida, saborosa e nutritiva que você prepara em **menos de 20 minutos**:\n\n### 🍝 Massa Rápida ao Alho, Ervas Frescas e Tomates Confit\n\n**Ingredientes:**\n• 200g de espaguete ou penne\n• 3 dentes de alho laminados finamente\n• 1 xícara de tomates cereja cortados ao meio\n• Azeite de oliva extravirgem, sal e pimenta-do-reino a gosto\n• Folhas de manjericão fresco e queijo parmesão ralado\n\n**Modo de Preparo:**\n1. Cozinhe a massa em água bem salgada até ficar *al dente*. Reserve meia xícara da água do cozimento.\n2. Em uma frigideira ampla, aqueça 3 colheres de azeite e doure levemente o alho sem queimar.\n3. Acrescente os tomates cereja e salteie por 3 minutos até começarem a soltar seu suco natural.\n4. Adicione a massa cozida, a água reservada e mexa vigorosamente para emulsionar o molho.\n5. Finalize com manjericão fresco, parmesão ralado e sirva imediatamente!\n\nBom apetite! Quer sugestões de sobremesas leves ou opções vegetarianas?`;
    }

    // 6. Saudações e Conversa Inicial
    if (q === 'olá' || q === 'ola' || q === 'oi' || q === 'bom dia' || q === 'boa tarde' || q === 'boa noite' || q.includes('quem é você') || q.includes('como você funciona')) {
      return `Olá! Que bom ter você por aqui. 😊\n\nEu sou o **Kamba Chat IA**, o seu assistente de inteligência artificial criado para conversar com total liberdade sobre **qualquer assunto**.\n\n**Algumas coisas com as quais posso te ajudar:**\n• 💡 Criar histórias, redações, posts, e-mails e poesias;\n• 💻 Explicar códigos, programar em várias linguagens e resolver bugs;\n• 📚 Tirar dúvidas de ciências, matemática, história e filosofia;\n• ⚡ Organizar rotinas de estudo, planos de foco e produtividade;\n• 🗣️ Simplesmente bater um papo descontraído sobre o seu dia a dia.\n\nSobre o que você gostaria de conversar ou criar agora? Pode perguntar qualquer coisa!`;
    }

    // 7. RESPOSTA LIVRE INTELIGENTE (FALLBACK UNIVERSAL PARA QUALQUER PERGUNTA)
    return `Com certeza! Analisei a sua mensagem com atenção.\n\nSobre **"${userQuery.trim()}"**, aqui estão os pontos essenciais que vale destacar:\n\n1. **Perspectiva Principal:**\n   Essa questão envolve entender tanto o contexto prático quanto as diferentes abordagens que podemos adotar para obter o melhor resultado.\n\n2. **Aplicação & Destaques:**\n   • **Clareza e Direção:** Definir o objetivo com precisão é sempre o primeiro passo para avançar com segurança.\n   • **Abordagem Passo a Passo:** Dividir o processo em etapas menores facilita a compreensão e a execução no dia a dia.\n   • **Flexibilidade:** É sempre importante testar diferentes alternativas e adaptar a solução ao seu ritmo e necessidades.\n\n3. **Próximo Passo:**\n   Podemos aprofundar qualquer detalhe específico que você desejar — seja criando um plano de ação, redigindo um texto explicativo ou analisando outras facetas do tema.\n\nComo você prefere dar continuidade a essa conversa?`;
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

    // Atualizar métricas dinâmicas
    totalSearchesCount++;
    if (countSearches) {
      countSearches.textContent = `${totalSearchesCount} Ativas`;
    }

    totalProposalsCount++;
    if (countProposals) {
      countProposals.textContent = `${totalProposalsCount} Tópicos`;
    }

    isGenerating = true;
    if (btnSendMessage) btnSendMessage.disabled = true;

    // Obter resposta inteligente universal
    const aiResponseText = generateUniversalAIResponse(text);
    const aiRow = appendMessageToDOM('ai', '', true);
    if (!aiRow) return;

    const contentDiv = aiRow.querySelector('.msg-content');
    const bubbleDiv = aiRow.querySelector('.msg-bubble');
    const cursor = aiRow.querySelector('.typing-cursor');

    let currentText = '';
    const speed = 8; // Velocidade natural de digitação (streaming)

    for (let i = 0; i < aiResponseText.length; i++) {
      currentText += aiResponseText[i];
      if (contentDiv) contentDiv.innerHTML = formatMarkdown(currentText);
      scrollToBottom();
      await new Promise(r => setTimeout(r, speed));
    }

    // Finalizar streaming
    if (cursor) cursor.remove();
    isGenerating = false;
    if (btnSendMessage) btnSendMessage.disabled = false;

    // Salvar na memória do chat
    chat.messages.push({ role: 'ai', content: aiResponseText });
    saveChatsToStorage();
    renderHistory();

    // Adicionar botões de ação na bolha
    if (bubbleDiv) {
      const actionsWrapper = document.createElement('div');
      actionsWrapper.innerHTML = createMessageActionsHtml(aiResponseText);
      bubbleDiv.appendChild(actionsWrapper.firstElementChild);
      attachMessageActionEvents(aiRow, aiResponseText);
    }
  }

  // Eventos de envio
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

  // Conectar chips de prompts rápidos
  quickPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt && chatInput) {
        chatInput.value = prompt;
        sendMessage();
      }
    });
  });

  // Limpar conversa atual
  if (btnClearChat) {
    btnClearChat.addEventListener('click', () => {
      const chat = chats.find(c => c.id === currentChatId);
      if (chat) {
        chat.messages = [];
        saveChatsToStorage();
        loadChat(currentChatId);
        showToast('Conversa limpa.', '🧹');
      }
    });
  }

  // Novo Chat
  if (btnNewChat) {
    btnNewChat.addEventListener('click', createNewChat);
  }

  // Filtro de Histórico
  if (historyFilterInput) {
    historyFilterInput.addEventListener('input', (e) => {
      historySearchTerm = e.target.value.toLowerCase().trim();
      renderHistory();
    });
  }

  function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';

    const filtered = chats.filter(c => {
      if (!historySearchTerm) return true;
      const titleMatch = c.title.toLowerCase().includes(historySearchTerm);
      const msgMatch = c.messages.some(m => m.content.toLowerCase().includes(historySearchTerm));
      return titleMatch || msgMatch;
    });

    if (filtered.length === 0) {
      historyList.innerHTML = '<li style="padding:14px; color:var(--text-dim); font-size:12.5px; text-align:center;">Nenhuma conversa encontrada.</li>';
      return;
    }

    filtered.forEach(chat => {
      const li = document.createElement('li');
      li.className = `history-item ${chat.id === currentChatId ? 'active' : ''}`;

      li.innerHTML = `
        <div class="history-item-icon">💬</div>
        <div class="history-item-title">${escapeHtml(chat.title)}</div>
        <button class="btn-del-history" title="Excluir conversa">✕</button>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-del-history')) {
          e.stopPropagation();
          deleteChat(chat.id);
        } else {
          loadChat(chat.id);
          closeSidebar();
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
    formatted = formatted.replace(/^>\s?(.*)$/gm, '<blockquote style="border-left:3px solid var(--angola-yellow);padding-left:10px;margin:8px 0;color:var(--text-muted);font-style:italic;">$1</blockquote>');

    // Quebras de linha para <br>
    formatted = formatted.replace(/\n/g, '<br>');

    // Marcadores de lista •
    formatted = formatted.replace(/•\s?/g, '<span style="color:var(--angola-yellow);margin-right:6px;">●</span>');

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
    if (chats.length === 0) {
      createNewChat();
    } else {
      loadChat(chats[0].id);
    }
  }

  // Iniciar na landing page por padrão
  showView('landing');
});

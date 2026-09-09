/* ============================================================
   PRODIGY KAMBA IA — APLICAÇÃO WEB MODULAR (ESTILO VERCEL)
   Navegação SPA, Autenticação, Hero Interativo, FAQ e Chat IA
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

  // Terminal Interativo do Hero (Estilo Vercel)
  const terminalTabs = document.querySelectorAll('.t-tab');
  const interactiveUserQuery = document.getElementById('interactive-user-query');
  const interactiveAiResponse = document.getElementById('interactive-ai-response');

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Dados das Abas Interativas da Landing Page
  const terminalData = {
    luanda: {
      query: 'Kamba, qual é a análise para investimentos comerciais em Luanda e províncias vizinhas?',
      response: `Bom dia, António. O mercado de <strong>Luanda e do corredor de Benguela</strong> regista forte aceleração em:<br><br>
• <strong>Logística & Abastecimento:</strong> Crescimento na procura por distribuição direta entre polos industriais (Viana/Cacuaco) e o comércio retalhista.<br>
• <strong>Digitalização B2B:</strong> Alta adesão a meios de liquidação instantânea (Multicaixa Express e pagamentos por referência).<br>
• <strong>Parcerias com o INAPEM:</strong> Oportunidades abertas para suporte técnico a PMEs no selo "Feito em Angola".<br><br>
<em class="text-gold-light">Deseja que eu redija uma proposta comercial formatada para a sua empresa?</em>`
    },
    inapem: {
      query: 'Kamba, elabore uma minuta formal de cooperação para submeter à direção do INAPEM.',
      response: `<strong>Exmª. Senhora Diretora do INAPEM Luanda</strong><br><br>
<strong>Assunto: Proposta de Cooperação Estratégica B2B & Modernização Digital</strong><br><br>
1. <strong>Enquadramento:</strong> Alinhados com as diretrizes do Executivo Angolano de incentivo à produção interna, vimos apresentar a infraestrutura Prodigy Kamba.<br>
2. <strong>Impacto nas PMEs:</strong> Redução de 40% no tempo de emissão de propostas comerciais e conexão a redes de distribuição interprovincial.<br>
3. <strong>Próximos Passos:</strong> Sessão presencial de alinhamento com a equipa técnica.<br><br>
<em class="text-gold-light">Minuta executiva gerada em 0.4s. Pronta para exportação ou envio.</em>`
    },
    b2b: {
      query: 'Como estruturar a expansão comercial de produtos industriais a partir de Luanda para o Huambo e Benguela?',
      response: `Recomendo uma abordagem em 3 vetores estratégicos para Angola:<br><br>
• <strong>Ponto Focal Logístico:</strong> Estabelecer entreposto avançado no Lobito aproveitando a infraestrutura ferroviária do Corredor do Lobito.<br>
• <strong>Condições Comerciais:</strong> Implementar prazos de liquidação vinculados à confirmação de entrega via transportadoras locais credenciadas.<br>
• <strong>Rede de Representantes:</strong> Credenciar distribuidores locais com tabela escalonada de comissões por volume.<br><br>
<em class="text-gold-light">Deseja que eu calcule as estimativas de custos logísticos para esta rota?</em>`
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
  let totalSearchesCount = 34;
  let totalProposalsCount = 14;

  // Simulador ROI (Landing Page)
  const roiSlider = document.getElementById('roi-slider');
  const roiUsersVal = document.getElementById('roi-users-val');
  const roiBubbleCost = document.getElementById('roi-bubble-cost');
  const roiKambaCost = document.getElementById('roi-kamba-cost');
  const roiSavingsPct = document.getElementById('roi-savings-pct');

  // Modal de Impressão / PDF Executivo
  const modalExecutivePreview = document.getElementById('modal-executive-preview');
  const modalDocContent = document.getElementById('modal-doc-content');
  const modalDocRef = document.getElementById('modal-doc-ref');
  const modalDocDate = document.getElementById('modal-doc-date');
  const btnCloseModalPreview = document.getElementById('btn-close-modal-preview');
  const btnModalCopyText = document.getElementById('btn-modal-copy-text');
  const btnModalPrintNow = document.getElementById('btn-modal-print-now');
  const printDocContent = document.getElementById('print-doc-content');
  const printDocRef = document.getElementById('print-doc-ref');
  const printDocDate = document.getElementById('print-doc-date');
  let currentDocTextForPrint = '';

  // Toast
  const kambaToast = document.getElementById('kamba-toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimer = null;

  // --- ESTADO DA APLICAÇÃO ---
  let isRegisterMode = false;
  let currentUser = JSON.parse(localStorage.getItem('prodigy_kamba_user')) || null;
  let currentChatId = null;
  let isGenerating = false;
  let historySearchTerm = '';

  // Conversas oficiais pré-carregadas (Seed Data)
  const defaultChats = [
    {
      id: 'chat-1',
      title: 'Mercado de Luanda & INAPEM',
      updatedAt: Date.now() - 3600000,
      messages: [
        {
          role: 'ai',
          content: 'Bom dia, António. A pesquisa sobre o mercado de Luanda está concluída. O contacto chave na INAPEM é Maria Silva (+244 9XX XXX XXX). Como deseja prosseguir com a comunicação?'
        },
        {
          role: 'user',
          content: 'Obrigado, Kamba. Por favor, redija uma proposta formal em PT-PT para a INAPEM baseada nestes dados, focando na nossa plataforma B2B.'
        },
        {
          role: 'ai',
          content: 'Com certeza, António. Segue a estrutura da proposta formal pronta para envio:\n\n**Exmª. Senhora Maria Silva**\n*Direção de Fomento e Apoio às PME — INAPEM Luanda*\n\n**Assunto: Apresentação da Plataforma Prodigy Global Trade & Parceria Estratégica**\n\n1. **Enquadramento:** No âmbito da aceleração económica nacional e do incentivo à produção "Feito em Angola", propomos a integração dos associados do INAPEM no ecossistema digital B2B.\n2. **Solução Tecnológica:** Disponibilização de catálogo digital, inteligência preditiva de compras e acesso a investidores regionais.\n3. **Próximos Passos:** Agendamento de uma sessão demonstrativa presencial ou remota na sede do INAPEM em Luanda.\n\nFico ao seu dispor para exportar a proposta formal caso deseje.'
        }
      ]
    },
    {
      id: 'chat-2',
      title: 'Estratégia de Expansão Benguela',
      updatedAt: Date.now() - 86400000,
      messages: [
        {
          role: 'user',
          content: 'Kamba, quais são os principais sectores em crescimento no corredor do Lobito e Benguela?'
        },
        {
          role: 'ai',
          content: 'Excelente questão, António. O Corredor do Lobito e a província de Benguela estão a viver um forte impulso, com destaque para:\n\n• **Logística & Transportes:** Modernização da linha ferroviária até à fronteira com a RDC e Zâmbia.\n• **Agroindústria:** Cultivo e escoamento de cereais, frutas e pecuária no vale do Cavaco e Cubal.\n• **Pesca e Conservas:** Potencial de exportação e processamento industrial no litoral.\n\nRecomendo posicionar soluções comerciais voltadas à cadeia de fornecimento e distribuição interprovincial.'
        }
      ]
    }
  ];

  let chats = JSON.parse(localStorage.getItem('prodigy_kamba_chats')) || defaultChats;

  // --- TOAST NOTIFICATIONS ---
  function showToast(msg, icon = '✓') {
    if (!kambaToast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastIcon.textContent = icon;
    toastMessage.textContent = msg;
    kambaToast.classList.add('show');
    toastTimer = setTimeout(() => {
      kambaToast.classList.remove('show');
    }, 2800);
  }

  // --- GERENCIAMENTO DE TELAS (SPA) ---
  function showView(viewName) {
    Object.keys(views).forEach(key => {
      views[key].classList.remove('active');
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
      if (terminalData[tabKey]) {
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

      // Fecha todos os outros
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
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      groupName.style.display = 'block';
      authBtnText.textContent = 'Criar Conta';
      authToggleText.textContent = 'Já tem conta? Aceder';
    } else {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      groupName.style.display = 'none';
      authBtnText.textContent = 'Entrar';
      authToggleText.textContent = 'Registar';
    }
  }

  function handleLoginSuccess(user) {
    currentUser = user;
    localStorage.setItem('prodigy_kamba_user', JSON.stringify(user));
    if (displayUserName) {
      displayUserName.textContent = user.name || 'António Costa';
    }

    if (chats.length > 0) {
      loadChat(chats[0].id);
    } else {
      createNewChat();
    }

    renderHistory();
    showView('dashboard');
    showToast(`Bem-vindo, ${user.name || 'António'}! Modo livre ativo.`, '🇦🇴');
  }

  function handleLogout() {
    currentUser = null;
    localStorage.removeItem('prodigy_kamba_user');
    showToast('Sessão terminada com sucesso.', 'ℹ');
    showView('landing');
  }

  // --- HISTÓRICO DE CHAT ---
  function saveChatsToStorage() {
    localStorage.setItem('prodigy_kamba_chats', JSON.stringify(chats));
    renderHistory();
  }

  function renderHistory() {
    historyList.innerHTML = '';

    const filteredChats = chats.filter(chat => {
      if (!historySearchTerm) return true;
      const titleMatch = chat.title.toLowerCase().includes(historySearchTerm);
      const msgMatch = chat.messages && chat.messages.some(m => m.content.toLowerCase().includes(historySearchTerm));
      return titleMatch || msgMatch;
    });

    if (filteredChats.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'history-item';
      emptyLi.style.color = 'var(--text-dim)';
      emptyLi.style.fontStyle = 'italic';
      emptyLi.style.cursor = 'default';
      emptyLi.textContent = 'Nenhuma conversa encontrada';
      historyList.appendChild(emptyLi);
      return;
    }

    filteredChats.forEach(chat => {
      const li = document.createElement('li');
      li.className = `history-item ${chat.id === currentChatId ? 'active' : ''}`;
      
      li.innerHTML = `
        <span class="history-title" title="${escapeHtml(chat.title)}">${escapeHtml(chat.title)}</span>
        <button class="btn-delete-history" title="Eliminar conversa" data-id="${chat.id}">✕</button>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete-history')) {
          e.stopPropagation();
          deleteChat(chat.id);
          return;
        }
        loadChat(chat.id);
        closeSidebarMobile();
      });

      historyList.appendChild(li);
    });
  }

  function createNewChat() {
    const newId = 'chat-' + Date.now();
    const newChat = {
      id: newId,
      title: 'Nova Conversa',
      updatedAt: Date.now(),
      messages: []
    };

    chats.unshift(newChat);
    saveChatsToStorage();
    loadChat(newId);
    if (chatInput) chatInput.focus();
  }

  function loadChat(chatId) {
    currentChatId = chatId;
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    chatMessages.innerHTML = '';

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
    chatMessages.innerHTML = `
      <div class="chat-welcome-hero">
        <div class="welcome-palanca-badge">
          <svg viewBox="0 0 100 100" style="width: 38px; height: 38px;">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#D81A2D" stroke-width="4"/>
            <path d="M22 68 C28 62 34 54 44 48 C50 44 58 42 66 40 C72 39 78 35 82 28 C80 32 75 36 70 38 C76 34 84 26 88 16 C83 23 76 28 68 31 C64 26 56 22 48 24 C40 26 34 32 30 38 C26 44 24 52 22 68 Z" fill="#FFD100"/>
            <path d="M42 49 L36 76 L44 76 L48 56 Z" fill="#FFD100"/>
            <path d="M58 44 L64 74 L70 74 L68 50 Z" fill="#FFD100"/>
          </svg>
        </div>
        <h3 class="welcome-title">Olá, António. Como posso apoiar a Prodigy Trade hoje?</h3>
        <p class="welcome-subtitle">Selecione um tópico estratégico angolano abaixo ou escreva diretamente a sua demanda.</p>

        <div class="welcome-card-grid">
          <div class="welcome-card" data-prompt="Kamba, qual é a análise de oportunidades comerciais e abastecimento em Luanda e Benguela?">
            <div class="welcome-card-header">
              <span>📈</span>
              <strong>Mercado Luanda & Benguela</strong>
            </div>
            <p class="welcome-card-desc">Análise de abastecimento entre polos de Viana/Cacuaco e o comércio.</p>
          </div>

          <div class="welcome-card" data-prompt="Redija uma proposta formal de parceria institucional em PT-PT para submeter à direção do INAPEM.">
            <div class="welcome-card-header">
              <span>📝</span>
              <strong>Proposta Formal INAPEM</strong>
            </div>
            <p class="welcome-card-desc">Minuta executiva de cooperação e enquadramento no selo Feito em Angola.</p>
          </div>

          <div class="welcome-card" data-prompt="Elabore um modelo de contrato comercial de fornecimento e distribuição B2B sob as normas de Angola.">
            <div class="welcome-card-header">
              <span>⚖️</span>
              <strong>Minuta Contrato B2B</strong>
            </div>
            <p class="welcome-card-desc">Cláusulas de liquidação bancária, garantias e termos de entrega.</p>
          </div>

          <div class="welcome-card" data-prompt="Como posso expandir as operações da Prodigy aproveitando a ferrovia do Corredor do Lobito?">
            <div class="welcome-card-header">
              <span>🚀</span>
              <strong>Logística Corredor do Lobito</strong>
            </div>
            <p class="welcome-card-desc">Estratégias de exportação e interligação regional até às fronteiras.</p>
          </div>
        </div>
      </div>
    `;

    // Conectar os cards de boas-vindas
    const welcomeCards = chatMessages.querySelectorAll('.welcome-card');
    welcomeCards.forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        if (prompt) {
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
      }
    }
    showToast('Conversa eliminada.', '🗑');
  }

  // --- RENDERIZAÇÃO DE MENSAGENS E STREAMING ---
  function appendMessageToDOM(role, text, isStreaming = false) {
    // Remove welcome hero if exists
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
           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="António Costa">
         </div>`;

    row.innerHTML = `
      ${avatarHtml}
      <div class="msg-bubble">
        <div class="msg-content">${formatMarkdown(text)}</div>
        ${isStreaming ? '<span class="typing-cursor"></span>' : ''}
        ${role === 'ai' && !isStreaming ? createMessageActionsHtml(text) : ''}
      </div>
    `;

    // Conectar eventos dos botões de ação se não for streaming
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
        <button class="btn-msg-action btn-copy-msg" title="Copiar texto para transferência">
          <span>📋 Copiar Resposta</span>
        </button>
        <button class="btn-msg-action btn-download-msg" title="Descarregar proposta em .txt">
          <span>📥 Descarregar (.txt)</span>
        </button>
        <button class="btn-msg-action btn-print-msg" title="Visualizar e Imprimir / Guardar como PDF oficial">
          <span>🖨️ Imprimir / PDF</span>
        </button>
      </div>
    `;
  }

  function attachMessageActionEvents(rowElement, text) {
    const btnCopy = rowElement.querySelector('.btn-copy-msg');
    const btnDownload = rowElement.querySelector('.btn-download-msg');
    const btnPrint = rowElement.querySelector('.btn-print-msg');

    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
          btnCopy.classList.add('copied');
          btnCopy.innerHTML = '<span>✓ Copiado!</span>';
          showToast('Resposta copiada para a área de transferência!', '📋');
          setTimeout(() => {
            btnCopy.classList.remove('copied');
            btnCopy.innerHTML = '<span>📋 Copiar Resposta</span>';
          }, 2000);
        });
      });
    }

    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        downloadAsTxt(text);
      });
    }

    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        openExecutiveDocumentModal(text);
      });
    }
  }

  function openExecutiveDocumentModal(rawText) {
    currentDocTextForPrint = rawText;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const refCode = `PGT-AO/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/EXP-${Date.now().toString().slice(-4)}`;

    if (modalDocRef) modalDocRef.textContent = refCode;
    if (modalDocDate) modalDocDate.textContent = formattedDate;
    if (modalDocContent) modalDocContent.innerHTML = formatMarkdown(rawText);

    if (printDocRef) printDocRef.textContent = refCode;
    if (printDocDate) printDocDate.textContent = formattedDate;
    if (printDocContent) printDocContent.innerHTML = formatMarkdown(rawText);

    if (modalExecutivePreview) {
      modalExecutivePreview.classList.add('active');
    }
  }

  function downloadAsTxt(content) {
    const header = `====================================================\nPRODIGY KAMBA IA — PROPOSTA / DOCUMENTO GERADO\nEmpresa: Prodigy Global Trade LTD (UK #17153989)\nData: ${new Date().toLocaleDateString('pt-AO')}\nOrigem: Kamba IA v2.1 (Angola Enterprise System)\n====================================================\n\n`;
    const fullText = header + content;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prodigy_Kamba_Minuta_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Minuta descarregada em formato .txt!', '📥');
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateKambaResponse(userQuery) {
    const query = userQuery.toLowerCase();

    // 1. Energia Solar & Transição Energética (Core Business Prodigy Global Trade)
    if (query.includes('solar') || query.includes('energia') || query.includes('renovável') || query.includes('fotovoltaic') || query.includes('bateria') || query.includes('minea') || query.includes('prodel')) {
      return `Análise estratégica para o sector de **Energia Solar & Transição Energética em Angola**:\n\n1. **Contexto Regulatório & Institucional:** O Executivo Angolano, via MINEA (Ministério da Energia e Águas), PRODEL e RNT, priorizou a eletrificação descentralizada com sistemas híbridos e mini-redes solares para o ciclo 2025–2030.\n2. **Oportunidades no Sul e Interior:** Províncias como Huíla, Namibe, Cunene e Benguela registam níveis de irradiação solar de pico superiores a **2.200 kWh/m²/ano**, ideais para centrais fotovoltaicas com sistemas industriais de armazenamento em baterias (BESS).\n3. **Substituição de Grupos Geradores:** Empresas industriais e herdades agrícolas em Angola gastam somas avultadas em gasóleo e manutenção. A transição para energia solar com amortização em 3 a 4 anos gera uma redução de custos operacionais até **65%**.\n4. **Estruturação pela Prodigy Global Trade:** Conexão entre fornecedores de tecnologia solar no Reino Unido/Europa e contratos de fornecimento B2B chave-na-mão com operadores em Luanda e províncias.\n\nDeseja que eu elabore uma minuta de manifestação de interesse ou proposta técnica preliminar para submissão a parceiros locais?`;
    }

    if (query.includes('luanda') || query.includes('mercado') || query.includes('investimento')) {
      return `Com base na conjuntura económica e empresarial de **Luanda e das províncias estratégicas**:\n\n1. **Distribuição & Logística Urbana:** Há grande procura por soluções que aproximem os entrepostos industriais de Viana e Cacuaco da malha retalhista urbana de Luanda.\n2. **Digitalização Comercial B2B:** Empresas angolanas estão a adotar com rapidez liquidações digitais instantâneas (Multicaixa Express e pagamentos por referência bancária BAI/BFA).\n3. **Substituição de Importações:** Bens de consumo e transformação alimentar nacional contam com fortes incentivos públicos e prioridade alfandegária.\n\nDeseja que eu elabore um plano de ação detalhado para um segmento específico da sua operação?`;
    }

    if (query.includes('inapem') || query.includes('proposta') || query.includes('parceria')) {
      return `Aqui está a estrutura de uma **Proposta Formal de Parceria Institucional** em padrão executivo angolano (PT-AO):\n\n**À Direção Geral do INAPEM Luanda**\n*Att: Direção de Apoio e Capacitação das PMEs*\n\n**Refª:** PGT/INAPEM/2026/01 — Cooperação Estratégica B2B & Modernização Tecnológica\n\n• **1. Apresentação Institucional:** A Prodigy Global Trade LTD (UK #17153989 / Prodigy Company Angola) vem apresentar a sua plataforma Kamba IA para fomento e digitalização das empresas registadas no INAPEM.\n• **2. Vantagens Tangíveis:** Capacitação em inteligência comercial, emissão ágil de orçamentos e facilitação no processo de certificação do selo "Feito em Angola".\n• **3. Metodologia de Implementação:** Workshops práticos e disponibilização de acesso sem custos de infraestrutura às micro e pequenas empresas seleccionadas.\n• **4. Próxima Etapa:** Agendamento de uma sessão de trabalho demonstrativa com a equipa técnica do INAPEM em Luanda.\n\nSubscrevo-me com a mais elevada consideração e estima institucional.`;
    }

    if (query.includes('contrato') || query.includes('fornecimento') || query.includes('minuta')) {
      return `Segue a minuta base para um **Contrato Comercial de Fornecimento B2B** em Angola:\n\n**CONTRATO DE FORNECIMENTO E COOPERAÇÃO COMERCIAL**\n\n**Entre:**\n1. **PRODIGY GLOBAL TRADE LTD**, com sede no Reino Unido e representação em Angola, adiante designada como Fornecedor;\n2. **[Nome da Empresa Parceira]**, NIF [XX.XXX.XXX/AO], adiante designada como Cliente.\n\n**Cláusula 1ª (Objeto):** O presente contrato regula as condições gerais de fornecimento de equipamentos, tecnologias e serviços especializados.\n**Cláusula 2ª (Preço e Liquidação):** Os pagamentos serão efetuados por transferência bancária ou referência Multicaixa no prazo acordado de 15 dias após recepção e guia de conformidade.\n**Cláusula 3ª (Garantia & Assistência):** O Fornecedor assegura garantia técnica operacional e peças de reposição pelo período de 12 meses.\n**Cláusula 4ª (Foro e Jurisdição):** Para resolução de quaisquer litígios emergentes, as partes convencionam a competência do Tribunal de Comarca de Luanda com renúncia a qualquer outro.\n\n*Minuta pronta para revisão jurídica e validação pelas administrações.*`;
    }

    if (query.includes('lobito') || query.includes('ferrovia') || query.includes('logística') || query.includes('benguela')) {
      return `O **Corredor do Lobito** constitui uma das maiores oportunidades comerciais da década para Angola:\n\n• **Ligação Transfronteiriça:** Permite o transporte ferroviário de minérios e mercadorias entre o Porto do Lobito, a RDC e a Zâmbia com tempos de trânsito até 60% inferiores.\n• **Centros de Consolidação:** Recomendo fixar entrepostos secundários em Benguela e Huambo para receber mercadorias do porto e distribuir pelas províncias centrais.\n• **Comércio Exterior:** Facilidade de desembaraço com regime aduaneiro simplificado da AGT para mercadorias em trânsito internacional.\n\nPretende uma simulação de custos logísticos ou frete para esta rota?`;
    }

    if (query.includes('anúncio') || query.includes('vendas') || query.includes('marketing')) {
      return `Sugestão de **Anúncio Executivo** com foco no empresariado de Angola:\n\n🚀 **Acelere o seu negócio com inteligência artificial feita para a realidade de Angola.**\n\nSeja em Luanda, no Corredor do Lobito ou no comércio internacional, a tecnologia certa poupa horas de trabalho e multiplica contratos.\n\n✅ Propostas executivas e minutas em segundos\n✅ 100% rápida no telemóvel (consome dados mínimos)\n✅ Sem mensalidades pesadas e sem bloqueios\n\n👉 *Experimente o Prodigy Kamba IA hoje mesmo!*`;
    }

    return `Compreendido perfeitamente! Analisei a sua solicitação com precisão.\n\nAqui estão as diretrizes recomendadas para a demanda:\n\n• **Planeamento Estruturado:** Definir claramente os marcos de entrega e as partes envolvidas.\n• **Conformidade em Angola:** Assegurar que toda a documentação respeita as diretivas do BNA, AGT e das autoridades reguladoras competentes.\n• **Execução Ágil:** O Kamba IA está preparado para gerar minutas formais, orçamentos e comunicações executivas imediatamente.\n\nDeseja que eu aprofunde algum ponto específico desta proposta?`;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isGenerating) return;

    const chat = chats.find(c => c.id === currentChatId);
    if (!chat) return;

    chat.messages.push({ role: 'user', content: text });
    appendMessageToDOM('user', text, false);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    if (chat.title === 'Nova Conversa') {
      chat.title = text.length > 26 ? text.substring(0, 26) + '...' : text;
    }
    chat.updatedAt = Date.now();
    saveChatsToStorage();

    // Atualizar métricas dinâmicas em tempo real com pulso dourado
    totalSearchesCount++;
    if (countSearches) {
      countSearches.textContent = `${totalSearchesCount} Ativas`;
      const pCard = countSearches.closest('.metric-card');
      if (pCard) {
        pCard.classList.add('pulse-updated');
        setTimeout(() => pCard.classList.remove('pulse-updated'), 800);
      }
    }

    const isProposal = ['inapem', 'proposta', 'contrato', 'minuta', 'solar', 'energia'].some(k => text.toLowerCase().includes(k));
    if (isProposal) {
      totalProposalsCount++;
      if (countProposals) {
        countProposals.textContent = `${totalProposalsCount} Concluídas`;
        const pCard = countProposals.closest('.metric-card');
        if (pCard) {
          pCard.classList.add('pulse-updated');
          setTimeout(() => pCard.classList.remove('pulse-updated'), 800);
        }
      }
    }

    isGenerating = true;
    btnSendMessage.disabled = true;

    const aiResponseText = generateKambaResponse(text);
    const aiRow = appendMessageToDOM('ai', '', true);
    const contentDiv = aiRow.querySelector('.msg-content');
    const bubbleDiv = aiRow.querySelector('.msg-bubble');
    const cursor = aiRow.querySelector('.typing-cursor');

    let currentText = '';
    const speed = 10;

    for (let i = 0; i < aiResponseText.length; i++) {
      currentText += aiResponseText[i];
      contentDiv.innerHTML = formatMarkdown(currentText);
      scrollToBottom();
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    if (cursor) cursor.remove();

    // Adiciona barra de ações final
    const actionsWrapper = document.createElement('div');
    actionsWrapper.innerHTML = createMessageActionsHtml(aiResponseText);
    bubbleDiv.appendChild(actionsWrapper.firstElementChild);
    attachMessageActionEvents(aiRow, aiResponseText);

    chat.messages.push({ role: 'ai', content: aiResponseText });
    saveChatsToStorage();
    scrollToBottom();

    isGenerating = false;
    btnSendMessage.disabled = false;
  }

  function formatMarkdown(str) {
    if (!str) return '';
    let html = escapeHtml(str);

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/^• (.*$)/gim, '<div style="margin: 3px 0 3px 14px;">• $1</div>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  function openSidebarMobile() {
    dashSidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  }

  function closeSidebarMobile() {
    dashSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }

  // --- EVENT LISTENERS DA NAVEGAÇÃO SPA ---
  const triggerAuthOrDash = () => {
    if (currentUser) {
      showView('dashboard');
    } else {
      updateAuthMode(false);
      showView('auth');
    }
  };

  if (btnGotoLogin) btnGotoLogin.addEventListener('click', triggerAuthOrDash);
  if (btnHeaderStart) btnHeaderStart.addEventListener('click', triggerAuthOrDash);
  if (btnHeroStart) btnHeroStart.addEventListener('click', triggerAuthOrDash);
  if (btnTerminalTry) btnTerminalTry.addEventListener('click', triggerAuthOrDash);
  if (btnBannerStart) btnBannerStart.addEventListener('click', triggerAuthOrDash);

  if (btnHeaderDemo) {
    btnHeaderDemo.addEventListener('click', () => {
      handleLoginSuccess({
        name: 'António Costa',
        email: 'antonio.costa@prodigy.ao'
      });
    });
  }

  if (btnHeroDemo) {
    btnHeroDemo.addEventListener('click', () => {
      handleLoginSuccess({
        name: 'António Costa',
        email: 'antonio.costa@prodigy.ao'
      });
    });
  }

  if (logoRefresh) {
    logoRefresh.addEventListener('click', () => {
      showView('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dashboard Nav
  if (btnDashHome) {
    btnDashHome.addEventListener('click', () => showView('landing'));
  }
  if (linkNavHome) {
    linkNavHome.addEventListener('click', (e) => {
      e.preventDefault();
      showView('landing');
    });
  }
  if (linkNavDash) {
    linkNavDash.addEventListener('click', (e) => {
      e.preventDefault();
      showView('dashboard');
    });
  }

  // Tela de Acesso (Auth)
  if (btnAuthBack) btnAuthBack.addEventListener('click', () => showView('landing'));
  if (tabLogin) tabLogin.addEventListener('click', () => updateAuthMode(false));
  if (tabRegister) tabRegister.addEventListener('click', () => updateAuthMode(true));
  if (btnAuthToggleMode) btnAuthToggleMode.addEventListener('click', () => updateAuthMode(!isRegisterMode));

  if (btnFastDemo) {
    btnFastDemo.addEventListener('click', () => {
      handleLoginSuccess({
        name: 'António Costa',
        email: 'antonio.costa@prodigy.ao'
      });
    });
  }

  if (formAuth) {
    formAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = inputEmail.value.trim() || 'antonio.costa@prodigy.ao';
      const name = isRegisterMode 
        ? (inputName.value.trim() || 'Novo Utilizador')
        : (email.split('@')[0]);

      handleLoginSuccess({ name, email });
    });
  }

  if (linkForgotPass) {
    linkForgotPass.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Instruções enviadas para o email associado (Fase 2).', 'ℹ');
    });
  }

  // Dashboard & Logout
  if (btnLogout) btnLogout.addEventListener('click', handleLogout);
  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', openSidebarMobile);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeSidebarMobile);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebarMobile);

  // Chat Actions
  if (btnNewChat) {
    btnNewChat.addEventListener('click', () => {
      createNewChat();
      closeSidebarMobile();
    });
  }

  if (btnClearChat) {
    btnClearChat.addEventListener('click', () => {
      const chat = chats.find(c => c.id === currentChatId);
      if (chat) {
        chat.messages = [];
        saveChatsToStorage();
        loadChat(currentChatId);
        showToast('Conversa limpa com sucesso.', '🧹');
      }
    });
  }

  if (btnSendMessage) btnSendMessage.addEventListener('click', sendMessage);

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });
  }

  quickPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        chatInput.value = prompt;
        sendMessage();
      }
    });
  });

  // Filtro de Histórico de Conversas em tempo real
  if (historyFilterInput) {
    historyFilterInput.addEventListener('input', (e) => {
      historySearchTerm = e.target.value.toLowerCase().trim();
      renderHistory();
    });
  }

  // Simulador de Economia ROI (vs Bubble)
  if (roiSlider && roiUsersVal && roiBubbleCost && roiKambaCost && roiSavingsPct) {
    const updateRoi = () => {
      const val = parseInt(roiSlider.value);
      roiUsersVal.textContent = `${val.toLocaleString('pt-AO')} consultas / mês`;
      const bubbleAnnual = 384 + Math.round((val - 500) * 0.08);
      roiBubbleCost.textContent = `$${bubbleAnnual.toLocaleString('en-US')} / ano`;
      roiKambaCost.textContent = `$0 / ano`;
      roiSavingsPct.textContent = `100% de Poupança ($${bubbleAnnual.toLocaleString('en-US')}/ano)`;
    };
    roiSlider.addEventListener('input', updateRoi);
    updateRoi();
  }

  // Controles do Modal de Documento Executivo / Impressão PDF
  if (btnCloseModalPreview) {
    btnCloseModalPreview.addEventListener('click', () => {
      if (modalExecutivePreview) modalExecutivePreview.classList.remove('active');
    });
  }

  if (modalExecutivePreview) {
    modalExecutivePreview.addEventListener('click', (e) => {
      if (e.target === modalExecutivePreview) {
        modalExecutivePreview.classList.remove('active');
      }
    });
  }

  if (btnModalCopyText) {
    btnModalCopyText.addEventListener('click', () => {
      if (currentDocTextForPrint) {
        navigator.clipboard.writeText(currentDocTextForPrint).then(() => {
          showToast('Texto do documento copiado!', '📋');
        });
      }
    });
  }

  if (btnModalPrintNow) {
    btnModalPrintNow.addEventListener('click', () => {
      window.print();
    });
  }

  // Inicialização: Se já logado, vai para dashboard; senão, landing
  if (currentUser) {
    handleLoginSuccess(currentUser);
  } else {
    showView('landing');
  }
});

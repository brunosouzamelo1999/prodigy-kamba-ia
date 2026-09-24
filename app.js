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
  const groupPasswordConfirm = document.getElementById('group-password-confirm');
  const inputPasswordConfirm = document.getElementById('auth-password-confirm');
  const btnToggleAuthPass = document.getElementById('btn-toggle-auth-pass');
  const btnAuthSubmit = document.getElementById('btn-auth-submit');
  const authBtnText = document.getElementById('auth-btn-text');
  const btnAuthToggleMode = document.getElementById('btn-auth-toggle-mode');
  const authToggleText = document.getElementById('auth-toggle-text');
  const btnFastDemo = document.getElementById('btn-fast-demo');
  const btnGoogleAuth = document.getElementById('btn-google-auth');
  const authAlertBox = document.getElementById('auth-alert-box');

  // Painel de Verificação de E-mail Real (Google Firebase)
  const authVerificationCard = document.getElementById('auth-verification-card');
  const verificationTargetEmail = document.getElementById('verification-target-email');
  const btnCheckVerification = document.getElementById('btn-check-verification');
  const btnResendVerification = document.getElementById('btn-resend-verification');
  const btnCancelVerification = document.getElementById('btn-cancel-verification');

  // Modal e Status de Segurança do Google Firebase
  const btnOpenFirebaseModal = document.getElementById('btn-open-firebase-modal');
  const modalFirebaseSettings = document.getElementById('modal-firebase-settings');
  const btnCloseFirebaseModal = document.getElementById('btn-close-firebase-modal');
  const firebaseApiKeyInput = document.getElementById('firebase-api-key');
  const firebaseAuthDomainInput = document.getElementById('firebase-auth-domain');
  const firebaseProjectIdInput = document.getElementById('firebase-project-id');
  const btnSaveFirebaseConfig = document.getElementById('btn-save-firebase-config');
  const btnClearFirebaseConfig = document.getElementById('btn-clear-firebase-config');
  const firebaseStatusLabel = document.getElementById('firebase-status-label');

  // Modal Google Auth
  const modalGoogleAuth = document.getElementById('modal-google-auth');
  const btnCloseGoogleModal = document.getElementById('btn-close-google-modal');
  const btnConfirmGoogleAuth = document.getElementById('btn-confirm-google-auth');
  const googleInputName = document.getElementById('google-input-name');
  const googleInputEmail = document.getElementById('google-input-email');

  // Modal Imagem Preview
  const modalImagePreview = document.getElementById('modal-image-preview');
  const btnCloseImageModal = document.getElementById('btn-close-image-modal');
  const modalPreviewImg = document.getElementById('modal-preview-img');
  const modalPreviewPrompt = document.getElementById('modal-preview-prompt');
  const btnModalDownloadImage = document.getElementById('btn-modal-download-image');

  // Ações Rápidas no Hero do Chat
  const btnWelcomeImage = document.getElementById('btn-welcome-image');
  const btnWelcomePdf = document.getElementById('btn-welcome-pdf');
  const btnWelcomeWeb = document.getElementById('btn-welcome-web');

  // --- ELEMENTOS DO CHAT IA (KAMBA CHAT IA) ---
  const gptLayout = document.getElementById('gpt-layout');
  const gptSidebar = document.getElementById('gpt-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const btnNewChat = document.getElementById('btn-new-chat');
  const btnDashHome = document.getElementById('btn-dash-home');
  const btnUserProfile = document.getElementById('btn-user-profile');
  const btnSidebarLogout = document.getElementById('btn-sidebar-logout');
  const displayUserAvatar = document.getElementById('display-user-avatar');
  const displayUserName = document.getElementById('display-user-name');
  const displayUserEmail = document.getElementById('display-user-email');

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

  // --- CONSTANTES DO SISTEMA MULTIUSUÁRIO ---
  const USERS_DB_KEY = 'kamba_registered_users_db';
  const ACTIVE_SESSION_KEY = 'kamba_active_session_user';

  // --- ESTADO DA APLICAÇÃO ---
  let isRegisterMode = false;
  let currentUser = null;
  let currentChatId = null;
  let isGenerating = false;
  let currentAbortController = null;
  let activeSpeakingButton = null;
  let isVoiceRecording = false;
  let chats = [];

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

  // --- CONTROLE DE COTA DIÁRIA DE SEGURANÇA (RATE LIMITING) ---
  const DAILY_QUOTA_LIMIT = 30;

  function getTodayDateString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getQuotaStorageKey() {
    const uid = (currentUser && currentUser.uid) || (currentUser && currentUser.email) || 'guest';
    const safeKey = uid.replace(/[^a-zA-Z0-9]/g, '_');
    return `kamba_daily_quota_${safeKey}`;
  }

  function getDailyQuota() {
    const key = getQuotaStorageKey();
    const today = getTodayDateString();
    const raw = localStorage.getItem(key);
    let data = { date: today, count: 0 };
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.date === today && typeof parsed.count === 'number') {
          data = parsed;
        }
      } catch(e) {}
    }
    return { date: today, count: data.count, limit: DAILY_QUOTA_LIMIT };
  }

  function setDailyQuota(count) {
    const key = getQuotaStorageKey();
    const today = getTodayDateString();
    localStorage.setItem(key, JSON.stringify({ date: today, count }));
    updateQuotaUI();

    if (firestoreDbInstance && currentUser && currentUser.uid) {
      firestoreDbInstance
        .collection('users')
        .doc(currentUser.uid)
        .set({ dailyUsage: { date: today, count } }, { merge: true })
        .catch(err => console.warn('[Firestore] Erro ao sincronizar cota:', err.message));
    }
  }

  function incrementDailyQuota() {
    const current = getDailyQuota();
    setDailyQuota(current.count + 1);
  }

  function updateQuotaUI() {
    const quota = getDailyQuota();
    const countDisplay = document.getElementById('quota-display-count');
    const fill = document.getElementById('quota-progress-fill');
    if (countDisplay) {
      countDisplay.textContent = `${quota.count} / ${quota.limit}`;
      if (quota.count >= quota.limit) {
        countDisplay.style.color = '#EF4444';
      } else {
        countDisplay.style.color = 'var(--angola-yellow)';
      }
    }
    if (fill) {
      const pct = Math.min(100, Math.round((quota.count / quota.limit) * 100));
      fill.style.width = `${pct}%`;
      if (pct >= 100) {
        fill.style.background = '#EF4444';
      } else if (pct >= 80) {
        fill.style.background = '#F59E0B';
      } else {
        fill.style.background = 'linear-gradient(90deg, var(--angola-yellow), #F59E0B)';
      }
    }
  }

  function loadDailyQuotaFromFirestore(uid) {
    if (!firestoreDbInstance || !uid) return;
    const today = getTodayDateString();
    firestoreDbInstance
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data && data.dailyUsage && data.dailyUsage.date === today) {
            setDailyQuota(data.dailyUsage.count);
          }
        }
      })
      .catch(err => console.warn('[Firestore] Erro ao carregar cota:', err.message));
  }

  // --- GERENCIAMENTO DE ASSINATURAS & PLANOS PRO (FASE 5) ---
  function getSubscriptionStorageKey() {
    const uid = (currentUser && currentUser.uid) || (currentUser && currentUser.email) || 'guest';
    const safeKey = uid.replace(/[^a-zA-Z0-9]/g, '_');
    return `kamba_subscription_${safeKey}`;
  }

  function getUserSubscription() {
    const key = getSubscriptionStorageKey();
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const sub = JSON.parse(raw);
        if (sub && sub.active) {
          if (sub.expiresAt && Date.now() > sub.expiresAt) {
            sub.active = false;
            localStorage.setItem(key, JSON.stringify(sub));
            updateSubscriptionUI();
            return { plan: 'free', active: false };
          }
          return sub;
        }
      } catch (e) {}
    }
    return { plan: 'free', active: false };
  }

  function setUserSubscription(subData) {
    const key = getSubscriptionStorageKey();
    localStorage.setItem(key, JSON.stringify(subData));
    updateSubscriptionUI();

    if (firestoreDbInstance && currentUser && currentUser.uid) {
      firestoreDbInstance
        .collection('users')
        .doc(currentUser.uid)
        .set({ subscription: subData }, { merge: true })
        .catch(err => console.warn('[Firestore] Erro ao sincronizar assinatura:', err.message));
    }
  }

  function updateSubscriptionUI() {
    const sub = getUserSubscription();
    const quotaWrap = document.getElementById('gpt-quota-wrap');
    const proBadge = document.getElementById('gpt-pro-badge');
    const proBadgeText = document.getElementById('pro-badge-text');
    const btnUpgrade = document.getElementById('btn-open-pricing-modal');

    const planLabel = sub.active
      ? (sub.plan === 'daily_pass' ? 'Passe 24h' : 'Pro')
      : 'Gratuito';

    const planLabelEl = document.getElementById('display-user-plan-label');
    if (planLabelEl) planLabelEl.textContent = planLabel;

    const popoverPlan = document.getElementById('popover-user-plan');
    if (popoverPlan) popoverPlan.textContent = planLabel;

    const settingsPlanDesc = document.getElementById('settings-current-plan-desc');
    if (settingsPlanDesc) {
      settingsPlanDesc.textContent = sub.active
        ? (sub.plan === 'daily_pass' ? 'Passe 24 Horas (Ilimitado)' : 'Meu Kota Pro Mensal (Ilimitado)')
        : 'Plano Gratuito (30 perguntas/dia)';
    }

    const reviewBadge = document.getElementById('review-status-badge');
    if (reviewBadge) {
      reviewBadge.textContent = sub.active ? 'Ativo' : 'Atualização necessária';
      if (sub.active) {
        reviewBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        reviewBadge.style.color = '#10B981';
      } else {
        reviewBadge.style.background = 'rgba(249, 115, 22, 0.16)';
        reviewBadge.style.color = '#FB923C';
      }
    }

    const reviewDueVal = document.getElementById('review-modal-due-val');
    if (reviewDueVal) {
      reviewDueVal.textContent = sub.plan === 'daily_pass' ? '1.500 Kz' : '9.900 Kz';
    }

    if (sub.active) {
      if (quotaWrap) quotaWrap.style.display = 'none';
      if (proBadge) {
        proBadge.style.display = 'flex';
        if (proBadgeText) {
          proBadgeText.textContent = sub.plan === 'daily_pass' ? 'Passe 24h Ativo (Ilimitado)' : 'Meu Kota Pro Ativo (Ilimitado)';
        }
      }
      if (btnUpgrade) {
        const spanText = btnUpgrade.querySelector('.upgrade-pro-left span');
        if (spanText) spanText.textContent = 'Gerenciar Assinatura';
      }
    } else {
      if (quotaWrap) quotaWrap.style.display = 'block';
      if (proBadge) proBadge.style.display = 'none';
      if (btnUpgrade) {
        const spanText = btnUpgrade.querySelector('.upgrade-pro-left span');
        if (spanText) spanText.textContent = 'Seja Meu Kota Pro';
      }
      updateQuotaUI();
    }
  }

  let unsubscribeUserSubscription = null;

  function listenSubscriptionFromFirestore(uid) {
    if (!firestoreDbInstance || !uid) return;
    if (unsubscribeUserSubscription) {
      unsubscribeUserSubscription();
      unsubscribeUserSubscription = null;
    }
    try {
      unsubscribeUserSubscription = firestoreDbInstance
        .collection('users')
        .doc(uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data && data.subscription) {
              const current = getUserSubscription();
              // Se foi ativado automaticamente pelo webhook de pagamento na nuvem
              if (!current.active && data.subscription.active) {
                showToast('🎉 Pagamento aprovado automaticamente! Seu plano Pro está ativo.');
                const modal = document.getElementById('modal-pricing-checkout');
                if (modal && modal.classList.contains('active')) {
                  const plansGrid = modal.querySelector('.checkout-plans-grid');
                  const paymentSection = modal.querySelector('.checkout-payment-section');
                  const successView = document.getElementById('checkout-success-view');
                  if (plansGrid) plansGrid.style.display = 'none';
                  if (paymentSection) paymentSection.style.display = 'none';
                  if (successView) successView.style.display = 'block';
                }
              }
              setUserSubscription(data.subscription);
            }
          }
        }, (err) => console.warn('[Firestore] Listener de Assinatura:', err.message));
    } catch (e) {
      console.warn('[Firestore] Erro ao registrar listener de assinatura:', e);
    }
  }

  function loadSubscriptionFromFirestore(uid) {
    listenSubscriptionFromFirestore(uid);
  }

  // Funções de Isolamento e Sincronização de Conversas
  function getStorageKeyForUserChats(email) {
    const safeEmail = (email || 'default').toLowerCase().replace(/[^a-z0-9]/g, '_');
    return `kamba_user_chats_${safeEmail}`;
  }

  function loadUserChats(email) {
    const storageKey = getStorageKeyForUserChats(email);
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const loaded = JSON.parse(raw);
        if (Array.isArray(loaded) && loaded.length > 0) {
          chats = loaded;
          renderHistory();
          return;
        }
      } catch (e) {}
    }

    // Inicializar conversas padrão para este usuário se for primeira vez
    chats = JSON.parse(JSON.stringify(defaultChats));
    saveChatsToStorage();
    renderHistory();
  }

  // Sincronização em tempo real na nuvem (Google Cloud Firestore)
  function loadUserChatsWithFirestore(user) {
    if (!user || !user.email) return;

    // 1. Carrega imediatamente do localStorage para resposta instantânea (0ms)
    loadUserChats(user.email);

    // 2. Se o Firestore estiver ativo e o usuário tiver UID do Firebase, conecta o listener em tempo real
    if (firestoreDbInstance && user.uid) {
      if (firestoreChatsUnsubscribe) {
        firestoreChatsUnsubscribe();
        firestoreChatsUnsubscribe = null;
      }

      const chatsRef = firestoreDbInstance
        .collection('users')
        .doc(user.uid)
        .collection('chats')
        .orderBy('updatedAt', 'desc');

      firestoreChatsUnsubscribe = chatsRef.onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const remoteChats = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            remoteChats.push({
              id: doc.id,
              title: data.title || 'Conversa',
              pinned: Boolean(data.pinned),
              updatedAt: data.updatedAt || Date.now(),
              messages: Array.isArray(data.messages) ? data.messages : []
            });
          });

          chats = remoteChats;
          const storageKey = getStorageKeyForUserChats(user.email);
          localStorage.setItem(storageKey, JSON.stringify(chats));
          renderHistory();

          if (currentChatId) {
            const activeChat = chats.find(c => c.id === currentChatId);
            if (activeChat && chatMessages) {
              const currentRenderedCount = chatMessages.querySelectorAll('.gpt-msg-row').length;
              if (activeChat.messages.length !== currentRenderedCount) {
                loadChat(currentChatId);
              }
            }
          }
        } else if (chats.length > 0) {
          // Migração de conversas locais para a nuvem do usuário recém-autenticado
          chats.forEach(chat => syncSingleChatToFirestore(chat));
        }
      }, (err) => {
        console.warn('[Firestore] Listener de chats:', err.message);
      });

      // Carregar cota diária do Firestore
      loadDailyQuotaFromFirestore(user.uid);

      // Ouvir atualizações de assinatura em tempo real (pagamento automático)
      listenSubscriptionFromFirestore(user.uid);
    }
  }

  function syncSingleChatToFirestore(chat) {
    if (!firestoreDbInstance || !currentUser || !currentUser.uid || !chat || !chat.id) return;
    try {
      firestoreDbInstance
        .collection('users')
        .doc(currentUser.uid)
        .collection('chats')
        .doc(chat.id)
        .set({
          id: chat.id,
          title: chat.title || 'Nova Conversa',
          pinned: Boolean(chat.pinned),
          updatedAt: chat.updatedAt || Date.now(),
          messages: chat.messages || []
        }, { merge: true })
        .catch(err => console.warn('[Firestore] Erro ao sincronizar chat:', err.message));
    } catch(e) {}
  }

  function deleteChatFromFirestore(chatId) {
    if (!firestoreDbInstance || !currentUser || !currentUser.uid || !chatId) return;
    try {
      firestoreDbInstance
        .collection('users')
        .doc(currentUser.uid)
        .collection('chats')
        .doc(chatId)
        .delete()
        .catch(err => console.warn('[Firestore] Erro ao deletar chat:', err.message));
    } catch(e) {}
  }

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

  // --- SISTEMA OFICIAL DE AUTENTICAÇÃO GOOGLE FIREBASE & MULTIUSUÁRIO ---
  const FIREBASE_CONFIG_KEY = 'kamba_firebase_config';
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyCWbN4zMvsUGMMNVHPNA9p0sKAHI_AjKhA",
    authDomain: "bruno-teste-kamba.firebaseapp.com",
    projectId: "bruno-teste-kamba",
    storageBucket: "bruno-teste-kamba.firebasestorage.app",
    messagingSenderId: "704788185428",
    appId: "1:704788185428:web:5c98c3c3e12f39027a08c1",
    measurementId: "G-SFTZHF77J2"
  };

  let firebaseAuthInstance = null;
  let firestoreDbInstance = null;
  let firestoreChatsUnsubscribe = null;
  let isFirebaseConfigured = false;

  function getSavedFirebaseConfig() {
    const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (!raw) return DEFAULT_FIREBASE_CONFIG;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.apiKey) return parsed;
    } catch(e) {}
    return DEFAULT_FIREBASE_CONFIG;
  }

  function initFirebaseAuth() {
    const config = getSavedFirebaseConfig();
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      try {
        if (config && config.apiKey && config.projectId) {
          if (!firebase.apps || !firebase.apps.length) {
            firebase.initializeApp(config);
          }
          firebaseAuthInstance = firebase.auth();
          if (typeof firebase.firestore === 'function') {
            try {
              firestoreDbInstance = firebase.firestore();
            } catch (fsErr) {
              console.warn('[Firestore] Inicialização:', fsErr);
            }
          }
          isFirebaseConfigured = true;

          if (firebaseStatusLabel) firebaseStatusLabel.textContent = 'Google Firebase: Conectado';
          if (btnOpenFirebaseModal) btnOpenFirebaseModal.classList.add('active');

          // Observador oficial em tempo real do estado de autenticação Google
          firebaseAuthInstance.onAuthStateChanged(async (fbUser) => {
            if (fbUser) {
              const profileUser = {
                uid: fbUser.uid,
                name: fbUser.displayName || fbUser.email.split('@')[0],
                email: fbUser.email,
                photoURL: fbUser.photoURL || null,
                emailVerified: fbUser.emailVerified,
                provider: fbUser.providerData && fbUser.providerData.some(p => p.providerId === 'google.com') ? 'google' : 'firebase'
              };
              currentUser = profileUser;
              localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(profileUser));
              updateUserProfileUI();
              loadUserChatsWithFirestore(profileUser);
            }
          });
          return true;
        }
      } catch (err) {
        console.warn('Inicialização Firebase:', err);
      }
    }

    isFirebaseConfigured = false;
    if (firebaseStatusLabel) firebaseStatusLabel.textContent = 'Google Firebase: Configurar';
    if (btnOpenFirebaseModal) btnOpenFirebaseModal.classList.remove('active');
    return false;
  }

  function handleFirebaseError(err) {
    const code = err.code || '';
    let msg = err.message || 'Ocorreu um erro no servidor de autenticação.';
    if (code === 'auth/email-already-in-use') {
      msg = 'Este e-mail já está registado nos servidores Google. Inicie sessão com a sua senha.';
    } else if (code === 'auth/invalid-email') {
      msg = 'O endereço de e-mail informado não possui um formato válido.';
    } else if (code === 'auth/weak-password') {
      msg = 'A palavra-passe é fraca. Utilize pelo menos 6 caracteres.';
    } else if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      msg = 'E-mail ou palavra-passe incorretos. Verifique os dados introduzidos.';
    } else if (code === 'auth/too-many-requests') {
      msg = 'Muitas tentativas consecutivas. Por segurança, aguarde alguns minutos.';
    } else if (code === 'auth/network-request-failed') {
      msg = 'Falha de comunicação de rede com os servidores Google. Verifique sua internet.';
    } else if (code === 'auth/popup-closed-by-user') {
      msg = 'A janela de autenticação Google foi cancelada antes de concluir.';
    } else if (code === 'auth/operation-not-allowed') {
      msg = 'Este método de login precisa ser ativado na aba Sign-in method do Firebase Console.';
    } else if (code === 'auth/unauthorized-domain') {
      msg = `O domínio atual (${window.location.hostname}) não está autorizado no Firebase Console. Adicione-o em Authentication > Settings > Authorized domains.`;
    }
    setAuthAlert(msg, 'error');
  }

  function showVerificationPanel(email) {
    if (formAuth) formAuth.style.display = 'none';
    if (authVerificationCard) {
      authVerificationCard.style.display = 'flex';
      if (verificationTargetEmail) verificationTargetEmail.textContent = email;
    }
    const tabWrap = document.querySelector('.auth-tabs');
    const divider = document.querySelector('.auth-divider');
    const googleBtn = document.getElementById('btn-google-auth');
    if (tabWrap) tabWrap.style.display = 'none';
    if (divider) divider.style.display = 'none';
    if (googleBtn) googleBtn.style.display = 'none';
  }

  function hideVerificationPanel() {
    if (formAuth) formAuth.style.display = 'block';
    if (authVerificationCard) authVerificationCard.style.display = 'none';
    const tabWrap = document.querySelector('.auth-tabs');
    const divider = document.querySelector('.auth-divider');
    const googleBtn = document.getElementById('btn-google-auth');
    if (tabWrap) tabWrap.style.display = 'flex';
    if (divider) divider.style.display = 'flex';
    if (googleBtn) googleBtn.style.display = 'flex';
    setAuthAlert(null);
  }

  function getAllUsers() {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (!raw) {
      const defaultUsers = [
        {
          id: 'usr_admin',
          name: 'Bruno Souza',
          email: 'bruno@kamba.ia',
          password: 'kamba123',
          provider: 'email',
          emailVerified: true,
          createdAt: Date.now()
        }
      ];
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch(e) {
      return [];
    }
  }

  function saveAllUsers(users) {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }

  function getActiveUser() {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (raw) {
      try {
        const u = JSON.parse(raw);
        if (u && u.email) return u;
      } catch(e) {}
    }
    const all = getAllUsers();
    return all.length > 0 ? all[0] : { name: 'Bruno Souza', email: 'bruno@kamba.ia' };
  }

  function setActiveUser(user) {
    currentUser = user;
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));
    localStorage.setItem('kamba_chat_user', JSON.stringify(user));
    updateUserProfileUI();
    loadUserChatsWithFirestore(user);
  }

  function updateUserProfileUI() {
    if (!currentUser) return;
    const name = currentUser.name || 'Bruno Souza';
    const email = currentUser.email || 'brunosouzamelo10@gmail.com';
    
    // Iniciais elegantes (ex: "BS" ou "AD")
    const parts = name.trim().split(/\s+/);
    const initials = parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : (parts[0].slice(0, 2)).toUpperCase();

    const avatarImg = document.getElementById('display-user-avatar-img');
    const initialsSpan = document.getElementById('display-user-initials');

    if (currentUser.photoURL && avatarImg) {
      avatarImg.src = currentUser.photoURL;
      avatarImg.style.display = 'block';
      if (initialsSpan) initialsSpan.style.display = 'none';
    } else {
      if (avatarImg) avatarImg.style.display = 'none';
      if (initialsSpan) {
        initialsSpan.textContent = initials;
        initialsSpan.style.display = 'inline';
      }
    }

    const displayUserName = document.getElementById('display-user-name');
    if (displayUserName) displayUserName.textContent = name;

    const sub = getUserSubscription();
    const planLabel = sub.active
      ? (sub.plan === 'daily_pass' ? 'Passe 24h' : 'Pro')
      : 'Gratuito';

    const planLabelEl = document.getElementById('display-user-plan-label');
    if (planLabelEl) planLabelEl.textContent = planLabel;

    // Popover Elements (Screenshot 1)
    const popoverName = document.getElementById('popover-user-name');
    const popoverPlan = document.getElementById('popover-user-plan');
    const popoverInitials = document.getElementById('popover-user-initials');
    if (popoverName) popoverName.textContent = name;
    if (popoverPlan) popoverPlan.textContent = planLabel;
    if (popoverInitials) popoverInitials.textContent = initials;

    // Flyout de Contas
    const flyoutEmail = document.getElementById('flyout-user-email');
    const flyoutName = document.getElementById('flyout-user-name');
    const flyoutAvatar = document.getElementById('flyout-user-avatar');
    if (flyoutEmail) flyoutEmail.textContent = email;
    if (flyoutName) flyoutName.textContent = name;
    if (flyoutAvatar) flyoutAvatar.textContent = initials;

    // Modais
    const modalProfName = document.getElementById('modal-profile-name');
    const modalProfEmail = document.getElementById('modal-profile-email');
    const modalProfAvatar = document.getElementById('modal-profile-avatar');
    const modalProfBadge = document.getElementById('modal-profile-badge');
    const settingsEmail = document.getElementById('settings-user-email');

    if (modalProfName) modalProfName.textContent = name;
    if (modalProfEmail) modalProfEmail.textContent = email;
    if (modalProfAvatar) modalProfAvatar.textContent = initials;
    if (modalProfBadge) modalProfBadge.textContent = sub.active ? 'Meu Kota Pro Ativo' : 'Plano Gratuito';
    if (settingsEmail) settingsEmail.textContent = email;

    updateQuotaUI();
  }

  function setAuthAlert(msg, type = 'error') {
    if (!authAlertBox) return;
    if (!msg) {
      authAlertBox.style.display = 'none';
      authAlertBox.innerHTML = '';
      return;
    }
    authAlertBox.className = `auth-alert-box ${type}`;
    authAlertBox.style.display = 'flex';
    const icon = type === 'error'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>`;
    authAlertBox.innerHTML = `${icon}<span>${escapeHtml(msg)}</span>`;
  }

  function updateAuthMode(register) {
    isRegisterMode = register;
    setAuthAlert(null);
    hideVerificationPanel();
    if (register) {
      if (tabRegister) tabRegister.classList.add('active');
      if (tabLogin) tabLogin.classList.remove('active');
      if (groupName) groupName.style.display = 'block';
      if (groupPasswordConfirm) groupPasswordConfirm.style.display = 'block';
      if (authBtnText) authBtnText.textContent = 'Criar Conta e Validar';
      if (authToggleText) authToggleText.textContent = 'Já tem conta? Entrar';
    } else {
      if (tabLogin) tabLogin.classList.add('active');
      if (tabRegister) tabRegister.classList.remove('active');
      if (groupName) groupName.style.display = 'none';
      if (groupPasswordConfirm) groupPasswordConfirm.style.display = 'none';
      if (authBtnText) authBtnText.textContent = 'Entrar';
      if (authToggleText) authToggleText.textContent = 'Não tem conta? Criar Nova Conta';
    }
  }

  async function registerNewUser(name, email, password, confirmPassword) {
    setAuthAlert(null);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();
    const cleanPass = (password || '').trim();
    const cleanConfirm = (confirmPassword || '').trim();

    if (!cleanName) {
      setAuthAlert('Por favor, informe o seu nome completo.');
      return false;
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setAuthAlert('Por favor, insira um endereço de e-mail válido.');
      return false;
    }
    if (cleanPass.length < 6) {
      setAuthAlert('A palavra-passe deve conter pelo menos 6 caracteres.');
      return false;
    }
    if (cleanPass !== cleanConfirm) {
      setAuthAlert('As palavras-passe não coincidem. Confirme novamente.');
      return false;
    }

    // 1. Caso o Firebase esteja ativo, envia verificação oficial para a caixa de entrada real
    if (isFirebaseConfigured && firebaseAuthInstance) {
      setAuthAlert('A comunicar com os servidores do Google...', 'info');
      try {
        const userCred = await firebaseAuthInstance.createUserWithEmailAndPassword(cleanEmail, cleanPass);
        if (cleanName && userCred.user.updateProfile) {
          await userCred.user.updateProfile({ displayName: cleanName });
        }
        await userCred.user.sendEmailVerification();
        showVerificationPanel(cleanEmail);
        showToast('E-mail oficial de confirmação enviado pelo Google!');
        return true;
      } catch (err) {
        handleFirebaseError(err);
        return false;
      }
    }

    // 2. Modo Local com Isolamento Imediato de Contas
    const users = getAllUsers();
    const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      setAuthAlert('Este e-mail já está registado. Aceda à conta com a sua senha.');
      return false;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      provider: 'email',
      emailVerified: false,
      createdAt: Date.now()
    };

    users.push(newUser);
    saveAllUsers(users);
    setActiveUser(newUser);

    // Apresenta o painel explicativo de verificação com opção imediata de confirmação
    showVerificationPanel(cleanEmail);
    showToast(`Conta criada para ${cleanEmail}!`);
    return true;
  }

  async function loginExistingUser(email, password) {
    setAuthAlert(null);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail) {
      setAuthAlert('Por favor, insira o seu e-mail.');
      return false;
    }
    if (!cleanPass) {
      setAuthAlert('Por favor, insira a sua palavra-passe.');
      return false;
    }

    // 1. Autenticação Oficial via Google Firebase
    if (isFirebaseConfigured && firebaseAuthInstance) {
      setAuthAlert('A verificar com os servidores Google...', 'info');
      try {
        const userCred = await firebaseAuthInstance.signInWithEmailAndPassword(cleanEmail, cleanPass);
        const fbUser = userCred.user;
        if (!fbUser.emailVerified) {
          showVerificationPanel(cleanEmail);
          setAuthAlert('E-mail pendente de ativação. Por favor, clique no link enviado para sua caixa de entrada.', 'warning');
          return true;
        }
        const profile = {
          uid: fbUser.uid,
          name: fbUser.displayName || cleanEmail.split('@')[0],
          email: cleanEmail,
          emailVerified: true,
          provider: 'firebase'
        };
        setActiveUser(profile);
        showView('dashboard');
        initChatDashboard();
        showToast(`Bem-vindo de volta, ${profile.name}!`);
        return true;
      } catch (err) {
        handleFirebaseError(err);
        return false;
      }
    }

    // 2. Modo Local
    const users = getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      setAuthAlert('Nenhuma conta registada com este e-mail. Crie uma nova conta.');
      return false;
    }

    if (user.password !== cleanPass) {
      setAuthAlert('Palavra-passe incorreta. Verifique os seus dados.');
      return false;
    }

    setActiveUser(user);
    setAuthAlert('Autenticado com sucesso! A carregar conversas...', 'success');
    setTimeout(() => {
      showView('dashboard');
      initChatDashboard();
      showToast(`Sessão iniciada como ${user.name}!`);
    }, 350);
    return true;
  }

  async function triggerGoogleLogin() {
    if (isFirebaseConfigured && firebaseAuthInstance) {
      setAuthAlert('A abrir janela oficial segura do Google...', 'info');
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const res = await firebaseAuthInstance.signInWithPopup(provider);
        const fbUser = res.user;
        const gUser = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email.split('@')[0],
          email: fbUser.email,
          photoURL: fbUser.photoURL || null,
          emailVerified: true,
          provider: 'google'
        };
        setActiveUser(gUser);
        showView('dashboard');
        initChatDashboard();
        showToast(`Conectado com o Google como ${gUser.name}!`);
        return;
      } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
          setAuthAlert('A janela de login com o Google foi fechada.', 'warning');
        } else {
          handleFirebaseError(err);
        }
        return;
      }
    }

    // Fallback: abrir modal de escolha de conta Google
    if (modalGoogleAuth) {
      modalGoogleAuth.style.display = 'flex';
      if (googleInputEmail) googleInputEmail.focus();
    }
  }

  function loginGoogleUser(email, name) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      showToast('Por favor, informe um e-mail do Google válido.');
      return;
    }

    const users = getAllUsers();
    let user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      const gName = (name || '').trim() || cleanEmail.split('@')[0];
      user = {
        id: 'usr_g_' + Date.now(),
        name: gName,
        email: cleanEmail,
        password: '',
        provider: 'google',
        emailVerified: true,
        createdAt: Date.now()
      };
      users.push(user);
      saveAllUsers(users);
    }

    if (modalGoogleAuth) modalGoogleAuth.style.display = 'none';
    setActiveUser(user);
    showView('dashboard');
    initChatDashboard();
    showToast(`Conectado com o Google como ${user.name}!`);
  }

  async function logoutUser() {
    if (firestoreChatsUnsubscribe) {
      firestoreChatsUnsubscribe();
      firestoreChatsUnsubscribe = null;
    }
    if (firebaseAuthInstance && firebaseAuthInstance.currentUser) {
      try {
        await firebaseAuthInstance.signOut();
      } catch(e) {}
    }
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    showView('auth');
    updateAuthMode(false);
    hideVerificationPanel();
    setAuthAlert(null);
    if (inputEmail) inputEmail.value = '';
    if (inputPassword) inputPassword.value = '';
    showToast('Sessão encerrada com segurança.');
  }

  // Eventos do Painel de Verificação de E-mail
  if (btnCheckVerification) {
    btnCheckVerification.addEventListener('click', async () => {
      if (isFirebaseConfigured && firebaseAuthInstance && firebaseAuthInstance.currentUser) {
        setAuthAlert('A verificar status de ativação com o Google...', 'info');
        await firebaseAuthInstance.currentUser.reload();
        if (firebaseAuthInstance.currentUser.emailVerified) {
          showToast('E-mail validado com sucesso pelo Google!');
          showView('dashboard');
          initChatDashboard();
        } else {
          setAuthAlert('O link de confirmação ainda não foi clicado. Verifique sua caixa de entrada no Gmail/Outlook.', 'warning');
        }
      } else {
        // No modo local, confirma o acesso
        showToast('E-mail confirmado com sucesso!');
        showView('dashboard');
        initChatDashboard();
      }
    });
  }

  if (btnResendVerification) {
    btnResendVerification.addEventListener('click', async () => {
      if (isFirebaseConfigured && firebaseAuthInstance && firebaseAuthInstance.currentUser) {
        try {
          await firebaseAuthInstance.currentUser.sendEmailVerification();
          showToast('Novo e-mail de ativação enviado com sucesso!');
        } catch(e) {
          handleFirebaseError(e);
        }
      } else {
        showToast('E-mail de confirmação reenviado para sua caixa de entrada!');
      }
    });
  }

  if (btnCancelVerification) {
    btnCancelVerification.addEventListener('click', () => {
      hideVerificationPanel();
      updateAuthMode(false);
    });
  }

  // Eventos do Modal de Configuração do Google Firebase
  if (btnOpenFirebaseModal && modalFirebaseSettings) {
    btnOpenFirebaseModal.addEventListener('click', () => {
      const cfg = getSavedFirebaseConfig() || {};
      if (firebaseApiKeyInput) firebaseApiKeyInput.value = cfg.apiKey || '';
      if (firebaseAuthDomainInput) firebaseAuthDomainInput.value = cfg.authDomain || '';
      if (firebaseProjectIdInput) firebaseProjectIdInput.value = cfg.projectId || '';
      modalFirebaseSettings.classList.add('active');
    });
  }

  if (btnCloseFirebaseModal && modalFirebaseSettings) {
    btnCloseFirebaseModal.addEventListener('click', () => {
      modalFirebaseSettings.classList.remove('active');
    });
    modalFirebaseSettings.addEventListener('click', (e) => {
      if (e.target === modalFirebaseSettings) modalFirebaseSettings.classList.remove('active');
    });
  }

  if (btnSaveFirebaseConfig) {
    btnSaveFirebaseConfig.addEventListener('click', () => {
      const apiKey = (firebaseApiKeyInput ? firebaseApiKeyInput.value : '').trim();
      const authDomain = (firebaseAuthDomainInput ? firebaseAuthDomainInput.value : '').trim();
      const projectId = (firebaseProjectIdInput ? firebaseProjectIdInput.value : '').trim();

      if (!apiKey || !projectId) {
        showToast('Por favor, preencha pelo menos a API Key e o Project ID.');
        return;
      }

      const cfg = { apiKey, authDomain, projectId };
      localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
      modalFirebaseSettings.classList.remove('active');
      initFirebaseAuth();
      showToast('Configurações do Google Firebase salvas com sucesso!');
    });
  }

  if (btnClearFirebaseConfig) {
    btnClearFirebaseConfig.addEventListener('click', () => {
      localStorage.removeItem(FIREBASE_CONFIG_KEY);
      if (firebaseApiKeyInput) firebaseApiKeyInput.value = '';
      if (firebaseAuthDomainInput) firebaseAuthDomainInput.value = '';
      if (firebaseProjectIdInput) firebaseProjectIdInput.value = '';
      modalFirebaseSettings.classList.remove('active');
      initFirebaseAuth();
      showToast('Restaurado para o modo local com histórico isolado.');
    });
  }

  // Alternador de visibilidade de senha
  if (btnToggleAuthPass && inputPassword) {
    btnToggleAuthPass.addEventListener('click', () => {
      const isPass = inputPassword.type === 'password';
      inputPassword.type = isPass ? 'text' : 'password';
      if (inputPasswordConfirm) inputPasswordConfirm.type = isPass ? 'text' : 'password';
    });
  }

  // Eventos de Abas Login / Registo
  if (tabLogin) tabLogin.addEventListener('click', () => updateAuthMode(false));
  if (tabRegister) tabRegister.addEventListener('click', () => updateAuthMode(true));
  if (btnAuthToggleMode) btnAuthToggleMode.addEventListener('click', () => updateAuthMode(!isRegisterMode));

  // Botão Oficial Google Auth
  if (btnGoogleAuth) {
    btnGoogleAuth.addEventListener('click', () => triggerGoogleLogin());
  }

  if (btnCloseGoogleModal && modalGoogleAuth) {
    btnCloseGoogleModal.addEventListener('click', () => {
      modalGoogleAuth.style.display = 'none';
    });
    modalGoogleAuth.addEventListener('click', (e) => {
      if (e.target === modalGoogleAuth) modalGoogleAuth.style.display = 'none';
    });
  }

  if (btnConfirmGoogleAuth) {
    btnConfirmGoogleAuth.addEventListener('click', () => {
      const gEmail = googleInputEmail ? googleInputEmail.value.trim() : '';
      const gName = googleInputName ? googleInputName.value.trim() : '';
      loginGoogleUser(gEmail, gName);
    });
  }

  // Acesso Direto Modo Convidado / Demonstração
  if (btnFastDemo) {
    btnFastDemo.addEventListener('click', () => {
      const demoUser = { name: 'Convidado Kamba', email: 'convidado@kamba.ia', provider: 'demo', emailVerified: true };
      setActiveUser(demoUser);
      showView('dashboard');
      initChatDashboard();
      showToast('Acesso como Convidado ativado!');
    });
  }

  // Submissão do Formulário de Autenticação
  if (formAuth) {
    formAuth.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = inputEmail ? inputEmail.value.trim() : '';
      const password = inputPassword ? inputPassword.value.trim() : '';

      if (isRegisterMode) {
        const name = inputName ? inputName.value.trim() : '';
        const confirmPass = inputPasswordConfirm ? inputPasswordConfirm.value.trim() : '';
        await registerNewUser(name, email, password, confirmPass);
      } else {
        await loginExistingUser(email, password);
      }
    });
  }

  // Botão Sair da Conta (Logout) na barra lateral
  if (btnSidebarLogout) {
    btnSidebarLogout.addEventListener('click', (e) => {
      e.stopPropagation();
      logoutUser();
    });
  }

  if (btnAuthBack) {
    btnAuthBack.addEventListener('click', () => showView('landing'));
  }

  // Botões de abertura direta do chat
  [btnHeaderStart, btnHeroStart, btnTerminalTry, btnBannerStart].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const active = getActiveUser();
        setActiveUser(active);
        showView('dashboard');
        initChatDashboard();
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

  // --- GERENCIAMENTO DE CONVERSAS COM ISOLAMENTO DE HISTÓRICO ---
  function saveChatsToStorage() {
    if (!currentUser || !currentUser.email) return;
    const storageKey = getStorageKeyForUserChats(currentUser.email);
    localStorage.setItem(storageKey, JSON.stringify(chats));

    // Sincroniza em tempo real com o Cloud Firestore se o usuário estiver autenticado
    if (currentChatId) {
      const activeChat = chats.find(c => c.id === currentChatId);
      if (activeChat) syncSingleChatToFirestore(activeChat);
    }
  }

  function createNewChat() {
    stopSpeaking();
    if (currentAbortController && isGenerating) {
      currentAbortController.abort();
    }

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
    stopSpeaking();
    if (currentAbortController && isGenerating) {
      currentAbortController.abort();
    }

    currentChatId = chatId;
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    if (chatMessages) chatMessages.innerHTML = '';

    if (chat.messages.length === 0) {
      if (welcomeCenter) welcomeCenter.style.display = 'flex';
    } else {
      if (welcomeCenter) welcomeCenter.style.display = 'none';
      chat.messages.forEach(msg => {
        const row = appendMessageToDOM(msg.role, msg.content, false, msg.file || null, msg.image || null);
        if (row) applyCodeHighlighting(row);
      });
    }

    renderHistory();
    scrollToBottom();
  }

  function deleteChat(chatId) {
    deleteChatFromFirestore(chatId);
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
    syncSingleChatToFirestore(chat);
    renderHistory();
    if (chat.pinned) {
      showToast('Conversa fixada no topo!');
    } else {
      showToast('Conversa desafixada.');
    }
  }

  // --- CONTROLE DE ESTADO DO BOTÃO DE ENVIO / PARADA ---
  function setGenerationState(generating) {
    isGenerating = generating;
    if (!btnSendMessage) return;

    if (generating) {
      btnSendMessage.disabled = false;
      btnSendMessage.classList.add('stop-mode');
      btnSendMessage.setAttribute('title', 'Parar geração');
      btnSendMessage.setAttribute('aria-label', 'Parar geração');
      btnSendMessage.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <rect x="5" y="5" width="14" height="14" rx="2" ry="2"/>
        </svg>
      `;
    } else {
      btnSendMessage.classList.remove('stop-mode');
      btnSendMessage.setAttribute('title', 'Enviar Mensagem');
      btnSendMessage.setAttribute('aria-label', 'Enviar Mensagem');
      btnSendMessage.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="19" x2="12" y2="5"/>
          <polyline points="5 12 12 5 19 12"/>
        </svg>
      `;
    }
  }

  // --- APLICAÇÃO DE SYNTAX HIGHLIGHTING & CÓPIA DE CÓDIGO ---
  function applyCodeHighlighting(container) {
    if (!container) return;

    // Destacar blocos de código com Highlight.js
    if (window.hljs) {
      container.querySelectorAll('pre code:not(.hljs-applied)').forEach(block => {
        window.hljs.highlightElement(block);
        block.classList.add('hljs-applied');
      });
    }

    // Vincular botões de cópia de código
    container.querySelectorAll('.btn-copy-code:not([data-copy-bound])').forEach(btn => {
      btn.setAttribute('data-copy-bound', 'true');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeEl = btn.closest('.code-block-wrapper')?.querySelector('pre code');
        const codeText = codeEl ? codeEl.innerText : '';
        if (codeText) {
          navigator.clipboard.writeText(codeText).then(() => {
            const originalHtml = btn.innerHTML;
            btn.classList.add('copied');
            btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Copiado!</span>`;
            setTimeout(() => {
              btn.classList.remove('copied');
              btn.innerHTML = originalHtml;
            }, 2000);
          }).catch(() => {
            showToast('Código copiado com sucesso.');
          });
        }
      });
    });
  }

  // --- SÍNTESE DE VOZ (TEXT-TO-SPEECH) ---
  function stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeSpeakingButton) {
      activeSpeakingButton.classList.remove('is-speaking');
      const span = activeSpeakingButton.querySelector('span');
      if (span) span.textContent = 'Ouvir';
      activeSpeakingButton = null;
    }
  }

  function speakMessage(text, buttonEl) {
    if (!('speechSynthesis' in window)) {
      showToast('A síntese de voz não é suportada pelo seu navegador.');
      return;
    }

    if (activeSpeakingButton === buttonEl) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    // Limpar markdown para fala natural
    const cleanText = text
      .replace(/```[\s\S]*?```/g, 'Bloco de código.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[*#_>~-]/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-PT';

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt')) || null;
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onstart = () => {
      activeSpeakingButton = buttonEl;
      buttonEl.classList.add('is-speaking');
      const span = buttonEl.querySelector('span');
      if (span) span.textContent = 'Parar';
    };

    utterance.onend = () => {
      stopSpeaking();
    };

    utterance.onerror = () => {
      stopSpeaking();
    };

    window.speechSynthesis.speak(utterance);
  }

  // --- RECONHECIMENTO DE VOZ (SPEECH-TO-TEXT / MICROFONE) ---
  function setupVoiceInput() {
    const btnVoice = document.getElementById('btn-voice-input') || document.querySelector('.gpt-btn-mic');
    if (!btnVoice) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      btnVoice.addEventListener('click', () => {
        showToast('O reconhecimento de voz não é suportado pelo seu navegador.');
      });
      return;
    }

    let recognition = null;
    try {
      recognition = new SpeechRecognition();
      recognition.lang = 'pt-AO';
      recognition.interimResults = true;
      recognition.continuous = false;
    } catch(e) {
      return;
    }

    let baseText = '';

    recognition.onstart = () => {
      isVoiceRecording = true;
      btnVoice.classList.add('recording');
      btnVoice.setAttribute('title', 'A escutar... Clique para parar');
      baseText = chatInput ? chatInput.value : '';
      showToast('A escutar... Fale agora.');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (chatInput) {
        const separator = baseText && !baseText.endsWith(' ') ? ' ' : '';
        chatInput.value = baseText + separator + (finalTranscript || interimTranscript);
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 160) + 'px';
      }
    };

    recognition.onerror = (event) => {
      console.warn('Aviso de reconhecimento de voz:', event.error);
      if (event.error === 'not-allowed') {
        showToast('Permissão de microfone não autorizada no navegador.');
      } else if (event.error !== 'no-speech') {
        showToast(`Aviso de voz: ${event.error}`);
      }
      isVoiceRecording = false;
      btnVoice.classList.remove('recording');
      btnVoice.setAttribute('title', 'Entrada por voz');
    };

    recognition.onend = () => {
      isVoiceRecording = false;
      btnVoice.classList.remove('recording');
      btnVoice.setAttribute('title', 'Entrada por voz');
    };

    btnVoice.addEventListener('click', () => {
      if (isVoiceRecording) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (e) {
          recognition.stop();
          setTimeout(() => recognition.start(), 200);
        }
      }
    });
  }

  // --- REGENERAR ÚLTIMA RESPOSTA DA IA ---
  async function regenerateLastResponse(aiRowElement) {
    if (isGenerating) return;
    const chat = chats.find(c => c.id === currentChatId);
    if (!chat || chat.messages.length === 0) return;

    let lastUserIndex = -1;
    for (let i = chat.messages.length - 1; i >= 0; i--) {
      if (chat.messages[i].role === 'user') {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex === -1) {
      showToast('Nenhuma pergunta anterior para regenerar.');
      return;
    }

    const userMsg = chat.messages[lastUserIndex];
    
    // Truncar mensagens a partir da pergunta do usuário (remove a resposta da IA atual)
    chat.messages = chat.messages.slice(0, lastUserIndex + 1);
    saveChatsToStorage();

    // Recarregar histórico até a pergunta do usuário
    loadChat(currentChatId);

    // Disparar nova geração
    await executeAIGeneration(userMsg.content, userMsg.file || null);
  }

  // --- RENDERIZAÇÃO DE MENSAGENS E STREAMING ---
  function appendMessageToDOM(role, text, isStreaming = false, fileAttachment = null, imageResult = null) {
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
          <img src="assets/logo-meu-kota-circle.png" alt="Meu Kota" class="kota-avatar-msg-img">
        </div>
        <div class="gpt-msg-content-ai">
          <div class="msg-text-stream">${formatMarkdown(text)}</div>
          ${isStreaming ? '<span class="typing-cursor"></span>' : ''}
          ${!isStreaming ? createMessageActionsHtml(text) : ''}
        </div>
      `;

      if (imageResult) {
        const contentAiDiv = row.querySelector('.gpt-msg-content-ai');
        if (contentAiDiv) renderGeneratedImageMessage(imageResult, contentAiDiv);
      }

      if (!isStreaming) {
        attachMessageActionEvents(row, text);
        applyCodeHighlighting(row);
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
        <button class="gpt-action-small-btn btn-speak-msg" title="Ouvir resposta em voz alta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          <span>Ouvir</span>
        </button>
        <button class="gpt-action-small-btn btn-regenerate-msg" title="Regenerar resposta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>Regenerar</span>
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

    const btnSpeak = rowElement.querySelector('.btn-speak-msg');
    if (btnSpeak) {
      btnSpeak.addEventListener('click', () => {
        speakMessage(text, btnSpeak);
      });
    }

    const btnRegenerate = rowElement.querySelector('.btn-regenerate-msg');
    if (btnRegenerate) {
      btnRegenerate.addEventListener('click', () => {
        regenerateLastResponse(rowElement);
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
  // --- AVISO DE CONEXÃO QUANDO SEM CHAVE DE INTELIGÊNCIA ---
  function generateUniversalAIResponse(userQuery) {
    return `### Motor Neural Meu Kota IA Desconectado

Para que o **Meu Kota IA** responda a perguntas em tempo real (como horários, cidades, notícias, códigos e análises):

1. Clique no botão **"Meu Kota IA"** no topo direito da tela.
2. Cole a sua chave de ativação corporativa.
3. Clique em **"Salvar e Ativar Conexão"**.

*Com a ativação, o ponto verde no cabeçalho acenderá e as respostas serão processadas com o motor inteligente completo do Meu Kota IA.*`;
  }

  // --- MOTOR DE GERAÇÃO NATIVA DE IMAGENS POR IA ---
  // --- MOTOR DE GERAÇÃO NATIVA DE IMAGENS POR IA ---
  function detectImageIntent(text) {
    if (!text) return false;
    const lower = text.toLowerCase();
    const imageKeywords = [
      'crie uma imagem', 'criar uma imagem', 'criar imagem', 'cria uma imagem', 'criando uma imagem', 'crie imagem',
      'gere uma imagem', 'gerar uma imagem', 'gerar imagem', 'gera uma imagem', 'gerando uma imagem', 'gere imagem',
      'faça uma imagem', 'fazer uma imagem', 'faz uma imagem',
      'crie uma foto', 'criar uma foto', 'gere uma foto', 'gerar uma foto', 'fazer uma foto',
      'crie um desenho', 'gere um desenho', 'faça um desenho', 'fazer um desenho',
      'crie uma ilustração', 'gere uma ilustração', 'faça uma ilustração',
      'desenhe', 'desenhar',
      'ilustre', 'ilustrar',
      'create an image', 'generate an image', 'draw an image', 'make an image',
      'generate image', 'create image', 'draw a picture', 'paint a picture'
    ];
    return imageKeywords.some(kw => lower.includes(kw));
  }

  function cleanImagePrompt(userText) {
    if (!userText) return '';
    let p = userText.trim();
    // Remover prefixo de exemplo caso o usuário tenha copiado (ex: 'Exemplo 1 (Fotorrealismo): ')
    p = p.replace(/^[^:]*:\s*/i, '');
    // Remover aspas externas se houver
    p = p.replace(/^["'“”«»]\s*/, '').replace(/\s*["'“”«»]$/, '');
    // Remover verbos de comando de geração
    p = p.replace(/^(?:por favor,?\s*)?(?:você pode\s*)?(?:gere|gerar|crie|criar|desenhe|desenhar|ilustre|ilustrar|faça|fazer|monte|generate|create|draw)\s+(?:uma\s+|um\s+)?(?:imagem|foto|ilustra[çc][ãa]o|desenho|arte|quadro|banner|picture|image|photo)\s+(?:de|do|da|dos|das|of|about)?\s*/i, '');
    p = p.replace(/^(?:me dê|mostre)\s+(?:uma\s+imagem\s+de)?/i, '');
    // Remover artigos iniciais desnecessários
    p = p.replace(/^(?:uma|um)\s+/i, '');
    p = p.replace(/^["'“”«»]\s*/, '').replace(/\s*["'“”«»]$/, '');
    return p.trim() || userText.trim();
  }

  // Controlador do card de progresso com porcentagem dinâmica em tempo real
  function createImageProgressController(container, promptText) {
    const id = 'img-prog-' + Math.random().toString(36).substring(2, 9);
    const card = document.createElement('div');
    card.className = 'ai-image-progress-card';
    card.id = id;
    card.innerHTML = `
      <div class="ai-image-progress-header">
        <div class="ai-image-pulse-ring">
          <div class="ai-image-spinner-glow"></div>
          <svg class="ai-image-brush-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div class="ai-image-progress-info">
          <div class="ai-image-progress-title-row">
            <span class="ai-image-progress-title">Gerando Imagem com Inteligência Artificial</span>
            <span class="ai-image-progress-pct" id="pct-${id}">0%</span>
          </div>
          <p class="ai-image-progress-phase" id="phase-${id}">Interpretando conceito e iluminação...</p>
        </div>
      </div>
      <div class="ai-image-progress-bar-track">
        <div class="ai-image-progress-bar-fill" id="fill-${id}" style="width: 0%;"></div>
      </div>
      <div class="ai-image-prompt-preview">
        <span class="ai-image-prompt-preview-label">Prompt:</span>
        <span class="ai-image-prompt-preview-text">"${escapeHtml(promptText)}"</span>
      </div>
    `;
    container.appendChild(card);

    const pctEl = card.querySelector(`#pct-${id}`);
    const fillEl = card.querySelector(`#fill-${id}`);
    const phaseEl = card.querySelector(`#phase-${id}`);

    let currentPct = 0;
    const phases = [
      { max: 20, text: "Interpretando prompt e estilo visual..." },
      { max: 45, text: "Compondo formas, traços e iluminação..." },
      { max: 70, text: "Sintetizando detalhes e texturas neurais..." },
      { max: 92, text: "Aplicando pós-processamento de alta fidelidade..." },
      { max: 100, text: "Finalizando e renderizando arte..." }
    ];

    const timer = setInterval(() => {
      if (currentPct < 90) {
        const step = Math.max(1, Math.floor((90 - currentPct) / 6));
        currentPct = Math.min(90, currentPct + step);
        updateUI(currentPct);
      }
    }, 200);

    function updateUI(pct) {
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (fillEl) fillEl.style.width = `${pct}%`;
      const curPhase = phases.find(p => pct <= p.max) || phases[phases.length - 1];
      if (phaseEl && curPhase) phaseEl.textContent = curPhase.text;
    }

    function finish() {
      clearInterval(timer);
      updateUI(100);
      if (phaseEl) phaseEl.textContent = "Arte concluída com sucesso!";
    }

    function remove() {
      clearInterval(timer);
      if (card && card.parentNode) {
        card.remove();
      }
    }

    return { updateUI, finish, remove };
  }

  async function generateAIImage(promptText) {
    const cleanPrompt = cleanImagePrompt(promptText);
    const geminiKey = getGeminiApiKey();

    // 1. Tentar Google Imagen 3 se houver chave conectada
    if (geminiKey) {
      try {
        const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${encodeURIComponent(geminiKey.trim())}`;
        const response = await fetch(imagenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: cleanPrompt }],
            parameters: {
              sampleCount: 1,
              aspectRatio: '1:1',
              personGeneration: 'ALLOW_ADULT'
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const base64Img = data.predictions?.[0]?.bytesBase64Encoded;
          if (base64Img) {
            return {
              url: `data:image/jpeg;base64,${base64Img}`,
              prompt: cleanPrompt,
              engine: 'Google Imagen 3 (Nano Banana)'
            };
          }
        }
      } catch (err) {
        console.warn('Google Imagen 3 não respondeu, utilizando motor de alta fidelidade alternativo:', err);
      }
    }

    // 2. Motor de Alta Resolução Fallback (Flux / Pollinations AI - 100% estável)
    const seed = Math.floor(Math.random() * 1000000);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;

    // Pré-carregar a imagem para que a renderização seja instantânea após 100%
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = fallbackUrl;
    });

    return {
      url: fallbackUrl,
      prompt: cleanPrompt,
      engine: 'Motor Gráfico Neural (Nano Banana / Flux)'
    };
  }

  function renderGeneratedImageMessage(imageResult, container) {
    if (!container) return;
    const card = document.createElement('div');
    card.className = 'ai-generated-image-card';
    card.innerHTML = `
      <div class="ai-image-wrap" title="Clique para ampliar em tela cheia">
        <img src="${escapeHtml(imageResult.url)}" alt="${escapeHtml(imageResult.prompt)}" loading="lazy">
      </div>
      <div class="ai-image-toolbar">
        <span class="ai-image-prompt-badge" title="${escapeHtml(imageResult.prompt)}">Prompt: "${escapeHtml(imageResult.prompt)}"</span>
        <div class="ai-image-btn-group">
          <a href="${escapeHtml(imageResult.url)}" download="kamba-ia-${Date.now()}.jpg" target="_blank" class="btn-ai-img-action" title="Baixar arquivo de imagem">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Baixar</span>
          </a>
          <button type="button" class="btn-ai-img-action btn-zoom-image" title="Ampliar em tela cheia">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <span>Zoom</span>
          </button>
        </div>
      </div>
    `;

    const imgWrap = card.querySelector('.ai-image-wrap');
    const btnZoom = card.querySelector('.btn-zoom-image');
    const openZoom = () => {
      if (modalImagePreview && modalPreviewImg && modalPreviewPrompt && btnModalDownloadImage) {
        modalPreviewImg.src = imageResult.url;
        modalPreviewPrompt.textContent = imageResult.prompt;
        btnModalDownloadImage.href = imageResult.url;
        btnModalDownloadImage.download = `kamba-ia-${Date.now()}.jpg`;
        modalImagePreview.style.display = 'flex';
      }
    };

    if (imgWrap) imgWrap.addEventListener('click', openZoom);
    if (btnZoom) btnZoom.addEventListener('click', openZoom);

    container.appendChild(card);
  }

  function setupImagePreviewEvents() {
    if (btnCloseImageModal && modalImagePreview) {
      btnCloseImageModal.addEventListener('click', () => {
        modalImagePreview.style.display = 'none';
      });
      modalImagePreview.addEventListener('click', (e) => {
        if (e.target === modalImagePreview) modalImagePreview.style.display = 'none';
      });
    }
  }

  function setupWelcomePillsEvents() {
    if (btnWelcomeImage) {
      btnWelcomeImage.addEventListener('click', () => {
        if (chatInput) {
          chatInput.value = 'Gere uma imagem de ';
          chatInput.focus();
          chatInput.setSelectionRange(chatInput.value.length, chatInput.value.length);
        }
      });
    }
    if (btnWelcomePdf) {
      btnWelcomePdf.addEventListener('click', () => {
        const fileInput = document.getElementById('chat-file-input');
        if (fileInput) fileInput.click();
      });
    }
    if (btnWelcomeWeb) {
      btnWelcomeWeb.addEventListener('click', () => {
        setWebSearchEnabled(true);
        if (chatInput) {
          chatInput.value = 'Quais são as principais notícias de tecnologia e economia de hoje?';
          chatInput.focus();
        }
      });
    }
  }

  // --- ENVIO DE MENSAGENS E STREAMING ---
  async function sendMessage() {
    if (isGenerating) {
      // Se estiver gerando e o usuário clicar no botão (modo Parar), interrompe imediatamente
      if (currentAbortController) {
        currentAbortController.abort();
      }
      return;
    }

    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Verificação de Teto Diário de Segurança com Bypass para Assinantes Pro
    const userSub = getUserSubscription();
    if (!userSub.active) {
      const quota = getDailyQuota();
      if (quota.count >= quota.limit) {
        showToast('Limite diário de 30 perguntas atingido. Desbloqueie o Kota Pro!');
        appendMessageToDOM('ai', '### ⚠️ Teto Diário Gratuito Atingido\n\nVocê atingiu o teto diário de **30 perguntas gratuitas** no Meu Kota IA.\n\nPara continuar conversando sem limites hoje com o motor mais rápido e inteligente, desbloqueie o **Passe 24 Horas** ou a **Assinatura Mensal Kota Pro** clicando no botão **Seja Meu Kota Pro** na barra lateral.');
        openPricingModal();
        return;
      }
    }

    const chat = chats.find(c => c.id === currentChatId);
    if (!chat) return;

    const attachedFileToSend = currentAttachedFile;

    // Registrar mensagem do usuário e incrementar cota diária (se não for assinante Pro)
    chat.messages.push({ 
      role: 'user', 
      content: text,
      file: attachedFileToSend ? { name: attachedFileToSend.name, type: attachedFileToSend.type, size: attachedFileToSend.size, isPdf: attachedFileToSend.isPdf } : null
    });
    if (!userSub.active) {
      incrementDailyQuota();
    }
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

    await executeAIGeneration(text, attachedFileToSend);
  }

  // --- CHAMADA AO BACKEND SEGURO DO GOOGLE FIREBASE (/api/chat) ---
  async function callSecureBackendChat(promptText, fileAttachment, historyMessages, onChunk, abortSignal) {
    const tier = getSelectedModelTier();
    const webSearch = isWebSearchEnabled();

    let fileData = null;
    if (fileAttachment && fileAttachment.base64) {
      fileData = {
        name: fileAttachment.name,
        type: fileAttachment.type,
        base64: fileAttachment.base64,
        isPdf: fileAttachment.isPdf
      };
    }

    const payload = {
      prompt: promptText,
      file: fileData,
      history: (historyMessages || []).slice(-10),
      tier,
      webSearch
    };

    let response;
    try {
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: abortSignal
      });
    } catch (netErr) {
      if (netErr.name === 'AbortError') throw netErr;
      throw new Error("Não foi possível conectar ao endpoint /api/chat. Em ambiente de teste local, você pode adicionar a sua chave no botão 'Meu Kota IA'.");
    }

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || `Erro do Servidor Firebase (${response.status})`);
    }

    // Processar streaming SSE vindo do Firebase Functions
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // manter último pedaço incompleto

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const jsonStr = trimmed.replace(/^data:\s*/, '').trim();
        if (jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const chunkText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
          if (chunkText) {
            fullText += chunkText;
            if (onChunk) onChunk(fullText);
          }
        } catch (e) {
          // Chunk textual direto
          if (jsonStr && !jsonStr.startsWith('{')) {
            fullText += jsonStr;
            if (onChunk) onChunk(fullText);
          }
        }
      }
    }

    return fullText;
  }

  async function executeAIGeneration(text, attachedFileToSend) {
    const chat = chats.find(c => c.id === currentChatId);
    if (!chat) return;

    setGenerationState(true);
    currentAbortController = new AbortController();
    const abortSignal = currentAbortController.signal;

    // Linha de resposta da IA
    const aiRow = appendMessageToDOM('ai', '', true);
    if (!aiRow) {
      setGenerationState(false);
      return;
    }

    const streamContainer = aiRow.querySelector('.msg-text-stream');
    const contentAiDiv = aiRow.querySelector('.gpt-msg-content-ai');
    const cursor = aiRow.querySelector('.typing-cursor');

    // Interceptar e executar geração de imagem por IA
    if (detectImageIntent(text)) {
      const cleanPrompt = cleanImagePrompt(text);
      if (cursor) cursor.remove();
      if (streamContainer) streamContainer.style.display = 'none';

      // Criar o card de carregamento com porcentagem em tempo real e ícone animado
      const progressCtrl = createImageProgressController(contentAiDiv, cleanPrompt);
      scrollToBottom();

      try {
        const imageResult = await generateAIImage(text);
        if (abortSignal.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }

        // Finalizar a barra para 100% e aguardar brevemente para feedback visual satisfatório
        progressCtrl.finish();
        await new Promise(r => setTimeout(r, 400));
        progressCtrl.remove();

        if (streamContainer) {
          streamContainer.style.display = 'block';
          const introText = `### Imagem Criada com Sucesso\n\n*(Processada com ${imageResult.engine})*\n\n> **Prompt interpretado:** "${escapeHtml(imageResult.prompt)}"`;
          streamContainer.innerHTML = formatMarkdown(introText);
          applyCodeHighlighting(streamContainer);
        }

        renderGeneratedImageMessage(imageResult, contentAiDiv);
        scrollToBottom();

        chat.messages.push({
          role: 'ai',
          content: `### Imagem Criada com Sucesso\n\n> **Prompt interpretado:** "${escapeHtml(imageResult.prompt)}"\n\n![${escapeHtml(imageResult.prompt)}](${imageResult.url})`,
          image: imageResult
        });
        saveChatsToStorage();
        renderHistory();

        setGenerationState(false);
        return;
      } catch (err) {
        progressCtrl.remove();
        if (streamContainer) streamContainer.style.display = 'block';
        if (err.name === 'AbortError' || abortSignal.aborted) {
          if (streamContainer) streamContainer.innerHTML = '<em>Geração de imagem cancelada.</em>';
          setGenerationState(false);
          showToast('Geração de imagem interrompida.');
          return;
        }
        console.error('Erro ao gerar imagem:', err);
        const errNotice = `**Aviso de Geração de Imagem:**\n\nNão foi possível renderizar a imagem solicitada: ${err.message}`;
        if (streamContainer) streamContainer.innerHTML = formatMarkdown(errNotice);
        if (cursor) cursor.remove();
        setGenerationState(false);
        return;
      }
    }

    let finalAiResponseText = '';
    const customKey = getCustomGeminiApiKey();

    try {
      if (customKey) {
        // Modo 1: Chave Pessoal BYOK
        if (streamContainer) {
          streamContainer.innerHTML = '<em>Consultando Meu Kota IA...</em>';
        }

        finalAiResponseText = await callGoogleGeminiStreamingAPI(
          customKey, 
          text, 
          attachedFileToSend, 
          chat.messages,
          (streamedText) => {
            if (streamContainer) {
              streamContainer.innerHTML = formatMarkdown(streamedText);
              applyCodeHighlighting(streamContainer);
            }
            scrollToBottom();
          },
          abortSignal
        );
      } else {
        // Modo 2: Backend Corporativo Seguro do Firebase (/api/chat)
        if (streamContainer) {
          streamContainer.innerHTML = '<em>Consultando Meu Kota IA...</em>';
        }

        try {
          finalAiResponseText = await callSecureBackendChat(
            text,
            attachedFileToSend,
            chat.messages,
            (streamedText) => {
              if (streamContainer) {
                streamContainer.innerHTML = formatMarkdown(streamedText);
                applyCodeHighlighting(streamContainer);
              }
              scrollToBottom();
            },
            abortSignal
          );
        } catch (backendErr) {
          if (backendErr.name === 'AbortError' || abortSignal.aborted) throw backendErr;
          
          console.warn('[Meu Kota] Backend /api/chat indisponível:', backendErr.message);
          finalAiResponseText = `### 🛡️ Servidor Seguro Meu Kota IA Configurado\n\n` +
            `O **Meu Kota IA** está configurado para operar com processamento protegido no servidor oficial (\`/api/chat\`).\n\n` +
            `• **Em Produção:** As perguntas são processadas diretamente pelas funções de nuvem sem expor nenhuma chave.\n` +
            `• **Para Testes Locais:** Como este servidor de teste local (\`localhost:8085\`) roda sem os emuladores do Firebase, você pode conectar sua chave corporativa temporariamente no botão **"Meu Kota IA"** no topo direito para testar respostas ao vivo.\n\n` +
            `*(Detalhe do endpoint: ${backendErr.message})*`;

          if (streamContainer) {
            streamContainer.innerHTML = formatMarkdown(finalAiResponseText);
            applyCodeHighlighting(streamContainer);
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError' || abortSignal.aborted) {
        showToast('Geração interrompida.');
        if (!finalAiResponseText && streamContainer) {
          finalAiResponseText = streamContainer.innerText.trim() || '*(Geração interrompida pelo usuário)*';
        }
      } else {
        console.error('Erro ao gerar resposta:', err);
        if (err.message && (err.message.includes('429') || err.message.includes('Limite de requisições'))) {
          finalAiResponseText = `**Aviso de Cota do Motor Neural:**\n\n${err.message}\n\n*Nota: O servidor renova o limite de requisições automaticamente a cada 60 segundos.*`;
        } else {
          finalAiResponseText = `**Aviso de Conexão:**\n\n${err.message || 'Erro de comunicação.'}\n\n*Verifique sua chave de acesso corporativa no botão "Meu Kota IA" no topo.*`;
        }
        if (streamContainer) {
          streamContainer.innerHTML = formatMarkdown(finalAiResponseText);
          applyCodeHighlighting(streamContainer);
        }
      }
    }

    if (cursor) cursor.remove();
    setGenerationState(false);

    if (finalAiResponseText) {
      chat.messages.push({ role: 'ai', content: finalAiResponseText });
      saveChatsToStorage();
      renderHistory();

      // Salvaguarda: se a resposta da IA de texto disser que gerou uma imagem, acionar a criação visual
      const lowerResp = finalAiResponseText.toLowerCase();
      if ((lowerResp.includes('aqui está a imagem') || lowerResp.includes('kota irá gerar uma imagem')) && !contentAiDiv.querySelector('.ai-generated-image-card')) {
        const fallbackPrompt = cleanImagePrompt(text) || cleanImagePrompt(finalAiResponseText);
        if (fallbackPrompt) {
          const progressCtrl = createImageProgressController(contentAiDiv, fallbackPrompt);
          generateAIImage(fallbackPrompt).then(imgRes => {
            progressCtrl.finish();
            setTimeout(() => {
              progressCtrl.remove();
              renderGeneratedImageMessage(imgRes, contentAiDiv);
              scrollToBottom();
            }, 400);
          }).catch(() => progressCtrl.remove());
        }
      }

      if (contentAiDiv) {
        const existingActions = contentAiDiv.querySelector('.gpt-msg-actions');
        if (existingActions) existingActions.remove();

        const actionsDiv = document.createElement('div');
        actionsDiv.innerHTML = createMessageActionsHtml(finalAiResponseText);
        contentAiDiv.appendChild(actionsDiv.firstElementChild);
        attachMessageActionEvents(aiRow, finalAiResponseText);
      }
    }
  }

  // --- MOTOR SIMULADO DE DOCUMENTOS (QUANDO SEM CHAVE ATIVA) ---
  function generateSimulatedFileResponse(file, userPrompt) {
    const isPdf = file.isPdf || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const fileName = escapeHtml(file.name);
    
    if (isPdf) {
      return `### Análise e Tradução do Documento: **${fileName}**\n\n` +
        `*(Processado com o motor inteligente Meu Kota IA)*\n\n` +
        `---\n\n` +
        `#### Síntese Executiva do Documento:\n` +
        `• **Identificação:** Documento PDF corporativo/técnico processado com sucesso.\n` +
        `• **Estrutura identificada:** Seções numeradas, cláusulas contratuais e termos operacionais.\n\n` +
        `#### Exemplo de Tradução Oficial Aplicada:\n` +
        `> *"Todas as diretrizes e prazos estipulados neste instrumento entram em vigor imediatamente a partir da data de ratificação, garantindo conformidade com os padrões regulatórios internacionais e salvaguarda plena das partes envolvidas."*\n\n` +
        `---\n\n` +
        `**Ativação em Produção:** Para processar **este arquivo real na íntegra** linha por linha com inteligência artificial ao vivo, ative sua chave no botão **Meu Kota IA** no topo da tela!`;
    } else {
      return `### Leitura e Tradução de Imagem: **${fileName}**\n\n` +
        `*(Visão Computacional e OCR Meu Kota IA)*\n\n` +
        `---\n\n` +
        `#### Texto Detectado na Imagem (OCR):\n` +
        `O sistema de visão computacional identificou com sucesso os caracteres tipográficos contidos na imagem enviada.\n\n` +
        `#### Tradução Direta para Português:\n` +
        `> *"Acesso liberado aos procedimentos operacionais e conformidade estabelecida conforme os termos vigentes."*\n\n` +
        `---\n\n` +
        `**Dica de Produção:** Conecte sua chave corporativa no botão superior para realizar a leitura, extração e análise 100% real de qualquer foto, recibo ou captura de tela!`;
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
      if (headerName) headerName.textContent = 'Meu Kota Pro';
      if (headerBadge) {
        headerBadge.textContent = 'Profundo';
        headerBadge.className = 'model-badge-mini pro';
      }
      if (optFlash) optFlash.classList.remove('active');
      if (optPro) optPro.classList.add('active');
    } else {
      if (headerName) headerName.textContent = 'Meu Kota Flash';
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
        showToast('Modelo alternado para Meu Kota Flash (Rápido e Fluido)');
      });
    }

    if (optPro) {
      optPro.addEventListener('click', () => {
        setSelectedModelTier('pro');
        if (menu) menu.style.display = 'none';
        if (btnToggle) btnToggle.classList.remove('active');
        showToast('Modelo alternado para Meu Kota Pro (Raciocínio Profundo)');
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
        if (parsed && parsed.tier === tier && !parsed.modelPath.includes('gemini-2.5-pro')) {
          cachedWorkingModel = parsed;
          return cachedWorkingModel;
        }
      } catch (e) {}
    }

    // Listar modelos autorizados pela API oficial (v1beta é a versão oficial de Gemini)
    for (const apiVersion of ['v1beta']) {
      try {
        const listUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models?key=${encodeURIComponent(apiKey.trim())}`;
        const res = await fetch(listUrl);
        if (res.ok) {
          const data = await res.json();
          const validModels = (data.models || []).filter(m => 
            m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
          );

          if (validModels.length > 0) {
            // gemini-2.5-pro foi descontinuado pelo Google para novos usuários, substituído por gemini-3.1-pro-preview e gemini-pro-latest
            const preferredNames = tier === 'pro'
              ? ['gemini-3.1-pro-preview', 'gemini-pro-latest', 'gemini-2.5-flash', 'gemini-3-flash-preview']
              : ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3-flash-preview', 'gemini-3.1-pro-preview'];

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
      modelPath: tier === 'pro' ? 'models/gemini-3.1-pro-preview' : 'models/gemini-2.5-flash',
      displayName: tier === 'pro' ? 'Gemini 3.1 Pro' : 'Gemini 2.5 Flash'
    };
    return cachedWorkingModel;
  }

  // --- CHAMADA OFICIAL EM STREAMING À API DO GOOGLE GEMINI (SSE REAL) ---
  async function callGoogleGeminiStreamingAPI(apiKey, promptText, fileAttachment, historyMessages, onChunk, abortSignal) {
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
        inlineData: {
          mimeType: fileAttachment.type || 'image/jpeg',
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

    // 1. Memória Contínua Multi-Turn (turnos anteriores)
    const rawHistory = [];
    if (historyMessages && historyMessages.length > 0) {
      const previousMessages = historyMessages.slice(0, -1);
      const recent = previousMessages.slice(-20);
      for (const m of recent) {
        if (m.content && !m.content.startsWith('**Aviso de Conexão')) {
          const contentStr = m.content;
          if (m.role === 'user' && !fileAttachment && (
            contentStr.includes('Extract all visible text in this image') || 
            contentStr.includes('texto visível contido nesta imagem') ||
            contentStr.includes('Transcreva com máxima precisão todo o texto contido nesta imagem')
          )) {
            continue;
          }
          rawHistory.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: contentStr }]
          });
        }
      }
    }

    // Sanitizar alternância estrita entre 'user' e 'model'
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
    contents.push({ role: 'user', parts: parts });

    // 2. Definir lista ordenada de endpoints conforme o modelo escolhido (Pro vs Flash)
    const tier = getSelectedModelTier();
    const discovered = await discoverWorkingGeminiModel(apiKey, tier);

    const candidateEndpoints = [];
    if (discovered && discovered.modelPath && !discovered.modelPath.includes('gemini-2.5-pro')) {
      candidateEndpoints.push(`https://generativelanguage.googleapis.com/${discovered.apiVersion}/${discovered.modelPath}`);
    }

    if (tier === 'pro') {
      candidateEndpoints.push(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview`
      );
    } else {
      candidateEndpoints.push(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview`
      );
    }

    const uniqueEndpoints = [...new Set(candidateEndpoints)];
    let lastError = null;
    const webSearchWanted = isWebSearchEnabled();
    const canUseSearch = webSearchWanted && !fileAttachment;

    const systemInstruction = {
      parts: [{
        text: `Você é o Meu Kota IA, um conselheiro executivo de inteligência artificial de padrão internacional e parceiro estratégico de pensamento ("Thought Partner"), com identidade autêntica inspirada na cultura e na sabedoria de Angola.

Na tradição angolana, o "Kota" representa o mais velho respeitado: aquele que acumulou vivência, escuta com empatia, enxerga o panorama sistêmico e orienta com sabedoria fraterna, firmeza e generosidade. Você não é um gerador de texto impessoal; você é um mentor sênior que ajuda o interlocutor a clarear suas ideias, ponderar opções e chegar à melhor conclusão possível.

A data e hora exatas no dispositivo do usuário são: ${dateStr}, às ${timeStr} (Fuso horário: ${userTz}). Utilize SEMPRE esta data como referência factual para cronologia, cálculos de prazos e eventos correntes.

METODOLOGIA DE ATUAÇÃO COMO "THOUGHT PARTNER" (PARCEIRO DE PENSAMENTO):
1. DIAGNÓSTICO E VISÃO SISTÊMICA: Compreenda a fundo o objetivo real por trás da solicitação. Identifique premissas ocultas, gargalos potenciais ou oportunidades que o usuário possa não ter considerado.
2. MAPEAMENTO DE OPÇÕES E TRADE-OFFS: Quando o problema admitir múltiplos caminhos (em engenharia de software, redação, negócios, estratégia ou estudos), nunca imponha uma resposta única ou rasa. Estruture 2 a 3 opções viáveis, explicitando com clareza os prós e contras de cada uma (usando tabelas comparativas quando couber).
3. RECOMENDAÇÃO FUNDAMENTADA DO KOTA: Como um bom conselheiro experiente, posicione-se. Indique claramente qual caminho você recomenda como o mais eficiente, seguro ou inovador, fundamentando o "porquê" com critérios técnicos e práticos.
4. CO-CONSTRUÇÃO E PRÓXIMO PASSO: Ao final de cada resposta substancial, proponha um gancho de ação concreto ou uma pergunta de refinamento inteligente para construírem juntos o próximo estágio.

PADRÕES DE FORMATO E COMUNICAÇÃO:
- EXCELÊNCIA TÉCNICA E OBJETIVIDADE: Seja denso em valor e econômico em palavras vazias. Evite preâmbulos protocolares; entregue síntese com autoridade serena.
- CÓDIGO LIMPO E FORMATADO: Sempre que fornecer códigos de programação, utilize blocos com identificador de linguagem (ex: \`\`\`javascript ou \`\`\`python).
- ANÁLISE PROFUNDA DE DOCUMENTOS: Você possui visão computacional nativa e leitura multimodal completa. Extraia todo o texto visível de imagens com fidelidade absoluta (OCR) e faça análises executivas de PDFs e relatórios.
- BLINDAGEM DE IDENTIDADE WHITE-LABEL: Você é estritamente o "Meu Kota IA". NUNCA mencione "Google", "Gemini", "Google Search", "AI Studio" ou provedores externos. Ao realizar pesquisas ao vivo na web (clima, eventos, notícias ou cotações), JAMAIS diga "pesquisei no Google" e JAMAIS inclua links, URLs externas ou listas de fontes ao final da resposta. Responda de forma natural, direta e soberana, integrando as informações com a autoridade e sabedoria de um Kota.
- IDIOMA: Responda em português formal impecável, fluido, respeitoso e acolhedor, refletindo a dignidade de um Kota.`
      }]
    };

    for (const baseModelUrl of uniqueEndpoints) {
      const searchAttempts = canUseSearch ? [true, false] : [false];

      for (const enableSearch of searchAttempts) {
        if (abortSignal && abortSignal.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }

        try {
          const streamUrl = `${baseModelUrl}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey.trim())}`;
          
          const body = {
            contents: contents,
            generationConfig: {
              temperature: tier === 'pro' ? 0.3 : 0.5,
              maxOutputTokens: 8192
            },
            systemInstruction: systemInstruction
          };

          if (enableSearch) {
            body.tools = [{ google_search: {} }];
          }

          const response = await fetch(streamUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: abortSignal
          });

          if (response.ok) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let fullText = '';
            const sources = [];
            const seenUrls = new Set();

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop();

              for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith('data: ')) {
                  const jsonStr = trimmed.slice(6).trim();
                  if (!jsonStr || jsonStr === '[DONE]') continue;

                  try {
                    const parsed = JSON.parse(jsonStr);
                    const candidate = parsed.candidates?.[0];
                    const partText = candidate?.content?.parts?.[0]?.text;
                    if (partText) {
                      fullText += partText;
                      if (onChunk) onChunk(fullText);
                    }

                    // Grounding utilizado internamente pelo modelo, sem expor fontes ao usuário
                  } catch(e) {
                    // Chunk JSON incompleto, aguardar próxima linha
                  }
                }
              }
            }

            // Atualizar cache de modelo funcional
            const modelIdentifier = baseModelUrl.split('/').slice(-1)[0];
            cachedWorkingModel = {
              tier,
              apiVersion: baseModelUrl.includes('/v1/') ? 'v1' : 'v1beta',
              modelPath: modelIdentifier.startsWith('models/') ? modelIdentifier : `models/${modelIdentifier}`,
              displayName: modelIdentifier.replace('models/', '')
            };
            localStorage.setItem('kamba_gemini_model_config', JSON.stringify(cachedWorkingModel));
            updateGeminiStatusUI();
            return fullText;
          }

          if (abortSignal && abortSignal.aborted) {
            throw new DOMException('Aborted', 'AbortError');
          }

          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `Erro HTTP ${response.status}`;
          lastError = new Error(errMsg);

          if (!response.ok && enableSearch) {
            console.warn(`Tentativa com busca ao vivo falhou (${response.status}: ${errMsg}). Tentando sem busca...`);
            continue;
          }

          if (response.status === 404) {
            console.warn(`Modelo ${baseModelUrl} não suportado para esta chave (404). Tentando próximo modelo...`);
            continue;
          }

          if (response.status === 403) {
            throw new Error(`Acesso negado pelo Google (403): Esta chave não tem o serviço Gemini (Generative Language) ativado.\n\nComo resolver: Acesse https://aistudio.google.com/app/apikey e crie uma nova chave.`);
          }

          if (response.status === 429) {
            lastError = new Error(`Limite de requisições por minuto do Google atingido temporariamente (429). Aguarde alguns segundos para a cota renovar.`);
            continue;
          }
        } catch (err) {
          if (err.name === 'AbortError' || (abortSignal && abortSignal.aborted)) {
            throw err;
          }
          lastError = err;
          if (enableSearch) {
            console.warn('Falha na tentativa com busca ao vivo. Tentando sem busca...', err);
            continue;
          }
        }
      }
    }

    throw lastError || new Error("Não foi possível conectar aos servidores do Meu Kota IA. Verifique a sua conexão no botão Meu Kota IA.");
  }

  // Alias para compatibilidade síncrona se necessário
  async function callGoogleGeminiAPI(apiKey, promptText, fileAttachment, historyMessages) {
    return callGoogleGeminiStreamingAPI(apiKey, promptText, fileAttachment, historyMessages, null, null);
  }

  // --- GERENCIAMENTO DE CHAVE DO GOOGLE AI STUDIO (BYOK) ---
  const GEMINI_STORAGE_KEY = 'kamba_gemini_api_key';

  function getCustomGeminiApiKey() {
    return (localStorage.getItem(GEMINI_STORAGE_KEY) || '').trim();
  }

  // Alias para retrocompatibilidade
  function getGeminiApiKey() {
    return getCustomGeminiApiKey();
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
    const key = getCustomGeminiApiKey();
    const dot = document.getElementById('api-status-dot');
    const label = document.getElementById('api-status-label');
    const badge = document.getElementById('api-status-badge');

    if (key) {
      if (dot) dot.classList.add('active');
      if (label) label.textContent = 'Motor Kota Ativo';
      if (badge) {
        badge.textContent = 'Status: Motor Neural Meu Kota Conectado';
        badge.className = 'api-status-badge connected';
      }
    } else {
      if (dot) dot.classList.add('active');
      if (label) label.textContent = 'Meu Kota IA';
      if (badge) {
        badge.textContent = 'Status: Servidor Oficial Meu Kota IA Operacional';
        badge.className = 'api-status-badge connected';
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
      const originalDataUrl = e.target.result;

      if (isImage) {
        // Pré-carregar para otimizar dimensões e compressão sem perder qualidade de OCR
        const img = new Image();
        img.onload = () => {
          const maxDim = 1920;
          let w = img.width;
          let h = img.height;

          // Se a imagem for razoavelmente compacta (<= 2MB e <= 1920px), usa direto
          if (w <= maxDim && h <= maxDim && file.size <= 2 * 1024 * 1024) {
            const base64Data = originalDataUrl.split(',')[1];
            currentAttachedFile = {
              name: file.name,
              size: file.size,
              type: file.type || 'image/png',
              dataUrl: originalDataUrl,
              base64: base64Data,
              isPdf: false,
              isImage: true
            };
            renderAttachmentPreview();
            return;
          }

          // Redimensionar mantendo proporção com alta nitidez
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);

          // Salvar como JPEG de altíssima qualidade (0.92) ou PNG
          const mimeType = file.type === 'image/png' && file.size < 2 * 1024 * 1024 ? 'image/png' : 'image/jpeg';
          const optimizedDataUrl = canvas.toDataURL(mimeType, 0.92);
          const base64Data = optimizedDataUrl.split(',')[1];

          currentAttachedFile = {
            name: file.name,
            size: Math.round((base64Data.length * 3) / 4),
            type: mimeType,
            dataUrl: optimizedDataUrl,
            base64: base64Data,
            isPdf: false,
            isImage: true
          };
          renderAttachmentPreview();
        };

        img.onerror = () => {
          const base64Data = originalDataUrl.split(',')[1];
          currentAttachedFile = {
            name: file.name,
            size: file.size,
            type: file.type || 'image/jpeg',
            dataUrl: originalDataUrl,
            base64: base64Data,
            isPdf: false,
            isImage: true
          };
          renderAttachmentPreview();
        };

        img.src = originalDataUrl;
      } else {
        const base64Data = originalDataUrl.split(',')[1];
        currentAttachedFile = {
          name: file.name,
          size: file.size,
          type: 'application/pdf',
          dataUrl: originalDataUrl,
          base64: base64Data,
          isPdf: true,
          isImage: false
        };
        renderAttachmentPreview();
      }
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
      showToast('Motor Meu Kota IA ativado com sucesso!');
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

  // --- FORMATAÇÃO MARKDOWN LEVE, SEGURA E COM DESTAQUE DE CÓDIGO ---
  function formatMarkdown(text) {
    if (!text) return '';
    let formatted = escapeHtml(text);

    // Extrair blocos de código em placeholders para não quebrar quebras de linha com <br>
    const codeBlocks = [];

    // 1. Blocos de código com identificador de linguagem (ex: ```javascript ... ```)
    formatted = formatted.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const id = `___KAMBA_CODE_BLOCK_${codeBlocks.length}___`;
      const cleanLang = (lang || 'code').trim().toLowerCase();
      codeBlocks.push({ lang: cleanLang, code: code.replace(/\n$/, '') });
      return id;
    });

    // 2. Blocos de código genéricos (ex: ```...```)
    formatted = formatted.replace(/```([\s\S]*?)```/g, (match, code) => {
      const id = `___KAMBA_CODE_BLOCK_${codeBlocks.length}___`;
      codeBlocks.push({ lang: 'code', code: code.replace(/\n$/, '') });
      return id;
    });

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

    // Quebras de linha de texto livre para <br>
    formatted = formatted.replace(/\n/g, '<br>');

    // Marcadores de lista •
    formatted = formatted.replace(/•\s?/g, '<span style="color:#EAB308;margin-right:6px;">●</span>');

    // Restaurar blocos de código com containers profissionais e botões de cópia
    codeBlocks.forEach((item, index) => {
      const codeHtml = `<div class="code-block-wrapper" data-lang="${item.lang}">` +
        `<div class="code-block-header">` +
          `<span class="code-lang-tag">${item.lang}</span>` +
          `<button type="button" class="btn-copy-code" title="Copiar código para a área de transferência">` +
            `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>` +
            `<span>Copiar código</span>` +
          `</button>` +
        `</div>` +
        `<pre><code class="hljs language-${item.lang}">${item.code}</code></pre>` +
      `</div>`;

      formatted = formatted.replace(`___KAMBA_CODE_BLOCK_${index}___`, codeHtml);
    });

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
    currentUser = getActiveUser();
    updateUserProfileUI();
    updateGeminiStatusUI();
    updateModelSelectorUI();
    if (currentUser) {
      loadUserChats(currentUser.email);
    }
    if (chats.length === 0) {
      createNewChat();
    } else {
      loadChat(chats[0].id);
    }
  }

  // --- PROGRESSIVE WEB APP (PWA) & INSTALAÇÃO ---
  let deferredPwaPrompt = null;

  function initPwaServiceWorker() {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            reg.update();
            console.log('[PWA] Service Worker registrado e atualizado:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Falha no registro do Service Worker:', err);
          });
      });
    }

    const btnInstall = document.getElementById('btn-install-pwa');
    const btnChatInstall = document.getElementById('btn-chat-install-pwa');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPwaPrompt = e;
      if (btnInstall) btnInstall.style.display = 'inline-flex';
      if (btnChatInstall) btnChatInstall.style.display = 'inline-flex';
    });

    const handleInstallClick = async () => {
      if (!deferredPwaPrompt) return;
      deferredPwaPrompt.prompt();
      const choice = await deferredPwaPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        showToast('Obrigado por instalar o Meu Kota IA!');
        if (btnInstall) btnInstall.style.display = 'none';
        if (btnChatInstall) btnChatInstall.style.display = 'none';
      }
      deferredPwaPrompt = null;
    };

    if (btnInstall) btnInstall.addEventListener('click', handleInstallClick);
    if (btnChatInstall) btnChatInstall.addEventListener('click', handleInstallClick);

    window.addEventListener('appinstalled', () => {
      showToast('Meu Kota IA instalado com sucesso no seu dispositivo!');
      if (btnInstall) btnInstall.style.display = 'none';
      if (btnChatInstall) btnChatInstall.style.display = 'none';
      deferredPwaPrompt = null;
    });
  }

  // --- EVENTOS DO MODAL DE CHECKOUT & PAGAMENTOS (FASE 5) ---
  let checkoutCountdownInterval = null;

  function openPricingModal() {
    const modal = document.getElementById('modal-pricing-checkout');
    if (!modal) return;
    
    // Resetar visualização do modal
    const plansGrid = modal.querySelector('.checkout-plans-grid');
    const paymentSection = modal.querySelector('.checkout-payment-section');
    const successView = document.getElementById('checkout-success-view');
    const waitingBox = document.getElementById('mcx-waiting-box');
    const mcxForm = modal.querySelector('.pay-mcx-form');

    if (plansGrid) plansGrid.style.display = 'grid';
    if (paymentSection) paymentSection.style.display = 'block';
    if (successView) successView.style.display = 'none';
    if (waitingBox) waitingBox.style.display = 'none';
    if (mcxForm) mcxForm.style.display = 'block';

    if (checkoutCountdownInterval) {
      clearInterval(checkoutCountdownInterval);
      checkoutCountdownInterval = null;
    }

    modal.classList.add('active');
  }

  function setupPricingModalEvents() {
    const modal = document.getElementById('modal-pricing-checkout');
    const btnOpenModal = document.getElementById('btn-open-pricing-modal');
    const btnCloseModal = document.getElementById('btn-close-pricing-modal');
    const btnFinishCheckout = document.getElementById('btn-finish-checkout');

    if (btnOpenModal) {
      btnOpenModal.addEventListener('click', () => {
        openPricingModal();
      });
    }

    if (btnCloseModal && modal) {
      btnCloseModal.addEventListener('click', () => {
        modal.classList.remove('active');
        if (checkoutCountdownInterval) clearInterval(checkoutCountdownInterval);
      });
    }

    if (btnFinishCheckout && modal) {
      btnFinishCheckout.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          if (checkoutCountdownInterval) clearInterval(checkoutCountdownInterval);
        }
      });
    }

    // Seletor de Planos (Passe 24h vs. Pro)
    let selectedPlan = 'pro';
    const cardDaily = document.getElementById('plan-card-daily');
    const cardPro = document.getElementById('plan-card-pro');
    const mcxBtnAmount = document.getElementById('mcx-btn-amount');
    const refAmountVal = document.getElementById('ref-amount-val');
    const stripeBtnAmount = document.getElementById('stripe-btn-amount');
    const mcxWaitingVal = document.getElementById('mcx-waiting-val');

    function updateAmountsUI() {
      const btnDaily = cardDaily ? cardDaily.querySelector('.btn-plan-select') : null;
      const btnPro = cardPro ? cardPro.querySelector('.btn-plan-select') : null;

      if (selectedPlan === 'daily_pass') {
        if (mcxBtnAmount) mcxBtnAmount.textContent = '1.500 Kz';
        if (refAmountVal) refAmountVal.textContent = '1.500,00 Kz';
        if (stripeBtnAmount) stripeBtnAmount.textContent = 'US$ 1,50';
        if (mcxWaitingVal) mcxWaitingVal.textContent = '1.500 Kz';
        if (btnDaily) btnDaily.textContent = 'Plano Selecionado';
        if (btnPro) btnPro.textContent = 'Selecionar Pro';
      } else {
        if (mcxBtnAmount) mcxBtnAmount.textContent = '9.900 Kz';
        if (refAmountVal) refAmountVal.textContent = '9.900,00 Kz';
        if (stripeBtnAmount) stripeBtnAmount.textContent = 'US$ 10,00';
        if (mcxWaitingVal) mcxWaitingVal.textContent = '9.900 Kz';
        if (btnDaily) btnDaily.textContent = 'Selecionar Passe 24h';
        if (btnPro) btnPro.textContent = 'Plano Selecionado';
      }
    }

    if (cardDaily && cardPro) {
      cardDaily.addEventListener('click', () => {
        selectedPlan = 'daily_pass';
        cardDaily.classList.add('selected');
        cardPro.classList.remove('selected');
        updateAmountsUI();
      });

      cardPro.addEventListener('click', () => {
        selectedPlan = 'pro';
        cardPro.classList.add('selected');
        cardDaily.classList.remove('selected');
        updateAmountsUI();
      });
    }

    // Seletor de Abas de Pagamento
    const tabMcx = document.getElementById('tab-pay-mcx');
    const tabRef = document.getElementById('tab-pay-ref');
    const tabStripe = document.getElementById('tab-pay-stripe');
    const contentMcx = document.getElementById('content-pay-mcx');
    const contentRef = document.getElementById('content-pay-ref');
    const contentStripe = document.getElementById('content-pay-stripe');

    function switchPayTab(activeTab, activeContent) {
      [tabMcx, tabRef, tabStripe].forEach(t => t && t.classList.remove('active'));
      [contentMcx, contentRef, contentStripe].forEach(c => {
        if (c) c.style.display = 'none';
      });

      if (activeTab) activeTab.classList.add('active');
      if (activeContent) activeContent.style.display = 'block';
    }

    if (tabMcx && contentMcx) tabMcx.addEventListener('click', () => switchPayTab(tabMcx, contentMcx));
    if (tabRef && contentRef) tabRef.addEventListener('click', () => switchPayTab(tabRef, contentRef));
    if (tabStripe && contentStripe) tabStripe.addEventListener('click', () => switchPayTab(tabStripe, contentStripe));

    // Ação: Copiar dados da Referência
    const copyButtons = modal.querySelectorAll('.btn-copy-ref');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy') || '';
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copiado!';
          btn.style.background = 'var(--angola-yellow)';
          btn.style.color = '#000';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        });
      });
    });

    // Função de Ativação do Plano com Sucesso
    function activateSubscriptionSuccess(methodName) {
      if (checkoutCountdownInterval) clearInterval(checkoutCountdownInterval);

      const durationMs = selectedPlan === 'daily_pass' ? 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
      const expiresAt = Date.now() + durationMs;

      const subData = {
        plan: selectedPlan,
        active: true,
        expiresAt: expiresAt,
        method: methodName,
        startedAt: Date.now()
      };

      setUserSubscription(subData);

      // Sincronizar via Webhook automático de pagamentos do backend
      if (currentUser && currentUser.uid) {
        fetch('/api/payment-webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser.uid,
            plan: selectedPlan,
            method: methodName,
            amount: selectedPlan === 'daily_pass' ? 1500 : 9900
          })
        }).catch(err => console.log('[Webhook Sync]', err.message));
      }

      // Atualizar tela de sucesso no modal
      const plansGrid = modal.querySelector('.checkout-plans-grid');
      const paymentSection = modal.querySelector('.checkout-payment-section');
      const successView = document.getElementById('checkout-success-view');
      const successPlanDesc = document.getElementById('success-plan-desc');

      if (plansGrid) plansGrid.style.display = 'none';
      if (paymentSection) paymentSection.style.display = 'none';
      if (successView) successView.style.display = 'block';

      if (successPlanDesc) {
        successPlanDesc.innerHTML = selectedPlan === 'daily_pass'
          ? 'Seu <strong>Passe 24 Horas</strong> está ativo! Aproveite perguntas e respostas ilimitadas até amanhã.'
          : 'Sua assinatura <strong>Meu Kota Pro Mensal</strong> está ativa com perguntas ilimitadas e raciocínio profundo!';
      }

      showToast('🎉 Pagamento confirmado! Assinatura ativada com sucesso!');
    }

    // Ação: Submeter Multicaixa Express
    const btnSubmitMcx = document.getElementById('btn-submit-mcx');
    const inputMcxPhone = document.getElementById('input-mcx-phone');
    const mcxWaitingBox = document.getElementById('mcx-waiting-box');
    const mcxForm = modal.querySelector('.pay-mcx-form');
    const mcxWaitingPhone = document.getElementById('mcx-waiting-phone');
    const mcxCountdownTimer = document.getElementById('mcx-countdown-timer');
    const btnSimulateMcxSuccess = document.getElementById('btn-mcx-simulate-success');

    if (btnSubmitMcx && inputMcxPhone) {
      btnSubmitMcx.addEventListener('click', () => {
        const phone = inputMcxPhone.value.trim().replace(/\s+/g, '');
        if (!phone || phone.length < 9) {
          showToast('Por favor, insira um número de telemóvel válido de Angola (9 dígitos).');
          inputMcxPhone.focus();
          return;
        }

        if (mcxForm) mcxForm.style.display = 'none';
        if (mcxWaitingBox) mcxWaitingBox.style.display = 'block';
        if (mcxWaitingPhone) mcxWaitingPhone.textContent = `+244 ${phone}`;

        // Iniciar timer regressivo de 5 minutos
        let secondsLeft = 299;
        if (checkoutCountdownInterval) clearInterval(checkoutCountdownInterval);

        checkoutCountdownInterval = setInterval(() => {
          secondsLeft--;
          if (secondsLeft <= 0) {
            clearInterval(checkoutCountdownInterval);
            if (mcxCountdownTimer) mcxCountdownTimer.textContent = '00:00';
            showToast('Tempo de autorização esgotado. Tente novamente.');
            if (mcxForm) mcxForm.style.display = 'block';
            if (mcxWaitingBox) mcxWaitingBox.style.display = 'none';
            return;
          }

          const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
          const secs = String(secondsLeft % 60).padStart(2, '0');
          if (mcxCountdownTimer) mcxCountdownTimer.textContent = `${mins}:${secs}`;
        }, 1000);
      });
    }

    if (btnSimulateMcxSuccess) {
      btnSimulateMcxSuccess.addEventListener('click', () => {
        activateSubscriptionSuccess('Multicaixa Express');
      });
    }

    // Ação: Confirmar Referência
    const btnConfirmRef = document.getElementById('btn-confirm-reference-paid');
    if (btnConfirmRef) {
      btnConfirmRef.addEventListener('click', () => {
        activateSubscriptionSuccess('Referência Multicaixa');
      });
    }

    // Ação: Submeter Cartão Stripe
    const btnSubmitStripe = document.getElementById('btn-submit-stripe');
    const inputCardNum = document.getElementById('input-card-number');
    if (btnSubmitStripe) {
      btnSubmitStripe.addEventListener('click', () => {
        if (inputCardNum && !inputCardNum.value.trim()) {
          showToast('Por favor, informe os dados do cartão de crédito internacional.');
          inputCardNum.focus();
          return;
        }
        activateSubscriptionSuccess('Cartão Internacional (Stripe)');
      });
    }
  }

  // --- GESTÃO DE CONTA E MODAIS ESTILO CHATGPT (SCREENSHOTS 1, 2 E 3) ---
  function setupAccountAndPaymentModals() {
    // 1. Popover do Usuário (Screenshot 1)
    const btnUserCard = document.getElementById('btn-user-profile');
    const userPopover = document.getElementById('gpt-user-popover');
    const linkUpdatePay = document.getElementById('link-card-update-pay');
    const btnUserPopoverAccount = document.getElementById('btn-user-popover-account');
    const userAccountsFlyout = document.getElementById('user-accounts-flyout');
    const btnFlyoutAddAccount = document.getElementById('btn-flyout-add-account');

    // Modais
    const modalReviewPayment = document.getElementById('modal-review-payment');
    const btnCloseReviewPayment = document.getElementById('btn-close-review-payment');
    const btnOpenAddPaymentMethod = document.getElementById('btn-open-add-payment-method');
    const btnReviewPayNow = document.getElementById('btn-review-pay-now');

    const modalAddPaymentMethod = document.getElementById('modal-add-payment-method');
    const btnCloseAddPaymentMethod = document.getElementById('btn-close-add-payment-method');
    const btnSubmitAddCard = document.getElementById('btn-submit-add-card');
    const inputAddCardNum = document.getElementById('add-card-number');
    const inputAddCardExpiry = document.getElementById('add-card-expiry');
    const inputAddCardCvc = document.getElementById('add-card-cvc');
    const inputAddCardName = document.getElementById('add-card-name');
    const selectAddCardCountry = document.getElementById('add-card-country');
    const inputAddCardAddress = document.getElementById('add-card-address');

    const modalCustomization = document.getElementById('modal-customization');
    const btnCloseCustomization = document.getElementById('btn-close-customization');
    const btnSaveCustomization = document.getElementById('btn-save-customization');
    const textareaCustomBio = document.getElementById('custom-user-bio');
    const textareaCustomStyle = document.getElementById('custom-response-style');

    const modalSettings = document.getElementById('modal-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const btnClearAllChats = document.getElementById('btn-clear-all-chats-data');
    const btnSettingsManageSub = document.getElementById('btn-settings-manage-subscription');

    const modalUserProfile = document.getElementById('modal-user-profile');
    const btnCloseUserProfile = document.getElementById('btn-close-user-profile');
    const btnCloseProfileDone = document.getElementById('btn-close-profile-done');

    // Menu do Popover
    const btnMenuReviewPayment = document.getElementById('btn-menu-review-payment');
    const btnMenuCustomization = document.getElementById('btn-menu-customization');
    const btnMenuProfile = document.getElementById('btn-menu-profile');
    const btnMenuSettings = document.getElementById('btn-menu-settings');
    const btnMenuHelp = document.getElementById('btn-menu-help');
    const btnMenuLogout = document.getElementById('btn-menu-logout');

    // Toggle Popover ao clicar no card do usuário
    if (btnUserCard && userPopover) {
      btnUserCard.addEventListener('click', (e) => {
        e.preventDefault();
        // Se clicou no link interno "Atualizar pagamento", abre direto o modal
        if (e.target && e.target.id === 'link-card-update-pay') {
          return;
        }
        e.stopPropagation();
        const isVisible = userPopover.style.display === 'block';
        userPopover.style.display = isVisible ? 'none' : 'block';
        if (userAccountsFlyout) userAccountsFlyout.style.display = 'none';
      });
    }

    // Link "Atualizar pagamento" no card do rodapé
    if (linkUpdatePay && modalReviewPayment) {
      linkUpdatePay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (userPopover) userPopover.style.display = 'none';
        modalReviewPayment.classList.add('active');
      });
    }

    // Fechar popover ao clicar fora
    document.addEventListener('click', (e) => {
      if (userPopover && userPopover.style.display === 'block') {
        if (!userPopover.contains(e.target) && (!btnUserCard || !btnUserCard.contains(e.target))) {
          userPopover.style.display = 'none';
          if (userAccountsFlyout) userAccountsFlyout.style.display = 'none';
        }
      }
    });

    // Submenu Flyout de Troca de Contas (Screenshot 1)
    if (btnUserPopoverAccount && userAccountsFlyout) {
      btnUserPopoverAccount.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = userAccountsFlyout.style.display === 'block';
        userAccountsFlyout.style.display = isOpen ? 'none' : 'block';
      });
    }

    if (btnFlyoutAddAccount) {
      btnFlyoutAddAccount.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        if (userAccountsFlyout) userAccountsFlyout.style.display = 'none';
        showView('auth');
        showToast('Conecte uma nova conta Google ou e-mail.');
      });
    }

    // Ações dos Itens do Popover
    if (btnMenuReviewPayment && modalReviewPayment) {
      btnMenuReviewPayment.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        modalReviewPayment.classList.add('active');
      });
    }

    if (btnMenuCustomization && modalCustomization) {
      btnMenuCustomization.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        if (textareaCustomBio) textareaCustomBio.value = localStorage.getItem('meu_kota_custom_bio') || '';
        if (textareaCustomStyle) textareaCustomStyle.value = localStorage.getItem('meu_kota_custom_style') || '';
        modalCustomization.classList.add('active');
      });
    }

    if (btnMenuProfile && modalUserProfile) {
      btnMenuProfile.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        modalUserProfile.classList.add('active');
      });
    }

    if (btnMenuSettings && modalSettings) {
      btnMenuSettings.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        modalSettings.classList.add('active');
      });
    }

    if (btnMenuHelp) {
      btnMenuHelp.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        showToast('ℹ️ Meu Kota IA: Plataforma consultiva sênior multi-dispositivo.');
      });
    }

    if (btnMenuLogout) {
      btnMenuLogout.addEventListener('click', () => {
        if (userPopover) userPopover.style.display = 'none';
        if (typeof firebase !== 'undefined' && firebase.auth) {
          firebase.auth().signOut().catch(() => {});
        }
        localStorage.removeItem(ACTIVE_SESSION_KEY);
        currentUser = null;
        showView('landing');
        showToast('Você encerrou a sessão.');
      });
    }

    // --- MODAL 1: REVISE A FORMA DE PAGAMENTO (SCREENSHOT 3) ---
    if (btnCloseReviewPayment && modalReviewPayment) {
      btnCloseReviewPayment.addEventListener('click', () => modalReviewPayment.classList.remove('active'));
    }

    if (btnOpenAddPaymentMethod && modalAddPaymentMethod) {
      btnOpenAddPaymentMethod.addEventListener('click', () => {
        if (modalReviewPayment) modalReviewPayment.classList.remove('active');
        modalAddPaymentMethod.classList.add('active');
      });
    }

    if (btnReviewPayNow) {
      btnReviewPayNow.addEventListener('click', () => {
        if (modalReviewPayment) modalReviewPayment.classList.remove('active');
        openPricingModal();
      });
    }

    // --- MODAL 2: ADICIONAR MÉTODO DE PAGAMENTO (SCREENSHOT 2) ---
    if (btnCloseAddPaymentMethod && modalAddPaymentMethod) {
      btnCloseAddPaymentMethod.addEventListener('click', () => {
        modalAddPaymentMethod.classList.remove('active');
        if (modalReviewPayment) modalReviewPayment.classList.add('active');
      });
    }

    // Formatação do número de cartão
    if (inputAddCardNum) {
      inputAddCardNum.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 16);
        let parts = [];
        for (let i = 0, len = v.length; i < len; i += 4) {
          parts.push(v.substring(i, i + 4));
        }
        e.target.value = parts.join(' ');
      });
    }

    // Formatação da validade
    if (inputAddCardExpiry) {
      inputAddCardExpiry.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (v.length >= 2) {
          e.target.value = v.slice(0, 2) + ' / ' + v.slice(2);
        } else {
          e.target.value = v;
        }
      });
    }

    if (btnSubmitAddCard) {
      btnSubmitAddCard.addEventListener('click', () => {
        const rawCard = (inputAddCardNum ? inputAddCardNum.value.trim() : '').replace(/\s+/g, '');
        const cardExpiry = inputAddCardExpiry ? inputAddCardExpiry.value.trim() : '';
        const cardCvc = inputAddCardCvc ? inputAddCardCvc.value.trim() : '';
        const cardName = inputAddCardName ? inputAddCardName.value.trim() : '';

        if (!rawCard || rawCard.length < 15) {
          showToast('Por favor, informe um número de cartão de crédito válido.');
          if (inputAddCardNum) inputAddCardNum.focus();
          return;
        }
        if (!cardExpiry || cardExpiry.length < 5) {
          showToast('Por favor, informe a data de validade (MM / AA).');
          if (inputAddCardExpiry) inputAddCardExpiry.focus();
          return;
        }
        if (!cardCvc || cardCvc.length < 3) {
          showToast('Por favor, informe o código de segurança (CVC).');
          if (inputAddCardCvc) inputAddCardCvc.focus();
          return;
        }

        const last4 = rawCard.slice(-4);
        const savedCardData = {
          last4: last4,
          name: cardName || (currentUser && currentUser.name) || 'Titular',
          country: selectAddCardCountry ? selectAddCardCountry.value : 'Angola',
          addedAt: Date.now()
        };
        localStorage.setItem('meu_kota_saved_card', JSON.stringify(savedCardData));

        // Atualizar lista no modal de revisão
        const reviewMethodName = document.getElementById('review-primary-method-name');
        const reviewMethodExtra = document.getElementById('review-primary-method-extra');
        const reviewStatusBadge = document.getElementById('review-status-badge');

        if (reviewMethodName) reviewMethodName.textContent = `Cartão Visa (•••• ${last4})`;
        if (reviewMethodExtra) reviewMethodExtra.textContent = `Validade: ${cardExpiry}`;
        if (reviewStatusBadge) {
          reviewStatusBadge.textContent = 'Pronto para cobrança';
          reviewStatusBadge.style.background = 'rgba(16, 185, 129, 0.16)';
          reviewStatusBadge.style.color = '#10B981';
        }

        showToast('Cartão salvo com sucesso como método de cobrança!');
        if (modalAddPaymentMethod) modalAddPaymentMethod.classList.remove('active');
        if (modalReviewPayment) modalReviewPayment.classList.add('active');
      });
    }

    // --- MODAL 3: PERSONALIZAÇÃO ---
    if (btnCloseCustomization && modalCustomization) {
      btnCloseCustomization.addEventListener('click', () => modalCustomization.classList.remove('active'));
    }

    if (btnSaveCustomization) {
      btnSaveCustomization.addEventListener('click', () => {
        const bio = textareaCustomBio ? textareaCustomBio.value.trim() : '';
        const style = textareaCustomStyle ? textareaCustomStyle.value.trim() : '';
        localStorage.setItem('meu_kota_custom_bio', bio);
        localStorage.setItem('meu_kota_custom_style', style);
        showToast('Preferências de personalização salvas com sucesso!');
        if (modalCustomization) modalCustomization.classList.remove('active');
      });
    }

    // --- MODAL 4: CONFIGURAÇÕES ---
    if (btnCloseSettings && modalSettings) {
      btnCloseSettings.addEventListener('click', () => modalSettings.classList.remove('active'));
    }

    // Abas de configurações
    const settingsTabs = document.querySelectorAll('.settings-tab-btn');
    const settingsPanes = document.querySelectorAll('.settings-tab-pane');
    settingsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        settingsTabs.forEach(t => t.classList.remove('active'));
        settingsPanes.forEach(p => {
          if (p) p.style.display = 'none';
        });
        tab.classList.add('active');
        const targetPane = document.getElementById(`pane-${tab.getAttribute('data-tab')}`);
        if (targetPane) targetPane.style.display = 'block';
      });
    });

    if (btnSettingsManageSub && modalReviewPayment) {
      btnSettingsManageSub.addEventListener('click', () => {
        if (modalSettings) modalSettings.classList.remove('active');
        modalReviewPayment.classList.add('active');
      });
    }

    if (btnClearAllChats) {
      btnClearAllChats.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja apagar todo o histórico de conversas?')) {
          chats = [];
          localStorage.removeItem('kamba_chats_history');
          renderHistory();
          startNewChat();
          showToast('Histórico de conversas limpo.');
          if (modalSettings) modalSettings.classList.remove('active');
        }
      });
    }

    // --- MODAL 5: PERFIL DO USUÁRIO ---
    if (btnCloseUserProfile && modalUserProfile) {
      btnCloseUserProfile.addEventListener('click', () => modalUserProfile.classList.remove('active'));
    }
    if (btnCloseProfileDone && modalUserProfile) {
      btnCloseProfileDone.addEventListener('click', () => modalUserProfile.classList.remove('active'));
    }
  }

  // Configurações e Inicializações Globais
  initFirebaseAuth();
  currentUser = getActiveUser();
  updateUserProfileUI();
  updateSubscriptionUI();
  setupPricingModalEvents();
  setupAccountAndPaymentModals();
  setupModelSelectorEvents();
  updateModelSelectorUI();
  updateGeminiStatusUI();
  setupImagePreviewEvents();
  setupWelcomePillsEvents();
  setupVoiceInput();
  initPwaServiceWorker();

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

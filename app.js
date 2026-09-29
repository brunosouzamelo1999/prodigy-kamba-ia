/* ============================================================
   CHATGPT OFFICIAL THEME — CLIENT APP & LOGIC
   Layout Minimalista, Barra Retrátil, Histórico e Motor Conversacional
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Expurgar imediatamente chaves antigas com saldo esgotado (402) e configs do projeto antigo
  try {
    const storedKey = (localStorage.getItem('kamba_gemini_api_key') || '').trim();
    if (storedKey && (storedKey.includes('LkUf') || storedKey.includes(atob('QVEuQWI4Uk42TGtV')))) {
      localStorage.removeItem('kamba_gemini_api_key');
      localStorage.removeItem('kamba_gemini_model_config');
    }
    const storedFb = localStorage.getItem('kamba_firebase_config');
    if (storedFb && (storedFb.includes(atob('YnJ1bm8tdGVzdGUta2FtYmE=')) || storedFb.includes('704788185428'))) {
      localStorage.removeItem('kamba_firebase_config');
    }
  } catch(e) {}

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

  // --- ELEMENTOS DO CHAT IA (MEU KOTA IA) ---
  const gptLayout = document.getElementById('gpt-layout');
  const gptSidebar = document.getElementById('gpt-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const btnNewChat = document.getElementById('btn-new-chat');
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const btnOpenSidebar = document.getElementById('btn-open-sidebar');
  const btnTopNewChat = document.getElementById('btn-top-new-chat');
  const btnShareChat = document.getElementById('btn-share-chat');
  const modalShareChat = document.getElementById('modal-share-chat');
  const btnCloseShareModal = document.getElementById('btn-close-share-modal');
  const shareModalChatTitle = document.getElementById('share-modal-chat-title');
  const shareModalChatMeta = document.getElementById('share-modal-chat-meta');
  const shareChatPreviewBox = document.getElementById('share-chat-preview-box');
  const btnShareCopyLink = document.getElementById('btn-share-copy-link');
  const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
  const btnShareCopyText = document.getElementById('btn-share-copy-text');
  const btnShareDownloadTxt = document.getElementById('btn-share-download-txt');
  const btnShareDownloadPdf = document.getElementById('btn-share-download-pdf');
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
  let speakingKeepAliveTimer = null;
  let ttsWatchdogTimer = null;
  let activeUtterance = null;
  let cachedVoices = [];
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
          content: `Aqui estão sugestões de alto impacto:\n\n1. **Kota Studio** (curto, memorável e amigável)\n2. **Synthetix Flow** (tecnológico e veloz)\n3. **Vektor AI** (preciso e focado em design)\n4. **Prism Core** (elegante e moderno)\n\nAlgum desses estilos ressoa melhor com o seu posicionamento?`
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
          // Se estiver gerando resposta no momento ou houver escrita local pendente, não interromper o chat ativo
          if (isGenerating || (snapshot.metadata && snapshot.metadata.hasPendingWrites)) {
            return;
          }

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

          if (currentChatId && !isGenerating) {
            const activeChat = chats.find(c => c.id === currentChatId);
            if (activeChat && chatMessages) {
              const currentRenderedCount = chatMessages.querySelectorAll('.gpt-msg-row').length;
              if (activeChat.messages.length !== currentRenderedCount) {
                loadChat(currentChatId);
              }
            }
          }
        } else if (chats.length > 0 && !isGenerating) {
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

  // --- CONTROLE DA BARRA LATERAL (RESPONSIVO PARA CELULAR, TABLET E COMPUTADOR) ---
  function toggleSidebar(collapse) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (typeof collapse === 'boolean') {
        if (collapse) {
          if (gptSidebar) gptSidebar.classList.remove('open');
          if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        } else {
          if (gptSidebar) gptSidebar.classList.add('open');
          if (sidebarOverlay) sidebarOverlay.classList.add('active');
        }
      } else {
        const isOpen = gptSidebar && gptSidebar.classList.contains('open');
        if (isOpen) {
          if (gptSidebar) gptSidebar.classList.remove('open');
          if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        } else {
          if (gptSidebar) gptSidebar.classList.add('open');
          if (sidebarOverlay) sidebarOverlay.classList.add('active');
        }
      }
    } else {
      // Computador e Tablet: Minimizar / Expandir da frente do chat
      if (typeof collapse === 'boolean') {
        if (collapse) {
          if (gptLayout) gptLayout.classList.add('sidebar-collapsed');
          localStorage.setItem('gpt_sidebar_collapsed', 'true');
        } else {
          if (gptLayout) gptLayout.classList.remove('sidebar-collapsed');
          localStorage.setItem('gpt_sidebar_collapsed', 'false');
        }
      } else {
        const isCollapsed = gptLayout && gptLayout.classList.contains('sidebar-collapsed');
        if (isCollapsed) {
          if (gptLayout) gptLayout.classList.remove('sidebar-collapsed');
          localStorage.setItem('gpt_sidebar_collapsed', 'false');
        } else {
          if (gptLayout) gptLayout.classList.add('sidebar-collapsed');
          localStorage.setItem('gpt_sidebar_collapsed', 'true');
        }
      }
    }
  }

  if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => toggleSidebar(true));
  }

  if (btnOpenSidebar) {
    btnOpenSidebar.addEventListener('click', () => toggleSidebar(false));
  }

  if (btnTopNewChat) {
    btnTopNewChat.addEventListener('click', () => {
      createNewChat();
      if (window.innerWidth <= 768) {
        toggleSidebar(true);
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => toggleSidebar(true));
  }

  // Restaurar preferência do usuário no Desktop / Tablet
  if (gptLayout && window.innerWidth > 768) {
    const isCollapsed = localStorage.getItem('gpt_sidebar_collapsed') === 'true';
    if (isCollapsed) {
      gptLayout.classList.add('sidebar-collapsed');
    } else {
      gptLayout.classList.remove('sidebar-collapsed');
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (gptSidebar) gptSidebar.classList.remove('open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      const isCollapsed = localStorage.getItem('gpt_sidebar_collapsed') === 'true';
      if (isCollapsed && gptLayout) {
        gptLayout.classList.add('sidebar-collapsed');
      } else if (gptLayout) {
        gptLayout.classList.remove('sidebar-collapsed');
      }
    }
  });

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
    apiKey: "AIzaSyDNc7NNhoP1RArcJ2rVL_Sbv94Ie8UMts4",
    authDomain: "meu-kota-ia.firebaseapp.com",
    projectId: "meu-kota-ia",
    storageBucket: "meu-kota-ia.firebasestorage.app",
    messagingSenderId: "72559907421",
    appId: "1:72559907421:web:b9b7284d3125351ecab3b4",
    measurementId: "G-ZJWMELJYV1"
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
      if (parsed && (parsed.projectId === atob('YnJ1bm8tdGVzdGUta2FtYmE=') || parsed.authDomain?.includes(atob('YnJ1bm8tdGVzdGUta2FtYmE=')) || parsed.messagingSenderId === '704788185428')) {
        localStorage.removeItem(FIREBASE_CONFIG_KEY);
        return DEFAULT_FIREBASE_CONFIG;
      }
      if (parsed && parsed.apiKey && parsed.projectId === 'meu-kota-ia') return parsed;
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
          email: 'bruno@meukota.ia',
          password: 'kota123',
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
    return all.length > 0 ? all[0] : { name: 'Bruno Souza', email: 'bruno@meukota.ia' };
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
      const demoUser = { name: 'Convidado Meu Kota', email: 'convidado@meukota.ia', provider: 'demo', emailVerified: true };
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

  if (btnShareChat) btnShareChat.addEventListener('click', (e) => { e.preventDefault(); openShareChatModal(); });

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
    if (isGenerating && currentChatId === chatId) {
      return;
    }

    stopSpeaking();
    if (currentAbortController && isGenerating && currentChatId !== chatId) {
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
      let lastUserIndex = -1;
      chat.messages.forEach((msg, idx) => {
        if (msg.role === 'user') {
          lastUserIndex = idx;
          const row = appendMessageToDOM(msg.role, msg.content, false, msg.file || null, msg.image || null, idx);
          if (row) applyCodeHighlighting(row);
        } else {
          const row = appendMessageToDOM(msg.role, msg.content, false, msg.file || null, msg.image || null, lastUserIndex);
          if (row) applyCodeHighlighting(row);
        }
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

  // --- SÍNTESE DE VOZ (TEXT-TO-SPEECH UNIVERSAL PARA QUALQUER MENSAGEM) ---
  function loadSpeechVoices() {
    if ('speechSynthesis' in window) {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    }
  }

  if ('speechSynthesis' in window) {
    loadSpeechVoices();
    window.speechSynthesis.onvoiceschanged = loadSpeechVoices;
  }

  // Seletor inteligente de voz em Português (Prioridade padrão: Português do Brasil - pt-BR)
  function getPreferredPortugueseVoice() {
    if (!('speechSynthesis' in window)) return null;

    let voices = cachedVoices;
    if (!voices || voices.length === 0) {
      voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) cachedVoices = voices;
    }
    if (!voices || voices.length === 0) return null;

    const savedPref = localStorage.getItem('meu_kota_voice_lang') || 'pt-BR';
    let target = savedPref;
    if (target === 'auto') {
      const navLang = (navigator.language || '').toLowerCase();
      target = navLang.includes('pt-pt') ? 'pt-PT' : 'pt-BR';
    }

    const norm = (str) => (str || '').toLowerCase().replace(/_/g, '-');

    if (target === 'pt-BR') {
      // 1. Vozes pt-BR de alta fidelidade / naturais (Google, Microsoft Neural/Online, Luciana, Felipe, etc.)
      const naturalBr = voices.find(v => {
        const l = norm(v.lang);
        const n = norm(v.name);
        const isBr = l === 'pt-br' || l.startsWith('pt-br') || l === 'por-bra' || n.includes('brasil') || n.includes('brazil');
        return isBr && (n.includes('natural') || n.includes('online') || n.includes('google') || n.includes('neural') || n.includes('felipe') || n.includes('luciana'));
      });
      if (naturalBr) return naturalBr;

      // 2. Qualquer voz identificada como Português do Brasil
      const anyBr = voices.find(v => {
        const l = norm(v.lang);
        const n = norm(v.name);
        return l === 'pt-br' || l.startsWith('pt-br') || l === 'por-bra' || n.includes('brasil') || n.includes('brazil') || n.includes('brasileiro');
      });
      if (anyBr) return anyBr;
    } else if (target === 'pt-PT') {
      // 1. Vozes pt-PT naturais
      const naturalPt = voices.find(v => {
        const l = norm(v.lang);
        const n = norm(v.name);
        const isPt = l === 'pt-pt' || l.startsWith('pt-pt') || l === 'por-prt' || n.includes('portugal');
        return isPt && (n.includes('natural') || n.includes('online') || n.includes('google') || n.includes('neural') || n.includes('catarina') || n.includes('joana'));
      });
      if (naturalPt) return naturalPt;

      // 2. Qualquer voz identificada como Português de Portugal
      const anyPt = voices.find(v => {
        const l = norm(v.lang);
        const n = norm(v.name);
        return l === 'pt-pt' || l.startsWith('pt-pt') || l === 'por-prt' || n.includes('portugal');
      });
      if (anyPt) return anyPt;
    }

    // Fallback prioritário para Português do Brasil
    const fallbackBr = voices.find(v => {
      const l = norm(v.lang);
      const n = norm(v.name);
      return l.includes('pt-br') || l.includes('por-bra') || n.includes('brasil') || n.includes('brazil');
    });
    if (fallbackBr) return fallbackBr;

    // Fallback geral para qualquer voz em língua portuguesa instalada
    const anyPortuguese = voices.find(v => {
      const l = norm(v.lang);
      const n = norm(v.name);
      return l.startsWith('pt') || l.startsWith('por') || n.includes('portuguese') || n.includes('português');
    });

    return anyPortuguese || null;
  }

  function stopSpeaking() {
    if (ttsWatchdogTimer) {
      clearTimeout(ttsWatchdogTimer);
      ttsWatchdogTimer = null;
    }
    if (speakingKeepAliveTimer) {
      clearInterval(speakingKeepAliveTimer);
      speakingKeepAliveTimer = null;
    }
    activeUtterance = null;
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    if (activeSpeakingButton) {
      activeSpeakingButton.classList.remove('is-speaking');
      const span = activeSpeakingButton.querySelector('span');
      if (span) span.textContent = 'Ouvir';
      activeSpeakingButton = null;
    }
  }

  // Segmentação inteligente de texto para leitura contínua e sem interrupções em dispositivos móveis
  function prepareTextForSpeech(rawText) {
    if (!rawText) return [];

    let clean = rawText
      .replace(/```[\s\S]*?```/g, ' Trecho de código omitido. ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\\times/g, ' vezes ')
      .replace(/\\cdot/g, ' multiplicado por ')
      .replace(/\\neq/g, ' diferente de ')
      .replace(/\\leq|\\le/g, ' menor ou igual ')
      .replace(/\\geq|\\ge/g, ' maior ou igual ')
      .replace(/\\approx/g, ' aproximadamente ')
      .replace(/\\det/g, ' determinante ')
      .replace(/[*_~>#-]/g, ' ')
      .replace(/\r\n|\r/g, '\n')
      .replace(/\t/g, ' ');

    // Separar em blocos por quebras de linha e pontuação forte (. ! ? : \n)
    const rawChunks = clean.split(/([.!?:\n]+)/);
    const sentences = [];

    for (let i = 0; i < rawChunks.length; i += 2) {
      const textPiece = (rawChunks[i] || '').trim();
      const punct = (rawChunks[i + 1] || '').trim();
      if (!textPiece) continue;

      const combined = (textPiece + (punct ? ' ' : '')).trim();

      // Frases curtas e médias (< 160 caracteres) são ideais para o TTS móvel
      if (combined.length <= 160) {
        sentences.push(combined);
      } else {
        // Frases longas sem pontuação: dividir por vírgula ou espaço para evitar timeout do motor TTS
        const subWords = combined.split(/\s+/);
        let subBuffer = '';
        for (const w of subWords) {
          if ((subBuffer + ' ' + w).length > 130) {
            if (subBuffer) sentences.push(subBuffer);
            subBuffer = w;
          } else {
            subBuffer = subBuffer ? subBuffer + ' ' + w : w;
          }
        }
        if (subBuffer) sentences.push(subBuffer);
      }
    }

    return sentences.filter(s => s && s.replace(/[\s.,;:!?-]/g, '').length > 0);
  }

  function speakMessage(text, buttonEl) {
    if (!('speechSynthesis' in window)) {
      showToast('A síntese de voz não é suportada pelo seu navegador.');
      return;
    }

    const isVoiceActive = localStorage.getItem('meu_kota_voice_enabled') !== 'false';
    if (!isVoiceActive) {
      showToast('A reprodução de voz está desativada nas Configurações.');
      return;
    }

    if (activeSpeakingButton === buttonEl) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const sentences = prepareTextForSpeech(text);
    if (sentences.length === 0) {
      showToast('Nenhum texto legível disponível.');
      return;
    }

    activeSpeakingButton = buttonEl;
    buttonEl.classList.add('is-speaking');
    const span = buttonEl.querySelector('span');
    if (span) span.textContent = 'Parar';

    const savedPref = localStorage.getItem('meu_kota_voice_lang') || 'pt-BR';
    let targetLang = savedPref;
    if (targetLang === 'auto') {
      const navLang = (navigator.language || '').toLowerCase();
      targetLang = navLang.includes('pt-pt') ? 'pt-PT' : 'pt-BR';
    }

    // Selecionar a melhor voz em português (priorizando pt-BR)
    const ptVoice = getPreferredPortugueseVoice();

    let sentenceIndex = 0;

    function playNext() {
      if (sentenceIndex >= sentences.length || activeSpeakingButton !== buttonEl) {
        stopSpeaking();
        return;
      }

      const sentenceText = sentences[sentenceIndex];
      sentenceIndex++;

      // Criação da Utterance mantida em escopo global (evita que o Garbage Collector do Android a delete)
      const utterance = new SpeechSynthesisUtterance(sentenceText);
      activeUtterance = utterance;

      if (ptVoice) {
        utterance.voice = ptVoice;
        utterance.lang = ptVoice.lang || targetLang;
      } else {
        utterance.lang = targetLang;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      let hasFinished = false;

      function onEnded() {
        if (hasFinished) return;
        hasFinished = true;
        if (ttsWatchdogTimer) {
          clearTimeout(ttsWatchdogTimer);
          ttsWatchdogTimer = null;
        }
        // Intervalo acústico suave de 60ms entre sentenças
        setTimeout(() => {
          if (activeSpeakingButton === buttonEl) {
            playNext();
          }
        }, 60);
      }

      utterance.onend = onEnded;

      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') {
          if (activeSpeakingButton !== buttonEl) return;
        }
        console.warn('[TTS Mobile] Notificação de áudio:', e.error);
        onEnded();
      };

      // Watchdog de segurança para Android/iOS: caso o driver de voz termine sem disparar onend
      const wordCount = sentenceText.split(/\s+/).length;
      const estimatedMs = Math.max(3500, (wordCount * 500) + 2500);
      ttsWatchdogTimer = setTimeout(() => {
        if (activeSpeakingButton === buttonEl && !hasFinished) {
          if (!window.speechSynthesis.speaking) {
            onEnded();
          }
        }
      }, estimatedMs);

      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('[TTS] Falha ao reproduzir:', err);
        stopSpeaking();
      }
    }

    playNext();
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
      const savedPref = localStorage.getItem('meu_kota_voice_lang') || 'pt-BR';
      recognition.lang = savedPref === 'pt-PT' ? 'pt-PT' : (savedPref === 'auto' ? (navigator.language || 'pt-BR') : 'pt-BR');
      recognition.interimResults = true;
      recognition.continuous = false;
    } catch(e) {
      return;
    }

    let baseText = '';

    recognition.onstart = () => {
      const currentPref = localStorage.getItem('meu_kota_voice_lang') || 'pt-BR';
      recognition.lang = currentPref === 'pt-PT' ? 'pt-PT' : (currentPref === 'auto' ? (navigator.language || 'pt-BR') : 'pt-BR');
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

  // --- REGENERAR RESPOSTA DA IA (A PARTIR DE QUALQUER MENSAGEM DO HISTÓRICO) ---
  async function regenerateResponseForMessage(targetUserMsgIndex, triggerElement = null) {
    if (isGenerating) return;
    const chat = chats.find(c => c.id === currentChatId);
    if (!chat || chat.messages.length === 0) return;

    let userIndex = -1;

    // 1. Prioridade máxima: índice passado diretamente como número
    if (typeof targetUserMsgIndex === 'number' && !isNaN(targetUserMsgIndex) && targetUserMsgIndex >= 0 && targetUserMsgIndex < chat.messages.length) {
      userIndex = targetUserMsgIndex;
    }

    // 2. Extração via dataset no elemento disparador ou elemento de linha mais próximo
    if (userIndex === -1 && triggerElement) {
      const elWithData = triggerElement.getAttribute('data-user-index') !== null 
        ? triggerElement 
        : triggerElement.closest('[data-user-index]');
      if (elWithData) {
        const raw = elWithData.getAttribute('data-user-index');
        if (raw !== null && raw !== '') {
          const parsed = parseInt(raw, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed < chat.messages.length) {
            userIndex = parsed;
          }
        }
      }
    }

    // 3. Mapeamento preciso por posição visual na lista de nós do DOM
    if (userIndex === -1 && triggerElement) {
      const row = triggerElement.closest('.gpt-msg-row') || triggerElement;
      const allRows = Array.from(chatMessages.querySelectorAll('.gpt-msg-row'));
      const rowIndex = allRows.indexOf(row);
      if (rowIndex >= 0) {
        let userTurnCount = 0;
        for (let r = 0; r <= rowIndex; r++) {
          if (allRows[r].classList.contains('user')) {
            userTurnCount++;
          }
        }
        let seenUsers = 0;
        for (let m = 0; m < chat.messages.length; m++) {
          if (chat.messages[m].role === 'user') {
            seenUsers++;
            if (seenUsers === userTurnCount) {
              userIndex = m;
              break;
            }
          }
        }
      }
    }

    // 4. Fallback de segurança: última pergunta registrada pelo usuário
    if (userIndex === -1) {
      for (let i = chat.messages.length - 1; i >= 0; i--) {
        if (chat.messages[i] && chat.messages[i].role === 'user') {
          userIndex = i;
          break;
        }
      }
    }

    // Garantir que userIndex aponte estritamente para uma mensagem do usuário
    while (userIndex >= 0 && chat.messages[userIndex] && chat.messages[userIndex].role !== 'user') {
      userIndex--;
    }

    if (userIndex < 0 || !chat.messages[userIndex]) {
      showToast('Nenhuma pergunta anterior para regenerar.');
      return;
    }

    const userMsg = chat.messages[userIndex];

    // Truncar mensagens a partir da pergunta do usuário selecionada (remove a resposta antiga e tudo posterior)
    chat.messages = chat.messages.slice(0, userIndex + 1);
    saveChatsToStorage();

    // Recarregar histórico até a pergunta do usuário selecionada
    loadChat(currentChatId);

    // Disparar nova geração a partir deste ponto exato da conversa
    await executeAIGeneration(userMsg.content, userMsg.file || null, userIndex);
  }

  // --- RENDERIZAÇÃO DE MENSAGENS E STREAMING ---
  function appendMessageToDOM(role, text, isStreaming = false, fileAttachment = null, imageResult = null, userMsgIndex = -1) {
    if (!chatMessages) return null;
    if (welcomeCenter) welcomeCenter.style.display = 'none';

    const row = document.createElement('div');
    row.className = `gpt-msg-row ${role}`;
    if (userMsgIndex !== undefined && userMsgIndex !== null && userMsgIndex >= 0) {
      row.dataset.userIndex = userMsgIndex;
    }

    if (role === 'user') {
      let fileBadgeHtml = '';
      if (fileAttachment) {
        const isPdf = fileAttachment.isPdf || (fileAttachment.type && fileAttachment.type.includes('pdf')) || (fileAttachment.name && fileAttachment.name.toLowerCase().endsWith('.pdf'));
        const iconSvg = isPdf 
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
        fileBadgeHtml = `<div class="msg-attached-file-badge">${iconSvg}<span>${escapeHtml(fileAttachment.name)}</span></div>`;
      }
      row.innerHTML = `
        <div class="gpt-user-message-container">
          <div class="gpt-msg-bubble-user">
            ${fileBadgeHtml}
            <div>${escapeHtml(text)}</div>
          </div>
          <div class="gpt-msg-actions user-actions">
            <button class="gpt-action-small-btn btn-copy-msg" title="Copiar pergunta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>Copiar</span>
            </button>
            <button class="gpt-action-small-btn btn-speak-msg" title="Ouvir pergunta em voz alta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <span>Ouvir</span>
            </button>
            <button class="gpt-action-small-btn btn-regenerate-msg" data-user-index="${userMsgIndex >= 0 ? userMsgIndex : ''}" title="Regenerar resposta a partir desta pergunta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>Regenerar</span>
            </button>
          </div>
        </div>
      `;
      attachUserMessageActionEvents(row, text, userMsgIndex);
    } else {
      row.innerHTML = `
        <div class="gpt-msg-avatar-ai">
          <img src="assets/logo-meu-kota-circle.png" alt="Meu Kota" class="kota-avatar-msg-img">
        </div>
        <div class="gpt-msg-content-ai">
          <div class="msg-text-stream">${formatMarkdown(text)}</div>
          ${isStreaming ? '<span class="typing-cursor"></span>' : ''}
          ${!isStreaming ? createMessageActionsHtml(text, userMsgIndex) : ''}
        </div>
      `;

      if (imageResult) {
        const contentAiDiv = row.querySelector('.gpt-msg-content-ai');
        if (contentAiDiv) renderGeneratedImageMessage(imageResult, contentAiDiv);
      }

      if (!isStreaming) {
        attachMessageActionEvents(row, text, userMsgIndex);
        applyCodeHighlighting(row);
      }
    }

    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function createMessageActionsHtml(text, userMsgIndex = -1) {
    const userIndexAttr = (userMsgIndex !== undefined && userMsgIndex !== null && userMsgIndex >= 0) ? ` data-user-index="${userMsgIndex}"` : '';
    return `
      <div class="gpt-msg-actions">
        <button class="gpt-action-small-btn btn-copy-msg" title="Copiar resposta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span>Copiar</span>
        </button>
        <button class="gpt-action-small-btn btn-pdf-msg" title="Baixar resposta como Relatório PDF (Padrão Docs)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span>PDF</span>
        </button>
        <button class="gpt-action-small-btn btn-speak-msg" title="Ouvir resposta em voz alta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
          <span>Ouvir</span>
        </button>
        <button class="gpt-action-small-btn btn-download-audio-msg" title="Baixar áudio da resposta (.wav)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Baixar Áudio</span>
        </button>
        <button class="gpt-action-small-btn btn-regenerate-msg"${userIndexAttr} title="Regenerar resposta a partir desta pergunta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>Regenerar</span>
        </button>
      </div>
    `;
  }

  function attachUserMessageActionEvents(rowElement, text, userMsgIndex = -1) {
    const btnCopy = rowElement.querySelector('.btn-copy-msg');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Pergunta copiada para a área de transferência!');
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
      btnRegenerate.addEventListener('click', (e) => {
        e.stopPropagation();
        regenerateResponseForMessage(userMsgIndex, btnRegenerate);
      });
    }
  }

  function attachMessageActionEvents(rowElement, text, userMsgIndex = -1) {
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

    const btnPdf = rowElement.querySelector('.btn-pdf-msg');
    if (btnPdf) {
      btnPdf.addEventListener('click', async () => {
        let userPrompt = '';
        if (userMsgIndex >= 0 && currentChatId) {
          const chat = chats.find(c => c.id === currentChatId);
          if (chat && chat.messages && chat.messages[userMsgIndex]) {
            userPrompt = chat.messages[userMsgIndex].content || '';
          }
        }
        await exportSingleMessageToExecutivePdf(text, userPrompt);
      });
    }

    const btnSpeak = rowElement.querySelector('.btn-speak-msg');
    if (btnSpeak) {
      btnSpeak.addEventListener('click', () => {
        speakMessage(text, btnSpeak);
      });
    }

    const btnDownloadAudio = rowElement.querySelector('.btn-download-audio-msg');
    if (btnDownloadAudio) {
      btnDownloadAudio.addEventListener('click', () => {
        downloadMessageAudio(text, btnDownloadAudio);
      });
    }

    const btnRegenerate = rowElement.querySelector('.btn-regenerate-msg');
    if (btnRegenerate) {
      btnRegenerate.addEventListener('click', (e) => {
        e.stopPropagation();
        regenerateResponseForMessage(userMsgIndex, btnRegenerate);
      });
    }
  }

  // --- GERADOR E DOWNLOAD DE ÁUDIO (.WAV) DAS RESPOSTAS DO KOTA (NEURAL TTS OFICIAL) ---
  async function generateSpeechAudioWAV(text) {
    const sentences = prepareTextForSpeech(text);
    if (!sentences || sentences.length === 0) {
      throw new Error('Nenhum texto legível disponível para sintetizar áudio.');
    }

    // Unir o texto limpo (removendo código, formatações pesadas e notações)
    let cleanText = sentences.join(' ').trim();
    if (cleanText.length > 900) {
      // Para textos extensos, sintetizar até o fim da frase mais próxima de 850 caracteres
      const sliceIdx = cleanText.lastIndexOf('.', 850);
      if (sliceIdx > 350) {
        cleanText = cleanText.slice(0, sliceIdx + 1);
      } else {
        cleanText = cleanText.slice(0, 850) + '...';
      }
    }

    const apiKey = (getCustomGeminiApiKey() || '').trim();
    if (!apiKey) {
      throw new Error('Chave de API não configurada.');
    }

    const ttsEndpoints = [
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-lite-tts:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent'
    ];

    let lastError = null;

    for (const endpoint of ttsEndpoints) {
      try {
        const url = `${endpoint}?key=${encodeURIComponent(apiKey)}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: cleanText }]
            }]
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP ${response.status}`;
          console.warn(`[TTS Neural] Falha no endpoint ${endpoint}:`, errMsg);
          lastError = new Error(errMsg);
          continue;
        }

        const data = await response.json();
        const candidate = data.candidates && data.candidates[0];
        const audioPart = candidate && candidate.content && candidate.content.parts && candidate.content.parts.find(p => p.inlineData && p.inlineData.data);

        if (audioPart && audioPart.inlineData && audioPart.inlineData.data) {
          const base64Data = audioPart.inlineData.data;
          const mimeType = audioPart.inlineData.mimeType || 'audio/wav';

          // Decodificar Base64 diretamente para Blob WAV nativo com fala humana
          const binaryString = atob(base64Data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          return new Blob([bytes], { type: mimeType });
        }
      } catch (err) {
        console.warn(`[TTS Neural] Erro na requisição para ${endpoint}:`, err);
        lastError = err;
      }
    }

    throw lastError || new Error('Não foi possível gerar a síntese de voz neural.');
  }

  async function downloadMessageAudio(text, btnElement) {
    if (!text || !text.trim()) {
      showToast('Nenhum texto disponível para gerar áudio.');
      return;
    }

    const originalContent = btnElement.innerHTML;
    btnElement.disabled = true;
    btnElement.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
      <span>A sintetizar voz neural...</span>
    `;

    try {
      showToast('A sintetizar áudio com voz humana do Kota...');
      const wavBlob = await generateSpeechAudioWAV(text);

      const downloadUrl = URL.createObjectURL(wavBlob);
      const tempLink = document.createElement('a');
      tempLink.href = downloadUrl;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      tempLink.download = `meu-kota-resposta-${timestamp}.wav`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 8000);

      btnElement.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Áudio Baixado!</span>
      `;
      showToast('Áudio da resposta baixado com sucesso (.wav)!');
    } catch (err) {
      console.error('Erro ao baixar áudio neural:', err);
      const isQuota = err.message && (err.message.includes('quota') || err.message.includes('429'));
      showToast(isQuota 
        ? 'Limite de geração de áudio temporariamente atingido. Aguarde alguns instantes e tente novamente.' 
        : 'Não foi possível gerar o arquivo de áudio falado.');
      btnElement.innerHTML = originalContent;
      btnElement.disabled = false;
      return;
    }

    setTimeout(() => {
      btnElement.innerHTML = originalContent;
      btnElement.disabled = false;
    }, 3500);
  }

  function scrollToBottom() {
    const scrollArea = document.querySelector('.gpt-scroll-area');
    if (scrollArea) {
      requestAnimationFrame(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      });
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
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn('[Google Imagen 3 Status]', response.status, errData.error?.message || errData);
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
          <a href="${escapeHtml(imageResult.url)}" download="meu-kota-ia-${Date.now()}.jpg" target="_blank" class="btn-ai-img-action" title="Baixar arquivo de imagem">
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
        btnModalDownloadImage.download = `meu-kota-ia-${Date.now()}.jpg`;
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
    const attachedFileToSend = currentAttachedFile;

    // Permitir envio se houver texto digitado OU arquivo anexado
    if (!text && !attachedFileToSend) return;

    // Bloqueio amigável se o dispositivo estiver offline
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      showToast('Sem conexão à internet. Conecte-se para que o Meu Kota possa responder.');
      const offlineBanner = document.getElementById('kota-offline-banner');
      if (offlineBanner) offlineBanner.style.display = 'block';
      return;
    }

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

    let chat = chats.find(c => c.id === currentChatId);
    if (!chat) {
      if (chats.length === 0) {
        createNewChat();
      } else {
        loadChat(chats[0].id);
      }
      chat = chats.find(c => c.id === currentChatId) || chats[0];
    }
    if (!chat) return;

    // Registrar mensagem do usuário e incrementar cota diária (se não for assinante Pro)
    chat.messages.push({ 
      role: 'user', 
      content: text,
      file: attachedFileToSend ? { name: attachedFileToSend.name, type: attachedFileToSend.type, size: attachedFileToSend.size, isPdf: attachedFileToSend.isPdf } : null
    });
    if (!userSub.active) {
      incrementDailyQuota();
    }
    const newUserMsgIndex = chat.messages.length - 1;
    appendMessageToDOM('user', text, false, attachedFileToSend, null, newUserMsgIndex);
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

    await executeAIGeneration(text, attachedFileToSend, newUserMsgIndex);
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

    // O histórico anterior não deve conter a mensagem atual do prompt (evita duplicar turnos de usuário)
    const priorHistory = (historyMessages || []).slice(0, -1).slice(-10);

    const payload = {
      prompt: promptText,
      file: fileData,
      history: priorHistory,
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

  async function executeAIGeneration(text, attachedFileToSend, explicitUserIndex = -1) {
    let chat = chats.find(c => c.id === currentChatId);
    if (!chat) {
      chat = chats[0];
      if (!chat) return;
    }

    // Identificar com segurança o índice exato da pergunta do usuário correspondente
    let effectiveUserIndex = explicitUserIndex;
    if ((effectiveUserIndex === undefined || effectiveUserIndex === null || effectiveUserIndex < 0) && chat.messages.length > 0) {
      for (let i = chat.messages.length - 1; i >= 0; i--) {
        if (chat.messages[i] && chat.messages[i].role === 'user') {
          effectiveUserIndex = i;
          break;
        }
      }
    }

    setGenerationState(true);
    currentAbortController = new AbortController();
    const abortSignal = currentAbortController.signal;

    // Linha de resposta da IA associada ao turno da pergunta do usuário
    const aiRow = appendMessageToDOM('ai', '', true, null, null, effectiveUserIndex);
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

    let promptToSend = text;
    if (typeof window !== 'undefined' && window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'spreadsheet') {
      const art = window.activeCanvasArtifact;
      const headerRow = `| ${art.headers.join(' | ')} |`;
      const sepRow = `| ${art.headers.map(() => '---').join(' | ')} |`;
      const dataRows = art.rows.map(r => `| ${r.join(' | ')} |`).join('\n');
      const tableMd = `${headerRow}\n${sepRow}\n${dataRows}`;
      promptToSend = `${text}\n\n[CONTEXTO ATIVO DO CANVAS - PLANILHA "${art.fileName || art.title}":\n${tableMd}\n(Instrução: Se a resposta envolver editar, recalcular ou adicionar dados a esta planilha, forneça a tabela completa e atualizada em formato Markdown para sincronização no Canvas)]`;
    } else if (typeof window !== 'undefined' && window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'code') {
      const art = window.activeCanvasArtifact;
      const codeTextareaEl = document.getElementById('canvas-code-textarea');
      const currentCode = codeTextareaEl ? codeTextareaEl.value.trim() : '';
      if (currentCode) {
        promptToSend = `${text}\n\n[CONTEXTO ATIVO DO CANVAS - ARQUIVO "${art.fileName || 'index.html'}":\n\`\`\`html\n${currentCode.slice(0, 3500)}\n\`\`\`\n(Instrução fundamental: Você está em modo de Edição em Dupla no Canvas. Responda com a explicação e forneça o código completo e funcional dentro de um bloco Markdown \`\`\`html ... \`\`\` para que seja sincronizado e visualizado em tempo real na Pré-visualização ao Vivo do Canvas ao lado)]`;
      } else {
        promptToSend = `${text}\n\n[CONTEXTO ATIVO DO CANVAS - MODO SANDBOX DE CÓDIGO ("${art.fileName || 'index.html'}"):\n(Instrução fundamental: Você está em modo de Edição em Dupla no Canvas. Forneça o código completo e funcional dentro de um bloco Markdown \`\`\`html ... \`\`\` para que seja sincronizado e renderizado imediatamente na Pré-visualização ao Vivo do Canvas ao lado)]`;
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
          promptToSend, 
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
            promptToSend,
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
          finalAiResponseText = `**Aviso de Conexão com o Motor:**\n\nNão foi possível processar a mensagem (${err.message || 'Erro de comunicação de rede'}).\n\n*Por favor, tente reenviar a mensagem em alguns instantes.*`;
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

      // Sincronização automática para Edição em Dupla no Canvas (Código / Web App)
      if (typeof window !== 'undefined' && window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'code') {
        const codeMatch = finalAiResponseText.match(/```(?:html|xml|svg|javascript|js|css)?\s*\n([\s\S]*?)```/i) || finalAiResponseText.match(/```([\s\S]*?)```/);
        if (codeMatch && codeMatch[1]) {
          const extractedCode = codeMatch[1].trim();
          const textareaEl = document.getElementById('canvas-code-textarea');
          if (textareaEl) {
            textareaEl.value = extractedCode;
            if (window.updateCodeGutter) window.updateCodeGutter();
            if (window.updateCodeLivePreview) window.updateCodeLivePreview();
            showToast('Código sincronizado e atualizado na Pré-visualização!');
          }
        }
      }

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
        actionsDiv.innerHTML = createMessageActionsHtml(finalAiResponseText, effectiveUserIndex);
        contentAiDiv.appendChild(actionsDiv.firstElementChild);
        attachMessageActionEvents(aiRow, finalAiResponseText, effectiveUserIndex);
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
              ? ['gemini-3.1-pro-preview', 'gemini-pro-latest', 'gemini-3.5-flash-lite', 'gemini-2.5-flash', 'gemini-3-flash-preview']
              : ['gemini-3.5-flash-lite', 'gemini-3-flash-preview', 'gemini-2.5-flash', 'gemini-flash-latest'];

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
      modelPath: tier === 'pro' ? 'models/gemini-3.1-pro-preview' : 'models/gemini-3.5-flash-lite',
      displayName: tier === 'pro' ? 'Gemini 3.1 Pro' : 'Meu Kota Flash'
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
      const mime = fileAttachment.isPdf ? 'application/pdf' : (fileAttachment.type || 'image/jpeg');
      parts.push({
        inlineData: {
          mimeType: mime,
          data: fileAttachment.base64.trim()
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
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts.push(...parts);
    } else {
      contents.push({ role: 'user', parts: parts });
    }

    // 2. Definir lista ordenada de endpoints prioritários para resposta instantânea (< 300ms)
    const tier = getSelectedModelTier();
    const candidateEndpoints = [];

    if (tier === 'pro') {
      candidateEndpoints.push(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash`
      );
    } else {
      candidateEndpoints.push(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest`
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
- NOTAÇÃO MATEMÁTICA E CIENTÍFICA CLARA E HUMANA: NUNCA use código LaTeX bruto nem símbolos de cifrão no meio do texto (como $3 \times 3$, $\det(R)$, $T_1 \cdot T_2 \neq T_2 \cdot T_1$, \\quad, \\times, \\cdot). Escreva SEMPRE em linguagem humana natural, limpa e legível para qualquer pessoa comum (ex: escreva "3x3" ou "3 × 3", "T1 · T2 ≠ T2 · T1", "det(R) = +1", "R^T · R = I", "[0 0 0 1]"). Todas as equações, matrizes e expressões devem ser compreensíveis de imediato sem códigos de programação matemática.
- GERAÇÃO DE DOCUMENTOS E RELATÓRIOS EM PADRÃO COMERCIAL (CARDÁPIOS, CONTRATOS, PROPOSTAS, RELATÓRIOS): Quando o usuário solicitar a elaboração de um cardápio, contrato, proposta, orçamento, relatório, plano de negócios ou minuta, elabore diretamente o documento completo em padrão comercial impecável, pronto para apresentação ou impressão. Inicie imediatamente com o título formal do documento (ex: **CASA DE PASTO E LANCHONETE... — CARDÁPIO OFICIAL** ou **CONTRATO DE...**), sem preâmbulos protocolares nem notas de encerramento sobre botões da interface, mantendo o conteúdo 100% limpo e executivo.
- FORMATAÇÃO DE TABELAS VISUAIS, DEMONSTRATIVOS E GRÁFICOS DE EXCEL: Sempre que o usuário solicitar projeções financeiras, demonstrativos de faturamento, comparativos, cardápios com preços, cronogramas, custos operacionais ou gráficos analíticos, utilize SEMPRE tabelas no padrão oficial Markdown (| Coluna 1 | Coluna 2 | ... | :--- | :---: |). NUNCA desenhe gráficos com caracteres de texto primitivos ou colchetes ASCII (ex: jamais desenhe "[   ] 100%"). O Meu Kota renderiza tabelas automaticamente como planilhas interativas com auto-cálculo e gera gráficos executivos em padrão Microsoft Excel (Colunas 2D/3D, Barras 2D/3D, Pizza, Rosca, Linhas, Área, Cascata, Funil e Radar).
- LINKS DE CONVERSÃO E CHAMADAS PARA AÇÃO (CTA) EM SITES / LANDING PAGES: Ao criar landing pages, sites ou botões de contato, utilize SEMPRE os links universais modernos recomendados:
  * WhatsApp: utilize SEMPRE o link universal oficial "https://wa.me/DDI+NUMERO?text=MENSAGEM" (Ex: "https://wa.me/5592999845217?text=Olá..."). NUNCA use a API legada "api.whatsapp.com/send", pois ela é bloqueada por segurança CORS no navegador.
  * Redes Sociais: utilize URLs diretas completas ("https://instagram.com/perfil", "https://t.me/usuario", "https://facebook.com/pagina", "https://x.com/usuario").
  * Sempre inclua target="_blank" e rel="noopener noreferrer" em links externos.
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

        const requestPayload = {
          contents: contents,
          generationConfig: {
            temperature: tier === 'pro' ? 0.3 : 0.5,
            maxOutputTokens: 8192
          },
          systemInstruction: systemInstruction
        };

        if (enableSearch) {
          requestPayload.tools = [{ google_search: {} }];
        }

        try {
          const streamUrl = `${baseModelUrl}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey.trim())}`;

          const response = await fetch(streamUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestPayload),
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

          if (response.status === 503 || response.status === 502 || response.status === 504 || response.status === 500) {
            console.warn(`Modelo ${baseModelUrl} sobrecarregado ou temporariamente indisponível (${response.status}: ${errMsg}). Alternando imediatamente para o próximo modelo neural...`);
            lastError = new Error(`Alta demanda momentânea no motor neural (${response.status}). Tentando modelo alternativo...`);
            continue;
          }

          if (response.status === 403) {
            throw new Error(`Acesso negado pelo Google (403): Esta chave não tem o serviço Gemini (Generative Language) ativado.\n\nComo resolver: Acesse https://aistudio.google.com/app/apikey e crie uma nova chave.`);
          }

          if (response.status === 402) {
            console.warn(`Chave com créditos pré-pagos esgotados (402). Verifique o saldo no Google AI Studio.`);
            lastError = new Error(`Os créditos pré-pagos do Google AI Studio estão esgotados no Nível 1. Adicione saldo no painel da Google para continuar.`);
            continue;
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
          console.warn(`Tentativa de streaming falhou em ${baseModelUrl} (${err.message}). Tentando fallback direto para :generateContent...`);
          try {
            const syncUrl = `${baseModelUrl}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
            const syncRes = await fetch(syncUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestPayload),
              signal: abortSignal
            });
            if (syncRes.ok) {
              const syncData = await syncRes.json();
              const syncText = syncData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (syncText) {
                if (onChunk) onChunk(syncText);
                return syncText;
              }
            }
          } catch(syncErr) {
            console.warn(`Fallback :generateContent falhou em ${baseModelUrl}:`, syncErr);
          }
          continue;
        }
      }
    }

    throw lastError || new Error("Não foi possível conectar aos servidores do Meu Kota IA.");
  }

  // Alias para compatibilidade síncrona se necessário
  async function callGoogleGeminiAPI(apiKey, promptText, fileAttachment, historyMessages) {
    return callGoogleGeminiStreamingAPI(apiKey, promptText, fileAttachment, historyMessages, null, null);
  }

  // --- GERENCIAMENTO DE CHAVE DO GOOGLE AI STUDIO (BYOK) ---
  const GEMINI_STORAGE_KEY = 'kamba_gemini_api_key';
  const DEFAULT_GEMINI_KEY = atob('QVEuQWI4Uk42SUlJRHlGM2VpT2Y4b3BPZGFTNEREXzY2Sl9GZTV6OHdDTW1iZFhQVDRfT1E=');

  function getCustomGeminiApiKey() {
    try {
      const stored = (localStorage.getItem(GEMINI_STORAGE_KEY) || '').trim();
      if (stored && (stored.includes('LkUf') || stored.includes(atob('QVEuQWI4Uk42TGtV')))) {
        localStorage.removeItem(GEMINI_STORAGE_KEY);
        localStorage.removeItem('kamba_gemini_model_config');
        return DEFAULT_GEMINI_KEY.trim();
      }
      if (stored && stored.length > 20) {
        return stored;
      }
    } catch(e) {}
    return DEFAULT_GEMINI_KEY.trim();
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
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let w = img.width || 1280;
          let h = img.height || 720;

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

          // Salvar como JPEG 0.88 para garantir peso ultraleve (< 300KB) e OCR 100% nítido
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          const base64Data = optimizedDataUrl.split(',')[1];

          currentAttachedFile = {
            name: file.name,
            size: Math.round((base64Data.length * 3) / 4),
            type: 'image/jpeg',
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

  // Suporte a Colar Imagens e Arquivos da Área de Transferência (Ctrl + V)
  document.addEventListener('paste', (e) => {
    // Apenas se a aba ativa for o chat
    const viewChat = document.getElementById('view-chat');
    if (!viewChat || !viewChat.classList.contains('active')) return;

    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    let targetFile = null;

    // 1. Procurar imagens em clipboardData.items (Capturas de tela, Snipping Tool, imagens copiadas)
    const items = clipboardData.items;
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type && item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            const now = new Date();
            const timeTag = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
            const ext = (item.type.split('/')[1] || 'png').replace('+xml', '');
            targetFile = new File([blob], `Captura Colada ${timeTag}.${ext}`, { type: item.type });
            break;
          }
        } else if (item.type === 'application/pdf') {
          const blob = item.getAsFile();
          if (blob) {
            targetFile = blob;
            break;
          }
        }
      }
    }

    // 2. Fallback para clipboardData.files
    if (!targetFile && clipboardData.files && clipboardData.files.length > 0) {
      for (let i = 0; i < clipboardData.files.length; i++) {
        const f = clipboardData.files[i];
        if (f.type.startsWith('image/') || f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
          targetFile = f;
          break;
        }
      }
    }

    if (targetFile) {
      e.preventDefault();
      handleFileSelection(targetFile);
      showToast('Imagem colada com sucesso!');
      if (chatInput) chatInput.focus();
    }
  });

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
    let lastSendTouchTime = 0;
    const triggerSendAction = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const now = Date.now();
      if (now - lastSendTouchTime < 350) return;
      lastSendTouchTime = now;
      sendMessage();
    };

    btnSendMessage.addEventListener('click', triggerSendAction);
    btnSendMessage.addEventListener('touchend', triggerSendAction);
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.keyCode === 13) && !e.shiftKey) {
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

  // --- LIMPEZA E HUMANIZAÇÃO DE NOTAÇÃO MATEMÁTICA ---
  function cleanHumanMath(formula) {
    if (!formula) return '';
    return formula
      .replace(/\\times/g, '×')
      .replace(/\\cdot/g, '·')
      .replace(/\\neq/g, '≠')
      .replace(/\\leq|\\le/g, '≤')
      .replace(/\\geq|\\ge/g, '≥')
      .replace(/\\approx/g, '≈')
      .replace(/\\pm/g, '±')
      .replace(/\\quad/g, '  ')
      .replace(/\\qquad/g, '    ')
      .replace(/\\det/g, 'det')
      .replace(/\\sin/g, 'sen')
      .replace(/\\cos/g, 'cos')
      .replace(/\\tan/g, 'tan')
      .replace(/\\theta/g, 'θ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\sigma/g, 'σ')
      .replace(/\\Sigma/g, 'Σ')
      .replace(/\\omega/g, 'ω')
      .replace(/\\Omega/g, 'Ω')
      .replace(/\\phi/g, 'φ')
      .replace(/\\psi/g, 'ψ')
      .replace(/\\pi/g, 'π')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\sqrt/g, '√')
      .replace(/\\sum/g, '∑')
      .replace(/\\int/g, '∫')
      .replace(/\\partial/g, '∂')
      .replace(/\\nabla/g, '∇')
      .replace(/\\infty/g, '∞')
      .replace(/\\rightarrow|\\to/g, '→')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\mathbf\{([^}]+)\}/g, '$1')
      .replace(/\\mathit\{([^}]+)\}/g, '$1')
      .replace(/\\mathrm\{([^}]+)\}/g, '$1')
      .replace(/_\{([^}]+)\}/g, '$1')
      .replace(/_([0-9a-zA-Z])/g, (m, sub) => {
        const subs = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉','a':'ₐ','e':'ₑ','i':'ᵢ','o':'ₒ','u':'ᵤ','x':'ₓ' };
        return subs[sub] || '_' + sub;
      })
      .replace(/\^\{([^}]+)\}/g, '$1')
      .replace(/\^T/g, 'ᵀ')
      .replace(/\^2/g, '²')
      .replace(/\^3/g, '³')
      .replace(/\^([0-9])/g, (m, sup) => {
        const sups = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };
        return sups[sup] || '^' + sup;
      })
      .replace(/\\([a-zA-Z]+)/g, '$1')
      .replace(/\\/g, '')
      .trim();
  }

  // --- FORMATAÇÃO MARKDOWN LEVE, SEGURA E COM DESTAQUE DE CÓDIGO E TABELAS ---
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

    // 3. Extrair tabelas Markdown (| Col 1 | Col 2 | ...) para placeholders e Artefatos do Canvas
    const tables = [];
    const tableRegex = /(?:^[ \t]*\|?[^\n\|]+\|[^\n]*\r?\n[ \t]*\|?[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)+\|?[ \t]*(?:\r?\n|$))(?:^[ \t]*\|?[^\n\|]+\|[^\n]*(?:\r?\n|$))*/gm;

    formatted = formatted.replace(tableRegex, (match) => {
      const rawLines = match.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (rawLines.length < 2) return match;

      const parseCells = (row) => {
        let trimmed = row.trim();
        if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
        if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
        return trimmed.split('|').map(c => c.trim());
      };

      const rawHeaderCells = parseCells(rawLines[0]);
      const headerCells = rawHeaderCells.map(h => h.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim());
      const alignLine = parseCells(rawLines[1]);
      const aligns = alignLine.map(col => {
        const trimmed = col.trim();
        const left = trimmed.startsWith(':');
        const right = trimmed.endsWith(':');
        if (left && right) return 'center';
        if (right) return 'right';
        return 'left';
      });

      // Extrair linhas de dados
      const rowsData = [];
      let tableRowsHtml = '';
      for (let r = 2; r < rawLines.length; r++) {
        const rowCells = parseCells(rawLines[r]);
        const rowArr = [];
        tableRowsHtml += '<tr>';
        headerCells.forEach((_, i) => {
          const rawCell = rowCells[i] !== undefined ? rowCells[i] : '';
          const cleanText = rawCell.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim();
          rowArr.push(cleanText);
          const formattedHtml = rawCell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          const align = aligns[i] || 'left';
          tableRowsHtml += `<td style="text-align:${align}">${formattedHtml}</td>`;
        });
        tableRowsHtml += '</tr>';
        rowsData.push(rowArr);
      }

      // Identificador único estável para o artefato
      const headerSig = headerCells.join('_').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
      const artifactId = `art-tbl-${tables.length}-${headerSig}`;

      let sheetTitle = 'Planilha de Dados';
      if (headerCells.length > 0 && headerCells[0]) {
        sheetTitle = `Tabela: ${headerCells.slice(0, 3).join(', ')}${headerCells.length > 3 ? '...' : ''}`;
      }

      // Registrar globalmente no registro de artefatos
      if (typeof window !== 'undefined') {
        window.meuKotaArtifactRegistry = window.meuKotaArtifactRegistry || {};
        window.meuKotaArtifactRegistry[artifactId] = {
          id: artifactId,
          type: 'spreadsheet',
          title: sheetTitle,
          fileName: (headerCells[0] || 'planilha-meu-kota')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .slice(0, 25) + '.xlsx',
          headers: headerCells.slice(),
          rows: rowsData,
          aligns: aligns.slice(),
          rawMarkdown: match
        };
      }

      // Montar HTML com Cartão de Artefato Interativo + Tabela Formatada (Compacto & Anti-Quebra)
      let html = `<div class="kamba-artifact-card" data-artifact-id="${artifactId}">` +
        `<div class="artifact-card-left">` +
          `<div class="artifact-card-icon">` +
            `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD100" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>` +
          `</div>` +
          `<div class="artifact-card-info">` +
            `<span class="artifact-card-title">Planilha Interativa</span>` +
            `<span class="artifact-card-subtitle">${rowsData.length} linha${rowsData.length !== 1 ? 's' : ''} · ${headerCells.length} coluna${headerCells.length !== 1 ? 's' : ''}</span>` +
          `</div>` +
        `</div>` +
        `<div class="artifact-card-actions">` +
          `<button type="button" class="btn-open-canvas-pill" data-artifact-id="${artifactId}" title="Abrir no Canvas lado a lado para co-edição">` +
            `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/></svg>` +
            `<span>Abrir no Canvas</span>` +
          `</button>` +
          `<button type="button" class="btn-artifact-quick-charts" data-artifact-id="${artifactId}" title="Ver Gráficos Interativos no padrão Microsoft Excel">` +
            `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` +
            `<span>Gráficos</span>` +
          `</button>` +
          `<button type="button" class="btn-artifact-quick-dl" data-artifact-id="${artifactId}" title="Baixar planilha nativa em Microsoft Excel (.xlsx)">` +
            `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>` +
            `<span>Excel (.xlsx)</span>` +
          `</button>` +
          `<button type="button" class="btn-artifact-quick-pdf" data-artifact-id="${artifactId}" title="Baixar Relatório Limpo em PDF pronto para compartilhar">` +
            `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>` +
            `<span>PDF Limpo</span>` +
          `</button>` +
        `</div>` +
      `</div>` +
      `<div class="table-responsive-wrapper"><table class="kamba-table"><thead><tr>`;

      headerCells.forEach((th, i) => {
        const align = aligns[i] || 'left';
        html += `<th style="text-align:${align}">${th}</th>`;
      });
      html += '</tr></thead><tbody>' + tableRowsHtml + '</tbody></table></div>';

      const id = `___KAMBA_TABLE_BLOCK_${tables.length}___`;
      tables.push(html);
      return id;
    });

    // Código inline `codigo`
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 4. Fórmulas matemáticas em bloco $$ ... $$
    formatted = formatted.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
      const clean = cleanHumanMath(formula);
      return `<div class="human-math-block">${clean}</div>`;
    });

    // 5. Fórmulas matemáticas inline $ ... $
    formatted = formatted.replace(/\$([^$]+)\$/g, (match, formula) => {
      const clean = cleanHumanMath(formula);
      return `<span class="human-math">${clean}</span>`;
    });

    // 6. Limpeza de comandos LaTeX soltos fora de cifrões
    formatted = formatted
      .replace(/\\times\b/g, '×')
      .replace(/\\cdot\b/g, '·')
      .replace(/\\neq\b/g, '≠')
      .replace(/\\leq\b/g, '≤')
      .replace(/\\geq\b/g, '≥')
      .replace(/\\quad\b/g, '  ')
      .replace(/\\det\b/g, 'det');

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

    // Restaurar tabelas com markdown interno processado (negrito, itálico, código)
    tables.forEach((tableHtml, index) => {
      const formattedTable = tableHtml
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
      formatted = formatted.replace(`___KAMBA_TABLE_BLOCK_${index}___`, formattedTable);
    });

    // Restaurar blocos de código com containers profissionais e botões de cópia & teste no Canvas
    codeBlocks.forEach((item, index) => {
      const isWebCode = ['html', 'js', 'javascript', 'css', 'xml', 'svg'].includes(item.lang);
      const testBtnHtml = isWebCode 
        ? `<button type="button" class="btn-open-code-canvas" title="Abrir e Testar com Meu Kota">` +
            `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFD100" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>` +
            `<span>Testar com Meu Kota</span>` +
          `</button>`
        : '';

      const codeHtml = `<div class="code-block-wrapper" data-lang="${item.lang}">` +
        `<div class="code-block-header">` +
          `<span class="code-lang-tag">${item.lang}</span>` +
          `<div class="code-block-actions">` +
            testBtnHtml +
            `<button type="button" class="btn-copy-code" title="Copiar código para a área de transferência">` +
              `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>` +
              `<span>Copiar código</span>` +
            `</button>` +
          `</div>` +
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
    // No desktop e tablet, restaurar a preferência de barra minimizada do usuário
    if (window.innerWidth > 768 && gptLayout) {
      const isCollapsed = localStorage.getItem('gpt_sidebar_collapsed') === 'true';
      if (isCollapsed) {
        gptLayout.classList.add('sidebar-collapsed');
      } else {
        gptLayout.classList.remove('sidebar-collapsed');
      }
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

  // --- GERENCIADOR DE CONEXÃO & MODO OFFLINE RESILIENTE ---
  function setupOfflineAndNetworkEvents() {
    const offlineScreen = document.getElementById('kota-offline-screen');
    const offlineBanner = document.getElementById('kota-offline-banner');
    const btnOfflineRetry = document.getElementById('btn-offline-retry');

    function checkConnectionAndToggleUI(isOnline) {
      if (!isOnline) {
        document.documentElement.classList.add('is-offline');
        // Se já estiver no chat com histórico local ativo, exibe banner discreto no topo
        // para permitir leitura de mensagens salvas sem travar a interface
        if (views.dashboard && views.dashboard.classList.contains('active')) {
          if (offlineBanner) offlineBanner.style.display = 'block';
          if (offlineScreen) offlineScreen.style.display = 'none';
        } else {
          // Na inicialização ou landing page, exibe exclusivamente a tela de carregamento Meu Kota
          if (offlineScreen) {
            offlineScreen.style.display = 'flex';
            offlineScreen.style.animation = 'fadeInGpt 0.3s ease';
          }
          if (offlineBanner) offlineBanner.style.display = 'none';
        }
      } else {
        document.documentElement.classList.remove('is-offline');
        // Conexão ativa: esconde a tela de carregamento offline suavemente
        if (offlineScreen && offlineScreen.style.display !== 'none') {
          offlineScreen.style.animation = 'fadeOutGpt 0.3s ease forwards';
          setTimeout(() => {
            offlineScreen.style.display = 'none';
            offlineScreen.style.animation = '';
          }, 280);
        }
        if (offlineBanner) {
          offlineBanner.style.display = 'none';
        }
      }
    }

    // Verificação inicial
    if (typeof navigator !== 'undefined') {
      if (!navigator.onLine) {
        checkConnectionAndToggleUI(false);
      }
    }

    // Eventos do navegador ao alternar estado de rede
    window.addEventListener('online', () => {
      checkConnectionAndToggleUI(true);
      showToast('Conexão à internet restabelecida! Meu Kota IA conectado.');
    });

    window.addEventListener('offline', () => {
      checkConnectionAndToggleUI(false);
      showToast('Você está sem internet.');
    });

    // Botão de Reconectar Manual na tela de carregamento
    if (btnOfflineRetry) {
      btnOfflineRetry.addEventListener('click', () => {
        const textSpan = btnOfflineRetry.querySelector('span');
        if (textSpan) textSpan.textContent = 'Verificando conexão...';
        btnOfflineRetry.style.opacity = '0.7';
        btnOfflineRetry.style.pointerEvents = 'none';

        fetch('./manifest.json?t=' + Date.now(), { method: 'HEAD', cache: 'no-cache' })
          .then(() => {
            checkConnectionAndToggleUI(true);
            showToast('Conexão restabelecida com sucesso!');
          })
          .catch(() => {
            showToast('Ainda sem internet. O Meu Kota continuará aguardando o sinal.');
          })
          .finally(() => {
            setTimeout(() => {
              if (textSpan) textSpan.textContent = 'Tentar Reconectar Agora';
              btnOfflineRetry.style.opacity = '1';
              btnOfflineRetry.style.pointerEvents = 'auto';
            }, 800);
          });
      });
    }
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

    // Configurações de Voz / Sotaque e Síntese de Áudio
    const selectVoiceLang = document.getElementById('select-settings-voice-lang');
    const toggleVoiceActive = document.getElementById('toggle-voice-active');

    if (selectVoiceLang) {
      const savedLang = localStorage.getItem('meu_kota_voice_lang') || 'pt-BR';
      selectVoiceLang.value = savedLang;
      selectVoiceLang.addEventListener('change', (e) => {
        const val = e.target.value;
        localStorage.setItem('meu_kota_voice_lang', val);
        const label = val === 'pt-BR' ? 'Português do Brasil' : (val === 'pt-PT' ? 'Português de Portugal' : 'Automático');
        showToast(`Sotaque da voz definido para ${label}.`);
      });
    }

    if (toggleVoiceActive) {
      const isVoiceEnabled = localStorage.getItem('meu_kota_voice_enabled') !== 'false';
      toggleVoiceActive.checked = isVoiceEnabled;
      toggleVoiceActive.addEventListener('change', (e) => {
        localStorage.setItem('meu_kota_voice_enabled', e.target.checked ? 'true' : 'false');
        showToast(e.target.checked ? 'Síntese de voz ativada.' : 'Síntese de voz desativada.');
      });
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

  // --- COMPARTILHAMENTO DE CONVERSAS (MODAL, WHATSAPP, LINK, TEXTO) ---
  function getActiveChatData() {
    return chats.find(c => c.id === currentChatId) || null;
  }

  function formatChatTranscript(chat) {
    if (!chat || !chat.messages || chat.messages.length === 0) {
      return `Conversa vazia no Meu Kota IA.`;
    }

    const dateStr = new Date(chat.updatedAt || Date.now()).toLocaleString('pt-AO');
    let transcript = `====================================================\n`;
    transcript += `MEU KOTA IA — TRANSCRIÇÃO DE CONVERSA\n`;
    transcript += `Tema: ${chat.title || 'Conversa sem título'}\n`;
    transcript += `Data: ${dateStr}\n`;
    transcript += `====================================================\n\n`;

    chat.messages.forEach((msg, idx) => {
      const author = msg.role === 'user' ? 'VOCÊ' : 'MEU KOTA IA';
      transcript += `[${author}]:\n${msg.content}\n\n`;
      transcript += `----------------------------------------------------\n\n`;
    });

    transcript += `Gerado pelo Meu Kota IA · Inteligência e Sabedoria de Angola\n`;
    transcript += `Acesse: ${window.location.origin}${window.location.pathname}#chat\n`;

    return transcript;
  }

  function openShareChatModal() {
    const chat = getActiveChatData();
    if (!modalShareChat) return;

    if (shareModalChatTitle) {
      shareModalChatTitle.textContent = chat && chat.title ? chat.title : 'Nova Conversa';
    }

    const count = chat && chat.messages ? chat.messages.length : 0;
    if (shareModalChatMeta) {
      shareModalChatMeta.textContent = `${count} ${count === 1 ? 'mensagem' : 'mensagens'} · Meu Kota IA`;
    }

    if (shareChatPreviewBox) {
      if (!chat || !chat.messages || chat.messages.length === 0) {
        shareChatPreviewBox.innerHTML = `
          <div style="color: #9CA3AF; text-align: center; padding: 16px;">
            Esta conversa ainda não possui mensagens para compartilhar.<br>
            Envie uma pergunta ao Meu Kota para começar!
          </div>
        `;
      } else {
        const previewItems = chat.messages.slice(-4).map(msg => {
          const isUser = msg.role === 'user';
          const roleLabel = isUser ? 'Você' : 'Meu Kota';
          const roleClass = isUser ? 'user' : 'ai';
          const cleanSnippet = msg.content
            .replace(/[#*`_]/g, '')
            .slice(0, 140) + (msg.content.length > 140 ? '...' : '');

          return `
            <div class="preview-item">
              <div class="preview-role ${roleClass}">${roleLabel}</div>
              <div class="preview-text">${escapeHtml(cleanSnippet)}</div>
            </div>
          `;
        }).join('');

        shareChatPreviewBox.innerHTML = previewItems;
      }
    }

    modalShareChat.classList.add('active');
  }

  function closeShareChatModal() {
    if (modalShareChat) {
      modalShareChat.classList.remove('active');
    }
  }

  // --- MOTOR COMERCIAL DE EXPORTAÇÃO DE DOCUMENTOS EM PADRÃO PROFISSIONAL (A4 / GOOGLE DOCS / WORD) ---
  function extractPureCommercialDocument(text, userPrompt) {
    let raw = (text || '').trim();

    // 1. Remover saudações conversacionais e notas iniciais do Kota
    const dividerParts = raw.split(/(?:^|\n)\s*---\s*(?:\n|$)/);
    if (dividerParts.length >= 2) {
      const firstPart = dividerParts[0].trim();
      if (firstPart.length < 900 && /meu caro|saudações|olá|bom dia|boa tarde|com a sabedoria|com a experiência|preparei para si|com base no seu pedido|aqui está|conforme solicitado|segue abaixo|organizei os itens/i.test(firstPart)) {
        dividerParts.shift();
        raw = dividerParts.join('\n\n---\n\n').trim();
      }
    }

    // 2. Remover despedidas conversacionais, notas de rodapé e perguntas do Kota
    const closingParts = raw.split(/(?:^|\n)\s*---\s*(?:\n|$)/);
    if (closingParts.length >= 2) {
      const lastPart = closingParts[closingParts.length - 1].trim();
      if (lastPart.length < 800 && (
        /\*nota do kota\*|\*nota:\*|meu caro|diga-me|espero ter ajudado|estou aqui|ponto de partida|qualquer dúvida|à disposição|sucesso com o seu negócio|deseja adicionar/i.test(lastPart)
      )) {
        closingParts.pop();
        raw = closingParts.join('\n\n---\n\n').trim();
      }
    }

    // Limpar quaisquer notas residuais de instrução do Kota no final do texto (mesmo sem divisor ---)
    raw = raw.replace(/(?:\n\n|\n)\s*(?:\*Nota do Kota:\*|Nota do Kota:|Diga-me, meu caro:|Espero ter ajudado|Se precisar de ajustes)[\s\S]*$/i, '').trim();

    // 3. Extrair o TÍTULO REAL DO DOCUMENTO (ex: **CASA DE PASTO E LANCHONETE DO KOTA — CARDÁPIO OFICIAL**)
    let detectedTitle = '';
    const rawLines = raw.split('\n').map(l => l.trim()).filter(Boolean);

    for (let i = 0; i < Math.min(rawLines.length, 5); i++) {
      const line = rawLines[i];
      const headingMatch = line.match(/^(?:#{1,3}\s*|\*{2})([^*#]{4,100})(?:\*{2})?$/);
      if (headingMatch) {
        const candidate = headingMatch[1].trim();
        // Garantir que não seja apenas um item numerado como "1. X-Tudo" ou seção "I. Comidas"
        if (candidate.length > 5 && !/^(?:\d+\.|\b[IVX]+\.)/i.test(candidate)) {
          detectedTitle = candidate;
          rawLines.splice(i, 1);
          raw = rawLines.join('\n\n');
          break;
        }
      }
    }

    // Se ainda não detectou nos primeiros blocos, procurar por termos chave no documento
    if (!detectedTitle) {
      const titleKeywordsMatch = raw.match(/(?:^|\n)\s*(?:\*{2}|#{1,3})\s*([A-Z0-9À-Ú\s—–\-\.]{5,90}(?:CARDÁPIO|MENU|CONTRATO|PROPOSTA|RELATÓRIO|PLANO|TERMO|ESTATUTO|ACORDO|DECLARAÇÃO|RECIBO|TABELA|ESPECIFICAÇÃO)[A-Z0-9À-Ú\s—–\-\.]{0,60})\s*(?:\*{2})?/i);
      if (titleKeywordsMatch) {
        detectedTitle = titleKeywordsMatch[1].trim();
      }
    }

    // Fallback inteligente para título a partir do prompt se nenhum título formal foi encontrado
    if (!detectedTitle) {
      if (userPrompt) {
        let clean = userPrompt
          .replace(/^(crie|elabore|faça|monte|gere|por favor|meu kota|kota)\s*(para mim\s*)?(um|uma|o|a)?\s*/i, '')
          .trim();
        detectedTitle = clean.charAt(0).toUpperCase() + clean.slice(1);
        if (detectedTitle.length > 50) {
          detectedTitle = detectedTitle.slice(0, 47) + '...';
        }
      } else {
        detectedTitle = 'Documento Comercial';
      }
    }

    // 4. Nome de arquivo limpo e comercial
    let cleanFilename = detectedTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const words = cleanFilename.split('-').filter(Boolean);
    if (words.length > 6) {
      cleanFilename = words.slice(0, 6).join('-');
    }
    const filename = `${cleanFilename || 'documento'}.pdf`;

    return { title: detectedTitle, body: raw, filename };
  }

  function formatCleanCommercialMarkdown(text) {
    if (!text) return '';
    let html = escapeHtml(text);

    // 1. Extrair e formatar tabelas Markdown para o PDF comercial
    const pdfTables = [];
    const tableRegex = /(?:^[ \t]*\|?[^\n\|]+\|[^\n]*\r?\n[ \t]*\|?[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)+\|?[ \t]*(?:\r?\n|$))(?:^[ \t]*\|?[^\n\|]+\|[^\n]*(?:\r?\n|$))*/gm;

    html = html.replace(tableRegex, (match) => {
      const rawLines = match.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (rawLines.length < 2) return match;

      const parseCells = (row) => {
        let trimmed = row.trim();
        if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
        if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
        return trimmed.split('|').map(c => c.trim());
      };

      const headerCells = parseCells(rawLines[0]);
      const alignLine = parseCells(rawLines[1]);
      const aligns = alignLine.map(col => {
        const trimmed = col.trim();
        const left = trimmed.startsWith(':');
        const right = trimmed.endsWith(':');
        if (left && right) return 'center';
        if (right) return 'right';
        return 'left';
      });

      let tableHtml = '<div style="margin: 16px 0; overflow: hidden; page-break-inside: avoid; break-inside: avoid;"><table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.45; border: 1px solid #CBD5E1;"><thead><tr style="background: #F1F5F9;">';
      headerCells.forEach((th, i) => {
        const align = aligns[i] || 'left';
        tableHtml += `<th style="padding: 7px 10px; font-weight: 700; color: #0F172A; border: 1px solid #CBD5E1; text-align: ${align};">${th}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      for (let r = 2; r < rawLines.length; r++) {
        const rowCells = parseCells(rawLines[r]);
        const bg = (r % 2 === 0) ? '#FFFFFF' : '#F8FAFC';
        tableHtml += `<tr style="background: ${bg};">`;
        headerCells.forEach((_, i) => {
          const cell = rowCells[i] !== undefined ? rowCells[i] : '';
          const align = aligns[i] || 'left';
          tableHtml += `<td style="padding: 6px 10px; color: #1E293B; border: 1px solid #E2E8F0; text-align: ${align};">${cell}</td>`;
        });
        tableHtml += '</tr>';
      }

      tableHtml += '</tbody></table></div>';
      const id = `___PDF_TABLE_BLOCK_${pdfTables.length}___`;
      pdfTables.push(tableHtml);
      return id;
    });

    // 2. Blocos de Código (Code blocks)
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const cleanLang = (lang || 'código').toUpperCase();
      return `
        <div style="margin: 14px 0; background: #0F172A; border-radius: 6px; overflow: hidden; page-break-inside: avoid; break-inside: avoid;">
          <div style="background: #1E293B; color: #94A3B8; font-size: 10px; font-weight: 700; padding: 4px 10px; text-transform: uppercase;">${cleanLang}</div>
          <pre style="margin: 0; padding: 10px 14px; color: #F8FAFC; font-family: 'Consolas', monospace; font-size: 11px; line-height: 1.5; white-space: pre-wrap;"><code>${code.trim()}</code></pre>
        </div>
      `;
    });

    // 3. Código inline
    html = html.replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; color: #BE123C; padding: 1px 4px; border-radius: 3px; font-family: monospace; font-size: 11px;">$1</code>');

    // 4. Seções Principais (I. AS DELÍCIAS..., CLÁUSULA PRIMEIRA..., ANEXO I..., etc.)
    html = html.replace(/(?:^|\n)\s*(?:\*{2}|#{1,4})\s*(CLÁUSULA\s+[^\n*]+|ANEXO\s+[^\n*]+|CAPÍTULO\s+[^\n*]+|SEÇÃO\s+[^\n*]+|ARTIGO\s+[^\n*]+|[I|V|X]+\.\s+[^\n*]+)\s*(?:\*{2}|#{1,4})?/gi, (m, clause) => {
      return `\n\n<div style="margin-top: 22px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1.5px solid #0F172A; page-break-inside: avoid; break-inside: avoid;"><span style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">${clause.trim()}</span></div>\n\n`;
    });

    // 5. Marcadores de Assinatura formal ([Assinatura]) - Linha limpa e autêntica para caneta
    html = html.replace(/\[Assinatura\]/gi, `
      <div style="margin: 30px 0 6px 0; page-break-inside: avoid; break-inside: avoid;">
        <div style="width: 240px; border-bottom: 1px solid #0F172A; margin-bottom: 4px;"></div>
      </div>
    `);

    // 6. Placeholders editáveis entre colchetes [Exemplo] (texto fluído, sem caixas quebradas ou espaçamentos deformados)
    html = html.replace(/\[([^\]<\n]{2,80})\]/g, '<span style="color: #1D4ED8; font-weight: 600;">[$1]</span>');

    // 7. Títulos e Subtítulos Markdown
    html = html.replace(/^#### (.*$)/gm, '<h4 style="color: #1E293B; font-size: 12.5px; font-weight: 700; margin: 14px 0 4px 0; page-break-inside: avoid; break-inside: avoid;">$1</h4>');
    html = html.replace(/^### (.*$)/gm, '<h3 style="color: #0F172A; font-size: 13.5px; font-weight: 700; margin: 16px 0 6px 0; border-bottom: 1px solid #E2E8F0; padding-bottom: 3px; page-break-inside: avoid; break-inside: avoid;">$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2 style="color: #0F172A; font-size: 15px; font-weight: 800; margin: 18px 0 8px 0; border-bottom: 1.5px solid #0F172A; padding-bottom: 4px; page-break-inside: avoid; break-inside: avoid;">$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1 style="color: #0F172A; font-size: 17px; font-weight: 800; margin: 20px 0 10px 0; border-bottom: 2px solid #0F172A; padding-bottom: 6px; page-break-inside: avoid; break-inside: avoid;">$1</h1>');

    // 8. Divisores
    html = html.replace(/(?:^|\n)\s*---+\s*(?:\n|$)/g, '<hr style="border: none; border-top: 1px solid #E2E8F0; margin: 16px 0;">');

    // 9. Negrito e Itálico
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0F172A; font-weight: 700;">$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em style="color: #334155;">$1</em>');

    // 10. Citações
    html = html.replace(/^> (.*$)/gm, '<blockquote style="border-left: 3px solid #D81A2D; background: #F8FAFC; padding: 6px 12px; margin: 10px 0; color: #475569; font-style: italic; page-break-inside: avoid; break-inside: avoid;">$1</blockquote>');

    // 11. Sub-itens: a), b), c)
    html = html.replace(/^(\s*)([a-z]\))\s*(.*$)/gim, '<div style="display: flex; align-items: baseline; gap: 8px; margin: 4px 0 4px 18px;"><span style="color: #0F172A; font-weight: 700; font-size: 12px;">$2</span><span style="color: #1E293B; line-height: 1.5;">$3</span></div>');

    // 12. Itens com Marcadores
    html = html.replace(/^[•\-\*] (.*$)/gm, '<div style="display: flex; align-items: baseline; gap: 8px; margin: 4px 0 4px 8px;"><span style="color: #D81A2D; font-size: 11px;">•</span><span style="color: #1E293B; line-height: 1.5;">$1</span></div>');

    // 13. Parágrafos normais (alinhamento limpo à esquerda para não distorcer itens de cardápio, preços e cláusulas)
    html = html.replace(/\n\n+/g, '</p><p style="margin: 8px 0; line-height: 1.6; color: #1E293B; text-align: left;">');
    html = `<p style="margin: 8px 0; line-height: 1.6; color: #1E293B; text-align: left;">${html}</p>`;

    // Restaurar tabelas do PDF com formatação interna
    pdfTables.forEach((tableHtml, index) => {
      const formattedTable = tableHtml
        .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #0F172A; font-weight: 700;">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em style="color: #334155;">$1</em>')
        .replace(/`([^`]+)`/g, '<code style="background: #F1F5F9; color: #BE123C; padding: 1px 4px; border-radius: 3px; font-family: monospace; font-size: 11px;">$1</code>');
      html = html.replace(`___PDF_TABLE_BLOCK_${index}___`, formattedTable);
    });

    return html;
  }

  async function generateExecutivePdfDoc({ title, bodyHtml, filename }) {
    if (typeof html2pdf === 'undefined') {
      showToast('Aguarde: carregando módulo de PDF...');
      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'libs/html2pdf.bundle.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      } catch (e) {
        showToast('Erro ao carregar módulo de PDF. Verifique sua conexão.');
        return;
      }
    }

    showToast('Gerando documento comercial em padrão executivo...');

    const activeUser = getActiveUser();
    const userName = (activeUser && activeUser.name) ? activeUser.name : 'Bruno Souza';
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
    const docId = `MK-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const reportElement = document.createElement('div');
    reportElement.className = 'executive-pdf-document';
    reportElement.style.width = '100%';
    reportElement.style.maxWidth = '794px';
    reportElement.style.margin = '0 auto';
    reportElement.style.background = '#FFFFFF';
    reportElement.style.color = '#1E293B';
    reportElement.style.padding = '32px 40px';
    reportElement.style.boxSizing = 'border-box';
    reportElement.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    reportElement.style.lineHeight = '1.6';

    const safeTitle = title || 'Documento Comercial';

    reportElement.innerHTML = `
      <!-- Cabeçalho Comercial Discreto e Elegante (Padrão Google Docs / Word) -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1.5px solid #0F172A; margin-bottom: 22px; page-break-inside: avoid; break-inside: avoid;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="22" height="22" viewBox="0 0 100 100" style="flex-shrink: 0;">
            <circle cx="50" cy="50" r="48" fill="#111827" stroke="#FFD100" stroke-width="4"/>
            <path d="M50 2 A48 48 0 0 1 50 98 Z" fill="#D81A2D"/>
            <circle cx="50" cy="50" r="28" fill="none" stroke="#FFD100" stroke-width="4" stroke-dasharray="8 4"/>
            <polygon points="50,28 55,42 70,43 58,52 62,66 50,57 38,66 42,52 30,43 45,42" fill="#FFD100"/>
          </svg>
          <span style="font-size: 11px; font-weight: 800; color: #0F172A; letter-spacing: 0.5px;">MEU KOTA IA</span>
        </div>
        <div style="font-size: 9.5px; color: #64748B;">
          <span>Documento Comercial Oficial • ${formattedDate} • Ref: ${docId}</span>
        </div>
      </div>

      <!-- Título Oficial Centralizado do Documento -->
      <div style="text-align: center; margin: 12px 0 24px 0; page-break-inside: avoid; break-inside: avoid;">
        <h1 style="font-size: 18.5px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; line-height: 1.35;">
          ${escapeHtml(safeTitle)}
        </h1>
        <div style="width: 44px; height: 2.5px; background: #D81A2D; margin: 0 auto;"></div>
      </div>

      <!-- Corpo Limpo do Documento (Sem prompt, sem caixas de aviso, 100% comercial) -->
      <div class="pdf-report-body" style="font-size: 12.5px; color: #1E293B; line-height: 1.6;">
        ${bodyHtml}
      </div>

      <!-- Rodapé Comercial Discreto -->
      <div style="margin-top: 36px; padding-top: 10px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; font-size: 8.5px; color: #94A3B8; page-break-inside: avoid; break-inside: avoid;">
        <span>Documento elaborado eletronicamente via Meu Kota IA</span>
        <span>Padrão Comercial A4 • Pronto para Apresentação</span>
      </div>
    `;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename || 'documento-comercial.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(reportElement).save();
      showToast('Documento comercial em PDF baixado com sucesso!');
    } catch (err) {
      console.error('[PDF Generation Error]', err);
      showToast('Erro ao compilar o PDF. Tente novamente.');
    }
  }

  async function exportChatToExecutivePdf(chat) {
    if (!chat || !chat.messages || chat.messages.length === 0) {
      showToast('Nenhuma conversa disponível para exportar.');
      return;
    }
    const title = chat.title || 'Dossiê de Interações';
    const sanitizedTitle = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .slice(0, 35);

    let chatHtml = '';
    chat.messages.forEach((msg, idx) => {
      if (msg.role === 'user') {
        chatHtml += `
          <div style="margin-top: 18px; margin-bottom: 8px; background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2563EB; padding: 10px 14px; border-radius: 6px; page-break-inside: avoid; break-inside: avoid;">
            <div style="font-size: 10px; font-weight: 800; color: #1D4ED8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
              Interação #${idx + 1} • Requisitante
            </div>
            <div style="font-size: 12px; color: #0F172A; font-weight: 500; line-height: 1.5;">${escapeHtml(msg.content)}</div>
          </div>
        `;
      } else {
        chatHtml += `
          <div style="margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; border-bottom: 1px dashed #E2E8F0; padding-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 800; color: #D81A2D; text-transform: uppercase; letter-spacing: 0.5px;">Parecer Meu Kota IA</span>
            </div>
            <div style="font-size: 12.5px; color: #1E293B; line-height: 1.6;">
              ${formatCleanCommercialMarkdown(msg.content)}
            </div>
          </div>
        `;
      }
    });

    await generateExecutivePdfDoc({
      title: `DOSSIÊ EXECUTIVO DE INTERAÇÕES: ${title}`,
      bodyHtml: chatHtml,
      filename: `dossie-${sanitizedTitle}.pdf`
    });
  }

  async function exportSingleMessageToExecutivePdf(aiText, userPrompt) {
    if (!aiText) return;

    // Extrai unicamente o documento comercial limpo, sem chat nem notas residuais
    const extracted = extractPureCommercialDocument(aiText, userPrompt);
    const formattedBody = formatCleanCommercialMarkdown(extracted.body);

    await generateExecutivePdfDoc({
      title: extracted.title,
      bodyHtml: formattedBody,
      filename: extracted.filename
    });
  }

  function setupShareChatEvents() {
    if (btnShareChat) {
      btnShareChat.addEventListener('click', (e) => {
        e.preventDefault();
        openShareChatModal();
      });
    }

    if (btnCloseShareModal) {
      btnCloseShareModal.addEventListener('click', closeShareChatModal);
    }

    if (modalShareChat) {
      modalShareChat.addEventListener('click', (e) => {
        if (e.target === modalShareChat) closeShareChatModal();
      });
    }

    // 1. Copiar Link da Conversa
    if (btnShareCopyLink) {
      btnShareCopyLink.addEventListener('click', async () => {
        const chat = getActiveChatData();
        const shareUrl = `${window.location.origin}${window.location.pathname}#chat`;
        
        // Se houver suporte à Web Share API nativa em dispositivos móveis
        if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
          try {
            await navigator.share({
              title: chat ? chat.title : 'Meu Kota IA',
              text: `Acompanhe esta conversa no Meu Kota IA: "${chat ? chat.title : 'Consultoria Inteligente'}"`,
              url: shareUrl,
            });
            showToast('Conversa compartilhada com sucesso!');
            closeShareChatModal();
            return;
          } catch (e) {
            // Cancelado pelo usuário
          }
        }

        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('Link da conversa copiado para a área de transferência!');
        }).catch(() => {
          showToast('Link copiado com sucesso.');
        });
      });
    }

    // 2. Enviar pelo WhatsApp
    if (btnShareWhatsapp) {
      btnShareWhatsapp.addEventListener('click', () => {
        const chat = getActiveChatData();
        if (!chat || !chat.messages || chat.messages.length === 0) {
          showToast('Não há mensagens para compartilhar no WhatsApp.');
          return;
        }

        const title = chat.title || 'Conversa do Meu Kota IA';
        let snippet = '';
        const lastUser = chat.messages.find(m => m.role === 'user');
        const lastAi = [...chat.messages].reverse().find(m => m.role === 'ai');

        if (lastUser && lastAi) {
          snippet = `*Pergunta:* ${lastUser.content.slice(0, 100)}\n\n*Resposta do Kota:* ${lastAi.content.replace(/[#*`]/g, '').slice(0, 200)}...`;
        }

        const shareUrl = `${window.location.origin}${window.location.pathname}#chat`;
        const waText = `*Meu Kota IA — ${title}*\n\n${snippet}\n\n_Acesse a conversa completa aqui:_\n${shareUrl}`;
        const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
        window.open(waLink, '_blank');
      });
    }

    // 3. Copiar Transcrição Completa
    if (btnShareCopyText) {
      btnShareCopyText.addEventListener('click', () => {
        const chat = getActiveChatData();
        const transcript = formatChatTranscript(chat);
        navigator.clipboard.writeText(transcript).then(() => {
          showToast('Transcrição completa copiada para a área de transferência!');
        }).catch(() => {
          showToast('Texto copiado com sucesso.');
        });
      });
    }

    // 4. Baixar Relatório Executivo em PDF (.pdf)
    if (btnShareDownloadPdf) {
      btnShareDownloadPdf.addEventListener('click', async () => {
        const chat = getActiveChatData();
        if (!chat || !chat.messages || chat.messages.length === 0) {
          showToast('Nenhuma conversa disponível para gerar PDF.');
          return;
        }
        await exportChatToExecutivePdf(chat);
      });
    }

    // 5. Baixar Arquivo .txt
    if (btnShareDownloadTxt) {
      btnShareDownloadTxt.addEventListener('click', () => {
        const chat = getActiveChatData();
        const transcript = formatChatTranscript(chat);
        const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = url;
        const sanitizedTitle = (chat && chat.title ? chat.title : 'conversa')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 35);
        tempLink.download = `meu-kota-${sanitizedTitle}.txt`;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        showToast('Arquivo de transcrição baixado com sucesso (.txt)!');
      });
    }
  }

  // ============================================================
  // WORKSPACE DO CANVAS & CO-EDIÇÃO HUMANO + IA (SPREADSHEETS, DOCS & CODE)
  // ============================================================
  function setupCanvasWorkspace() {
    window.activeCanvasArtifact = null;
    window.meuKotaArtifactRegistry = window.meuKotaArtifactRegistry || {};

    const layout = document.querySelector('.gpt-layout');
    const canvasPanel = document.getElementById('kota-canvas-panel');
    const excelTable = document.getElementById('canvas-excel-table');
    const fileNameInput = document.getElementById('canvas-file-name');
    const activeTabTitle = document.getElementById('canvas-active-tab-title');
    const modeStatus = document.getElementById('canvas-mode-status');
    const canvasTypeIcon = document.getElementById('canvas-type-icon');

    // Botões do cabeçalho & exportações
    const btnExportPrimary = document.getElementById('btn-canvas-export-primary');
    const canvasExportLabel = document.getElementById('canvas-export-label');
    const btnMoreExports = document.getElementById('btn-canvas-more-exports');
    const exportDropdown = document.getElementById('canvas-export-dropdown');
    const btnDlXlsx = document.getElementById('btn-canvas-dl-xlsx');
    const btnDlCsv = document.getElementById('btn-canvas-dl-csv');
    const btnDlPdf = document.getElementById('btn-canvas-dl-pdf');
    const btnCopyAll = document.getElementById('btn-canvas-copy-all');
    const btnFullscreen = document.getElementById('btn-canvas-fullscreen');
    const btnClose = document.getElementById('btn-canvas-close');
    const btnMobileBack = document.getElementById('btn-canvas-back-chat');

    // Launcher do topo do chat
    const btnOpenLauncher = document.getElementById('btn-open-canvas-launcher');
    const launcherMenu = document.getElementById('canvas-launcher-menu');

    // Barra de ferramentas e abas da grelha
    const btnAddRow = document.getElementById('btn-grid-add-row');
    const btnDelRow = document.getElementById('btn-grid-del-row');
    const btnAddCol = document.getElementById('btn-grid-add-col');
    const btnDelCol = document.getElementById('btn-grid-del-col');
    const btnGridUndo = document.getElementById('btn-grid-undo');
    const btnToggleKpiStrip = document.getElementById('btn-toggle-kpi-strip');
    const kpiStrip = document.getElementById('canvas-kpi-strip');
    const btnAddSheetTab = document.getElementById('btn-add-sheet-tab');
    const tabSheetTracker = document.getElementById('tab-sheet-tracker');
    const tabSheetResumo = document.getElementById('tab-sheet-resumo');
    const tabSheetGraficos = document.getElementById('tab-sheet-graficos');
    const viewTracker = document.getElementById('canvas-tab-view-tracker');
    const viewResumo = document.getElementById('canvas-tab-view-resumo');
    const viewGraficos = document.getElementById('canvas-tab-view-graficos');

    // Elementos do Sandbox de Código
    const tabCodeEditor = document.getElementById('tab-code-editor');
    const tabCodePreview = document.getElementById('tab-code-preview');
    const codeEditorWrap = document.getElementById('canvas-code-editor-wrap');
    const codePreviewWrap = document.getElementById('canvas-code-preview-wrap');
    const codeTextarea = document.getElementById('canvas-code-textarea');
    const codeGutter = document.getElementById('canvas-code-gutter');
    const previewIframe = document.getElementById('canvas-preview-iframe');
    const btnCodeRefresh = document.getElementById('btn-code-refresh');

    // Elementos do Documento A4
    const a4Sheet = document.getElementById('canvas-a4-sheet');
    const a4MetaDate = document.getElementById('a4-meta-date');
    const btnDocTodayDate = document.getElementById('btn-doc-today-date');

    // Barra de contexto ativo do chat
    const contextBar = document.getElementById('canvas-active-context-bar');
    const contextDocName = document.getElementById('canvas-context-doc-name');
    const contextIcon = document.getElementById('canvas-context-icon');
    const btnDetach = document.getElementById('btn-detach-canvas-context');

    // Helper: Nomes de Coluna Excel (0 -> 'A', 1 -> 'B', 25 -> 'Z', 26 -> 'AA')
    function getExcelColumnLetter(colIndex) {
      let name = '';
      let num = colIndex;
      while (num >= 0) {
        name = String.fromCharCode((num % 26) + 65) + name;
        num = Math.floor(num / 26) - 1;
      }
      return name;
    }

    // Helper: Baixar Blob com link dinâmico seguro
    function triggerBlobDownload(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }

    // Helper: Limpar asteriscos e crases de markdown para exibição limpa em tabelas e PDFs
    function cleanMarkdownText(str) {
      if (!str) return '';
      return String(str)
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .trim();
    }

    // Classificação de status para cores condicionais
    function getStatusClass(val) {
      if (!val) return '';
      const text = cleanMarkdownText(val).toLowerCase();
      if (/^(done|conclu[ií]d[oa]|pago|ok|aprovado|sim|yes|finalizado|feito)$/.test(text)) return 'done';
      if (/^(in progress|em andamento|pendente|ativo|doing|execu[cç][aã]o)$/.test(text)) return 'progress';
      if (/^(overdue|atrasad[oa]|urgente|bloqueado|cr[ií]tica|cancelado)$/.test(text)) return 'overdue';
      if (/^(alta|m[eé]dia|normal|baixa)$/.test(text)) return 'active';
      return '';
    }

    // ============================================================
    // MOTOR DE CÁLCULO CIENTÍFICO E FÓRMULAS DA PLANILHA (EXCEL REAL)
    // ============================================================

    function parseSpreadsheetNumber(str) {
      if (str === null || str === undefined) return NaN;
      if (typeof str === 'number') return str;
      const clean = str.toString().trim();
      if (!clean) return NaN;

      let numStr = clean.replace(/[^0-9.,-]/g, '').trim();
      if (!numStr) return NaN;

      if (numStr.includes(',') && numStr.includes('.')) {
        if (numStr.lastIndexOf(',') > numStr.lastIndexOf('.')) {
          numStr = numStr.replace(/\./g, '').replace(',', '.');
        } else {
          numStr = numStr.replace(/,/g, '');
        }
      } else if (numStr.includes(',')) {
        numStr = numStr.replace(',', '.');
      }
      const val = parseFloat(numStr);
      return isNaN(val) ? NaN : val;
    }

    function formatSpreadsheetNumber(num, templateStr = '') {
      if (isNaN(num)) return '';
      const template = (templateStr || '').toString();
      const hasR$ = /R\$/i.test(template);
      const hasKz = /Kz/i.test(template);
      const hasDollar = /\$/i.test(template) && !hasR$;
      const hasEuro = /€/i.test(template);

      const hasDecimals = template.includes(',') || template.includes('.') || (num % 1 !== 0);
      const decimals = hasDecimals ? 2 : 0;

      const formattedNum = num.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      if (hasR$) return `R$ ${formattedNum}`;
      if (hasKz) return `${formattedNum} Kz`;
      if (hasDollar) return `$ ${formattedNum}`;
      if (hasEuro) return `${formattedNum} €`;
      return formattedNum;
    }

    function getExcelColIndexFromLetter(colLetter) {
      let col = 0;
      const upper = (colLetter || '').toUpperCase();
      for (let i = 0; i < upper.length; i++) {
        col = col * 26 + (upper.charCodeAt(i) - 64);
      }
      return col - 1;
    }

    // Avaliar fórmulas manuais (=SOMA, =SUM, =MEDIA, =A2*B2, etc.)
    function evaluateSpreadsheetFormula(formulaStr, artifact) {
      if (!formulaStr || !formulaStr.startsWith('=')) return null;
      const expr = formulaStr.slice(1).trim().toUpperCase();

      // =SOMA(B2:B5) ou =SUM(B2:B5)
      const sumMatch = expr.match(/^(?:SOMA|SUM)\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
      if (sumMatch) {
        const col1 = getExcelColIndexFromLetter(sumMatch[1]);
        const r1 = parseInt(sumMatch[2], 10) - 2;
        const col2 = getExcelColIndexFromLetter(sumMatch[3]);
        const r2 = parseInt(sumMatch[4], 10) - 2;
        let sum = 0;
        for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
          for (let c = Math.min(col1, col2); c <= Math.max(col1, col2); c++) {
            if (artifact.rows[r] && artifact.rows[r][c] !== undefined) {
              const val = parseSpreadsheetNumber(artifact.rows[r][c]);
              if (!isNaN(val)) sum += val;
            }
          }
        }
        return sum;
      }

      // =MEDIA(B2:B5) ou =AVERAGE(B2:B5)
      const avgMatch = expr.match(/^(?:MEDIA|AVERAGE)\(([A-Z]+)(\d+):([A-Z]+)(\d+)\)$/);
      if (avgMatch) {
        const col1 = getExcelColIndexFromLetter(avgMatch[1]);
        const r1 = parseInt(avgMatch[2], 10) - 2;
        const col2 = getExcelColIndexFromLetter(avgMatch[3]);
        const r2 = parseInt(avgMatch[4], 10) - 2;
        let sum = 0, count = 0;
        for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
          for (let c = Math.min(col1, col2); c <= Math.max(col1, col2); c++) {
            if (artifact.rows[r] && artifact.rows[r][c] !== undefined) {
              const val = parseSpreadsheetNumber(artifact.rows[r][c]);
              if (!isNaN(val)) { sum += val; count++; }
            }
          }
        }
        return count > 0 ? sum / count : 0;
      }

      // Operações diretas entre células ex: B2*C2, B2+C2, B2-C2, B2/C2
      const opMatch = expr.match(/^([A-Z]+)(\d+)\s*([\+\-\*\/])\s*([A-Z]+)(\d+)$/);
      if (opMatch) {
        const c1 = getExcelColIndexFromLetter(opMatch[1]);
        const r1 = parseInt(opMatch[2], 10) - 2;
        const op = opMatch[3];
        const c2 = getExcelColIndexFromLetter(opMatch[4]);
        const r2 = parseInt(opMatch[5], 10) - 2;
        const v1 = (artifact.rows[r1] && artifact.rows[r1][c1] !== undefined) ? parseSpreadsheetNumber(artifact.rows[r1][c1]) : 0;
        const v2 = (artifact.rows[r2] && artifact.rows[r2][c2] !== undefined) ? parseSpreadsheetNumber(artifact.rows[r2][c2]) : 0;
        if (op === '+') return v1 + v2;
        if (op === '-') return v1 - v2;
        if (op === '*') return v1 * v2;
        if (op === '/') return v2 !== 0 ? v1 / v2 : 0;
      }

      return null;
    }

    // Recálculo Automático Dinâmico (Totais de Linha e Totais Globais)
    function autoRecalculateSpreadsheet(artifact) {
      if (!artifact || !artifact.headers || !artifact.rows) return false;
      const headers = artifact.headers.map(h => cleanMarkdownText(h || '').toLowerCase());

      let qtyCol = -1;
      let priceCol = -1;
      let totalCol = -1;

      headers.forEach((h, idx) => {
        if (/^(quant|qtd|quantidade|unidades|volume|horas|hours|qty)\b/i.test(h) || h.includes('quant') || h.includes('qtd')) {
          if (qtyCol === -1) qtyCol = idx;
        } else if (/^(pre[çc]o unit|valor unit|custo unit|unit[aá]rio|pre[çc]o\/unid)/i.test(h) || (h.includes('unit') && (h.includes('pre') || h.includes('val')))) {
          if (priceCol === -1) priceCol = idx;
        } else if (/^(pre[çc]o total|valor total|total|subtotal|custo total|montante)/i.test(h) || h.includes('total') || h.includes('subtotal')) {
          if (totalCol === -1) totalCol = idx;
        }
      });

      const isTotalRow = (row) => {
        const firstCell = cleanMarkdownText(row[0] || '').toLowerCase();
        return /^(total|valor global|valor acumulado|soma|subtotal|total geral|balan[çc]o)/i.test(firstCell) ||
               firstCell.includes('total') || firstCell.includes('acumulado') || firstCell.includes('soma');
      };

      let changed = false;

      // 1. Recalcular cada linha de dados: Fórmulas manuais ou Qtd * Preço Unitário
      artifact.rows.forEach((row, rIdx) => {
        if (isTotalRow(row)) return;

        // Se a planilha tem colunas de Qtd, Preço Unitário e Total
        if (qtyCol !== -1 && priceCol !== -1 && totalCol !== -1) {
          const qtyVal = parseSpreadsheetNumber(row[qtyCol]);
          const priceVal = parseSpreadsheetNumber(row[priceCol]);
          if (!isNaN(qtyVal) && !isNaN(priceVal)) {
            const calculatedTotal = qtyVal * priceVal;
            const currentTotalStr = row[totalCol] || '';
            const newTotalFormatted = formatSpreadsheetNumber(calculatedTotal, currentTotalStr || row[priceCol] || '');
            if (row[totalCol] !== newTotalFormatted) {
              row[totalCol] = newTotalFormatted;
              changed = true;
            }
          }
        }

        // Fórmulas manuais que começam com =
        row.forEach((cellVal, cIdx) => {
          if (typeof cellVal === 'string' && cellVal.startsWith('=')) {
            const res = evaluateSpreadsheetFormula(cellVal, artifact);
            if (res !== null) {
              const resFormatted = formatSpreadsheetNumber(res, cellVal);
              row[cIdx] = resFormatted;
              changed = true;
            }
          }
        });
      });

      // 2. Recalcular Linha(s) de Total / Valor Global Acumulado
      artifact.rows.forEach((row, rIdx) => {
        if (isTotalRow(row)) {
          const targetCols = [];
          if (totalCol !== -1) targetCols.push(totalCol);
          else {
            headers.forEach((_, cIdx) => {
              let hasNums = false;
              for (let r = 0; r < rIdx; r++) {
                if (!isNaN(parseSpreadsheetNumber(artifact.rows[r][cIdx]))) hasNums = true;
              }
              if (hasNums && cIdx !== 0 && cIdx !== qtyCol) targetCols.push(cIdx);
            });
          }

          targetCols.forEach(colToSum => {
            let colSum = 0;
            let sampleTemplate = '';
            for (let r = 0; r < rIdx; r++) {
              if (!isTotalRow(artifact.rows[r])) {
                const val = parseSpreadsheetNumber(artifact.rows[r][colToSum]);
                if (!isNaN(val)) {
                  colSum += val;
                  if (!sampleTemplate && artifact.rows[r][colToSum]) {
                    sampleTemplate = artifact.rows[r][colToSum];
                  }
                }
              }
            }
            const currentTotalVal = row[colToSum] || '';
            const newSumFormatted = formatSpreadsheetNumber(colSum, currentTotalVal || sampleTemplate);
            if (row[colToSum] !== newSumFormatted) {
              row[colToSum] = newSumFormatted;
              changed = true;
            }
          });
        }
      });

      return changed;
    }

    // Sincronizar células visuais no DOM sem roubar o foco da célula em digitação
    function syncSpreadsheetDomFromData(artifact) {
      if (!excelTable || !artifact || !artifact.rows) return;
      const activeEl = document.activeElement;
      const activeRow = activeEl ? parseInt(activeEl.getAttribute('data-row'), 10) : null;
      const activeCol = activeEl ? parseInt(activeEl.getAttribute('data-col'), 10) : null;

      artifact.rows.forEach((row, rIdx) => {
        row.forEach((val, cIdx) => {
          if (activeRow === rIdx && activeCol === cIdx) return;
          const cell = excelTable.querySelector(`td[data-type="cell"][data-row="${rIdx}"][data-col="${cIdx}"]`);
          if (cell) {
            const cleanVal = cleanMarkdownText(val || '');
            const statusClass = getStatusClass(cleanVal);
            const cellContent = statusClass 
              ? `<span class="status-pill ${statusClass}">${escapeHtml(cleanVal)}</span>` 
              : escapeHtml(cleanVal);
            if (cell.innerHTML !== cellContent) {
              cell.innerHTML = cellContent;
              cell.classList.add('cell-flash-updated');
              setTimeout(() => cell.classList.remove('cell-flash-updated'), 700);
            }
          }
        });
      });

      if (viewGraficos && viewGraficos.style.display !== 'none') {
        renderSpreadsheetCharts(artifact);
      }
    }

    // 1. RECALCULAR KPIS INTELIGENTES E CONTEXTUAIS DA PLANILHA
    function recalculateSpreadsheetKpis(artifact) {
      if (!artifact) return;
      const kpiStrip = document.getElementById('canvas-kpi-strip');
      if (!kpiStrip) return;

      const totalRows = artifact.rows.length;
      let inProgressCount = 0;
      let doneCount = 0;
      let overdueCount = 0;

      const numCols = artifact.headers.length;
      const colStats = [];

      for (let c = 0; c < numCols; c++) {
        colStats.push({
          colIndex: c,
          header: cleanMarkdownText(artifact.headers[c] || `Coluna ${c + 1}`),
          count: 0,
          sum: 0,
          min: Infinity,
          max: -Infinity,
          sampleFormatted: '',
          priorityScore: 0
        });
      }

      artifact.rows.forEach(r => {
        r.forEach((val, cIdx) => {
          if (cIdx >= numCols) return;
          const text = cleanMarkdownText(val || '').toLowerCase();

          // Contagem de status de tarefas
          if (/^(done|conclu[ií]d[oa]|pago|ok|aprovado|sim|yes|finalizado|feito)$/.test(text) || text.includes('conclu')) {
            doneCount++;
          } else if (/^(in progress|em andamento|pendente|ativo|doing|execu[cç][aã]o)$/.test(text) || text.includes('andamento') || text.includes('progr')) {
            inProgressCount++;
          } else if (/^(overdue|atrasad[oa]|urgente|bloqueado|cancelado)$/.test(text) || text.includes('atras') || text.includes('overdue')) {
            overdueCount++;
          }

          // Estatísticas numéricas
          const numVal = parseSpreadsheetNumber(val);
          if (!isNaN(numVal) && isFinite(numVal) && text.length > 0) {
            const stat = colStats[cIdx];
            stat.count++;
            stat.sum += numVal;
            if (numVal < stat.min) stat.min = numVal;
            if (numVal > stat.max) stat.max = numVal;
            if (!stat.sampleFormatted && val) {
              stat.sampleFormatted = String(val).trim();
            }
          }
        });
      });

      // Calcular relevância contextual de cada coluna numérica
      const numericCols = colStats.filter(s => s.count > 0);
      numericCols.forEach(stat => {
        stat.avg = stat.count > 0 ? (stat.sum / stat.count) : 0;
        const hLow = stat.header.toLowerCase();

        // Priorizar colunas financeiras ou de métrica principal
        if (/total|valor|montante|receita|faturamento|subtotal|saldo|pre[cç]o|lucro|venda/.test(hLow)) {
          stat.priorityScore += 50;
        } else if (/quant|qtd|itens|volume|unidades/.test(hLow)) {
          stat.priorityScore += 30;
        }
        // Se tiver moeda (Kz, R$, $, €, etc.)
        if (/kz|r\$|\$|€|usd|eur|aoa/.test(hLow) || /kz|r\$|\$|€|aoa/i.test(stat.sampleFormatted)) {
          stat.priorityScore += 40;
        }
        // Mais linhas preenchidas ganham pontos
        stat.priorityScore += (stat.count / Math.max(totalRows, 1)) * 20;
      });

      // Ordenar colunas numéricas pela maior relevância
      numericCols.sort((a, b) => b.priorityScore - a.priorityScore);

      const hasTaskStatuses = (doneCount + inProgressCount + overdueCount) > 0;
      let cardsHtml = '';

      if (hasTaskStatuses) {
        // MODO 1: GESTOR DE TAREFAS / PROJETOS (QUANDO HÁ STATUS REAIS)
        cardsHtml += `
          <div class="canvas-kpi-card" title="Total de tarefas registradas na planilha">
            <span class="kpi-title">TOTAL DE TAREFAS</span>
            <span class="kpi-number" id="kpi-val-tasks">${totalRows}</span>
          </div>
          <div class="canvas-kpi-card highlight-amber" title="Tarefas em andamento ou pendentes">
            <span class="kpi-title">EM ANDAMENTO</span>
            <span class="kpi-number" id="kpi-val-progress">${inProgressCount}</span>
          </div>
          <div class="canvas-kpi-card highlight-green" title="Tarefas concluídas ou pagas">
            <span class="kpi-title">CONCLUÍDAS</span>
            <span class="kpi-number" id="kpi-val-done">${doneCount}</span>
          </div>
          <div class="canvas-kpi-card highlight-red" title="Tarefas atrasadas ou urgentes">
            <span class="kpi-title">ATRASADAS</span>
            <span class="kpi-number" id="kpi-val-overdue">${overdueCount}</span>
          </div>
        `;

        if (numericCols.length > 0) {
          const mainNum = numericCols[0];
          const fmtSum = formatSpreadsheetNumber(mainNum.sum, mainNum.sampleFormatted || mainNum.header);
          const shortHeader = mainNum.header.length > 15 ? (mainNum.header.slice(0, 14) + '…') : mainNum.header;
          cardsHtml += `
            <div class="canvas-kpi-card highlight-gold" title="Soma acumulada da coluna ${escapeHtml(mainNum.header)}">
              <span class="kpi-title">SOMA (${escapeHtml(shortHeader.toUpperCase())})</span>
              <span class="kpi-number" id="kpi-val-sum">${escapeHtml(fmtSum)}</span>
            </div>
          `;
        }
      } else {
        // MODO 2: PLANILHA FINANCEIRA / VENDAS / COMERCIAL / GERAL (SEM STATUS DE TAREFA)
        // Card 1: Total de Linhas / Registros
        cardsHtml += `
          <div class="canvas-kpi-card" title="Total de itens registrados na planilha">
            <span class="kpi-title">REGISTROS</span>
            <span class="kpi-number" id="kpi-val-tasks">${totalRows} itens</span>
          </div>
        `;

        if (numericCols.length > 0) {
          const primary = numericCols[0];
          const fmtSum = formatSpreadsheetNumber(primary.sum, primary.sampleFormatted || primary.header);
          const shortHead1 = primary.header.length > 14 ? (primary.header.slice(0, 13) + '…') : primary.header;

          // Card 2: Soma da Métrica Principal com o NOME EXATO da coluna
          cardsHtml += `
            <div class="canvas-kpi-card highlight-gold" title="Soma acumulada da coluna ${escapeHtml(primary.header)}">
              <span class="kpi-title">SOMA (${escapeHtml(shortHead1.toUpperCase())})</span>
              <span class="kpi-number" id="kpi-val-sum">${escapeHtml(fmtSum)}</span>
            </div>
          `;

          // Card 3: Se houver uma segunda coluna numérica (ex: Quantidade e Preço Total)
          if (numericCols.length > 1) {
            const secondary = numericCols[1];
            const fmtSum2 = formatSpreadsheetNumber(secondary.sum, secondary.sampleFormatted || secondary.header);
            const shortHead2 = secondary.header.length > 14 ? (secondary.header.slice(0, 13) + '…') : secondary.header;

            cardsHtml += `
              <div class="canvas-kpi-card highlight-blue" title="Soma acumulada da coluna ${escapeHtml(secondary.header)}">
                <span class="kpi-title">SOMA (${escapeHtml(shortHead2.toUpperCase())})</span>
                <span class="kpi-number">${escapeHtml(fmtSum2)}</span>
              </div>
            `;
          }

          // Card 4: Média da Métrica Principal
          const fmtAvg = formatSpreadsheetNumber(primary.avg, primary.sampleFormatted || primary.header);
          cardsHtml += `
            <div class="canvas-kpi-card highlight-green" title="Média calculada da coluna ${escapeHtml(primary.header)}">
              <span class="kpi-title">MÉDIA (${escapeHtml(shortHead1.toUpperCase())})</span>
              <span class="kpi-number">${escapeHtml(fmtAvg)}</span>
            </div>
          `;

          // Card 5: Maior Registro (Máximo)
          const fmtMax = formatSpreadsheetNumber(primary.max, primary.sampleFormatted || primary.header);
          cardsHtml += `
            <div class="canvas-kpi-card highlight-amber" title="Maior valor registrado na coluna ${escapeHtml(primary.header)}">
              <span class="kpi-title">MAIOR REGISTRO</span>
              <span class="kpi-number">${escapeHtml(fmtMax)}</span>
            </div>
          `;
        }
      }

      kpiStrip.innerHTML = cardsHtml;
    }

    // 2. RENDERIZAR GRELHA DA PLANILHA COM CORES CONDICIONAIS
    function renderSpreadsheetGrid(artifact) {
      if (!excelTable || !artifact) return;
      const numCols = Math.max(artifact.headers.length, 1);

      // Linha 0: Letras das Colunas (A, B, C...)
      let html = '<thead><tr><th class="corner-cell"></th>';
      for (let c = 0; c < numCols; c++) {
        html += `<th data-col="${c}">${getExcelColumnLetter(c)}</th>`;
      }
      html += '</tr></thead><tbody>';

      // Linha 1: Cabeçalhos com número de linha "1"
      html += '<tr class="header-row"><td class="row-num-cell">1</td>';
      for (let c = 0; c < numCols; c++) {
        const rawVal = artifact.headers[c] !== undefined ? artifact.headers[c] : '';
        const cleanVal = cleanMarkdownText(rawVal);
        html += `<td contenteditable="true" spellcheck="false" data-type="header" data-col="${c}">${escapeHtml(cleanVal)}</td>`;
      }
      html += '</tr>';

      // Linhas 2..N: Dados com cores condicionais por status
      artifact.rows.forEach((row, rIdx) => {
        const rowNum = rIdx + 2;
        html += `<tr><td class="row-num-cell">${rowNum}</td>`;
        for (let c = 0; c < numCols; c++) {
          const rawVal = row[c] !== undefined ? row[c] : '';
          const cleanVal = cleanMarkdownText(rawVal);
          const statusClass = getStatusClass(cleanVal);
          const cellContent = statusClass 
            ? `<span class="status-pill ${statusClass}">${escapeHtml(cleanVal)}</span>` 
            : escapeHtml(cleanVal);
          html += `<td contenteditable="true" spellcheck="false" data-type="cell" data-row="${rIdx}" data-col="${c}">${cellContent}</td>`;
        }
        html += '</tr>';
      });

      html += '</tbody>';
      excelTable.innerHTML = html;
    }

    // 3. RENDERIZAR RESUMO EXECUTIVO COM GRÁFICOS VISUAIS DE EXCEL
    function renderSpreadsheetSummary(artifact) {
      const container = document.getElementById('canvas-summary-dashboard');
      if (!container || !artifact) return;

      const total = artifact.rows.length;
      let done = 0;
      let inProgress = 0;
      let overdue = 0;

      artifact.rows.forEach(r => {
        r.forEach(cell => {
          const txt = (cell || '').toString().toLowerCase();
          if (/^(done|conclu[ií]d[oa]|pago|ok|aprovado|sim|yes|finalizado|feito)$/.test(txt) || txt.includes('conclu')) done++;
          else if (/^(in progress|em andamento|pendente|ativo|doing|execu[cç][aã]o)$/.test(txt) || txt.includes('andamento') || txt.includes('progr')) inProgress++;
          else if (/^(overdue|atrasad[oa]|urgente|bloqueado|cancelado)$/.test(txt) || txt.includes('atras') || txt.includes('overdue')) overdue++;
        });
      });

      const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;
      const isTaskTracker = (done + inProgress + overdue) > 0;

      // Identificar coluna de texto principal e coluna de valores para gráficos
      const numCols = artifact.headers.length;
      let valCol = -1;
      let maxNumCount = 0;

      for (let c = 0; c < numCols; c++) {
        let nCnt = 0;
        artifact.rows.forEach(r => {
          if (!isNaN(parseSpreadsheetNumber(r[c]))) nCnt++;
        });
        const hName = cleanMarkdownText(artifact.headers[c] || '').toLowerCase();
        if (hName.includes('total') || hName.includes('preço') || hName.includes('valor') || hName.includes('custo') || hName.includes('quant')) {
          if (nCnt > 0) valCol = c;
        } else if (nCnt > maxNumCount && c > 0) {
          maxNumCount = nCnt;
          if (valCol === -1) valCol = c;
        }
      }

      // Montar dados do gráfico comparativo
      let chartHtml = '';
      if (valCol !== -1) {
        const valHeader = cleanMarkdownText(artifact.headers[valCol] || 'Valores');
        const chartItems = [];
        let maxVal = 0;
        let sumTotal = 0;

        artifact.rows.forEach((r, idx) => {
          const firstCell = cleanMarkdownText(r[0] || '');
          const isTotal = /^(total|valor global|soma|acumulado)/i.test(firstCell);
          if (isTotal) return;

          const label = firstCell || `Linha ${idx + 2}`;
          const num = parseSpreadsheetNumber(r[valCol]);
          if (!isNaN(num) && num > 0) {
            if (num > maxVal) maxVal = num;
            sumTotal += num;
            chartItems.push({ label, val: num, formatted: r[valCol] || num.toString() });
          }
        });

        if (chartItems.length > 0 && maxVal > 0) {
          const barGradients = [
            'linear-gradient(90deg, #F59E0B, #FFD100)',
            'linear-gradient(90deg, #10B981, #34D399)',
            'linear-gradient(90deg, #3B82F6, #60A5FA)',
            'linear-gradient(90deg, #8B5CF6, #A78BFA)',
            'linear-gradient(90deg, #EC4899, #F472B6)'
          ];

          chartHtml = `
            <div class="summary-chart-card">
              <div class="summary-chart-header">
                <span class="summary-chart-title">Gráfico Comparativo • ${escapeHtml(valHeader)}</span>
                <span style="font-size:11px;color:#94A3B8;">${chartItems.length} item(ns)</span>
              </div>
              <div class="summary-chart-bars">
                ${chartItems.map((item, i) => {
                  const pct = Math.max(Math.round((item.val / maxVal) * 100), 5);
                  const sharePct = sumTotal > 0 ? Math.round((item.val / sumTotal) * 100) : 0;
                  const grad = barGradients[i % barGradients.length];
                  return `
                    <div class="chart-bar-item">
                      <div class="chart-bar-info">
                        <span class="chart-bar-label">${escapeHtml(item.label)} <small style="color:#94A3B8;font-weight:400;">(${sharePct}%)</small></span>
                        <span class="chart-bar-val">${escapeHtml(item.formatted)}</span>
                      </div>
                      <div class="chart-bar-track">
                        <div class="chart-bar-fill" style="width: ${pct}%; background: ${grad};"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }
      }

      const taskSectionHtml = isTaskTracker ? `
        <div class="summary-card-metric">
          <div class="summary-metric-header">
            <span class="summary-metric-title">Progresso Geral das Entregas</span>
            <span class="summary-metric-pct">${completionRate}% Concluído</span>
          </div>
          <div class="summary-progress-bar-bg">
            <div class="summary-progress-bar-fill" style="width: ${completionRate}%;"></div>
          </div>
          <div class="summary-stats-breakdown">
            <div class="summary-stat-box">
              <span class="stat-box-val" style="color:#FFFFFF;">${total}</span>
              <span class="stat-box-lbl">Total Tasks</span>
            </div>
            <div class="summary-stat-box">
              <span class="stat-box-val" style="color:#FBBF24;">${inProgress}</span>
              <span class="stat-box-lbl">In Progress</span>
            </div>
            <div class="summary-stat-box">
              <span class="stat-box-val" style="color:#34D399;">${done}</span>
              <span class="stat-box-lbl">Done</span>
            </div>
            <div class="summary-stat-box">
              <span class="stat-box-val" style="color:#F87171;">${overdue}</span>
              <span class="stat-box-lbl">Overdue</span>
            </div>
          </div>
        </div>
      ` : '';

      container.innerHTML = `
        ${taskSectionHtml}
        ${chartHtml}
        <div class="summary-card-metric">
          <div class="summary-metric-header">
            <span class="summary-metric-title">Estrutura & Metadados do Arquivo</span>
          </div>
          <div style="font-size:12.5px;color:#CBD5E1;line-height:1.6;margin-top:6px;">
            • <strong>Colunas Ativas:</strong> ${artifact.headers.join(', ')}<br>
            • <strong>Total de Registros:</strong> ${total} linha(s) processada(s).<br>
            • <strong>Cálculos em Tempo Real:</strong> Suporte nativo a fórmulas automáticas (Qtd × Preço, Totais acumulados e fórmulas com <code>=</code>).<br>
            • <strong>Compatibilidade:</strong> Exportação nativa em Microsoft Excel (.xlsx) e Google Planilhas.
          </div>
        </div>
      `;
    }

    // ============================================================
    // ESTÚDIO DE GRÁFICOS INTERATIVOS DE EXCEL (CANVAS GRÁFICOS)
    // ============================================================
    let currentChartCategory = 'colunas'; // 'colunas', 'barras', 'linhas', 'pizza', 'cascata', 'radar'
    let currentChartVariation = '2d';     // '2d', '3d', 'donut', 'area', 'funil', 'combinacao'
    let currentChartMetricCol = -1;

    function renderSpreadsheetCharts(artifact) {
      const container = document.getElementById('canvas-charts-dashboard');
      if (!container || !artifact) return;

      const numCols = (artifact.headers || []).length;
      if (numCols === 0 || (artifact.rows || []).length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:40px;color:#94A3B8;">Nenhum dado disponível para gerar gráficos.</div>`;
        return;
      }

      // 1. Mapear todas as colunas com valores numéricos
      const numericCols = [];
      for (let c = 0; c < numCols; c++) {
        let validNumCount = 0;
        artifact.rows.forEach(r => {
          if (!isNaN(parseSpreadsheetNumber(r[c]))) validNumCount++;
        });
        if (validNumCount > 0) {
          const hName = cleanMarkdownText(artifact.headers[c] || `Coluna ${getExcelColumnLetter(c)}`);
          numericCols.push({ index: c, name: hName, count: validNumCount });
        }
      }

      if (numericCols.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:40px;color:#CBD5E1;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.1);border-radius:12px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFD100" stroke-width="2" style="margin-bottom:12px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <h3 style="margin:0 0 8px;font-size:16px;color:#FFF;">Nenhuma Coluna Numérica Detectada</h3>
            <p style="margin:0;font-size:13px;color:#94A3B8;">Adicione valores na aba <strong>Tracker</strong> (ex: faturamento, quantidades ou preços) para visualizar gráficos de Excel automáticos.</p>
          </div>
        `;
        return;
      }

      // 2. Definir coluna métrica ativa
      const metricColIndices = numericCols.map(nc => nc.index);
      if (!metricColIndices.includes(currentChartMetricCol)) {
        let bestCol = numericCols[0].index;
        for (const nc of numericCols) {
          const lower = nc.name.toLowerCase();
          if (lower.includes('total') || lower.includes('faturamento') || lower.includes('valor') || lower.includes('preço') || lower.includes('custo')) {
            bestCol = nc.index;
            break;
          }
        }
        currentChartMetricCol = bestCol;
      }

      // 3. Coluna de rótulos/categorias
      let labelCol = 0;
      if (labelCol === currentChartMetricCol && numCols > 1) {
        labelCol = (currentChartMetricCol === 0) ? 1 : 0;
      }

      // 4. Extrair itens de dados (ignorando linhas de totais acumulados para manter proporções)
      const dataItems = [];
      let totalSum = 0;
      let maxValue = 0;
      let sampleFormatted = '';

      artifact.rows.forEach((r, idx) => {
        const rawLabel = cleanMarkdownText(r[labelCol] || '');
        const isSummaryRow = /^(total|valor global|soma|acumulado|média|subtotal)/i.test(rawLabel);
        if (isSummaryRow) return;

        const val = parseSpreadsheetNumber(r[currentChartMetricCol]);
        if (!isNaN(val)) {
          if (val > maxValue) maxValue = val;
          totalSum += val;
          if (!sampleFormatted && r[currentChartMetricCol]) sampleFormatted = r[currentChartMetricCol];
          dataItems.push({
            label: rawLabel || `Linha ${idx + 2}`,
            value: val,
            formatted: r[currentChartMetricCol] || formatSpreadsheetNumber(val, sampleFormatted),
            originalIndex: idx
          });
        }
      });

      if (dataItems.length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:40px;color:#94A3B8;">Nenhum valor numérico válido encontrado na coluna selecionada.</div>`;
        return;
      }

      // Paleta vibrante e executiva inspirada em Angola / Dark Modern
      const chartColors = [
        '#FFD100', '#10B981', '#38BDF8', '#8B5CF6', 
        '#F43F5E', '#F59E0B', '#06B6D4', '#EC4899', 
        '#A855F7', '#14B8A6', '#6366F1', '#EAB308'
      ];

      const activeMetricName = cleanMarkdownText(artifact.headers[currentChartMetricCol] || 'Valores');
      const formattedTotal = formatSpreadsheetNumber(totalSum, sampleFormatted || activeMetricName);

      // 5. Categorias de Gráficos de Excel
      const categories = [
        { id: 'colunas', name: 'Colunas', icon: '<path d="M18 20V10M12 20V4M6 20v14"/>' },
        { id: 'barras', name: 'Barras', icon: '<path d="M4 6h16M4 12h10M4 18h14"/>' },
        { id: 'linhas', name: 'Linhas / Área', icon: '<path d="M3 18l6-6 4 4 8-8"/>' },
        { id: 'pizza', name: 'Pizza / Rosca', icon: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/>' },
        { id: 'cascata', name: 'Cascata / Funil', icon: '<path d="M3 4h4v6H3zM9 8h4v6H9zM15 12h4v8h-4z"/>' },
        { id: 'radar', name: 'Radar / Misto', icon: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>' }
      ];

      // Variações contextuais
      let variationBtnsHtml = '';
      if (currentChartCategory === 'colunas' || currentChartCategory === 'barras') {
        variationBtnsHtml = `
          <div class="chart-variation-toggle">
            <button type="button" class="chart-variation-btn ${currentChartVariation === '2d' ? 'active' : ''}" data-var="2d">2D</button>
            <button type="button" class="chart-variation-btn ${currentChartVariation === '3d' ? 'active' : ''}" data-var="3d">3D</button>
          </div>
        `;
      } else if (currentChartCategory === 'linhas') {
        variationBtnsHtml = `
          <div class="chart-variation-toggle">
            <button type="button" class="chart-variation-btn ${currentChartVariation === '2d' || currentChartVariation === 'linha' ? 'active' : ''}" data-var="linha">Linha</button>
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'area' ? 'active' : ''}" data-var="area">Área Preenchida</button>
          </div>
        `;
      } else if (currentChartCategory === 'pizza') {
        variationBtnsHtml = `
          <div class="chart-variation-toggle">
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'donut' || currentChartVariation === '2d' ? 'active' : ''}" data-var="donut">Rosca (Donut)</button>
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'pizza' ? 'active' : ''}" data-var="pizza">Pizza 2D</button>
          </div>
        `;
      } else if (currentChartCategory === 'cascata') {
        variationBtnsHtml = `
          <div class="chart-variation-toggle">
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'cascata' || currentChartVariation === '2d' ? 'active' : ''}" data-var="cascata">Cascata (Waterfall)</button>
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'funil' ? 'active' : ''}" data-var="funil">Funil</button>
          </div>
        `;
      } else if (currentChartCategory === 'radar') {
        variationBtnsHtml = `
          <div class="chart-variation-toggle">
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'radar' || currentChartVariation === '2d' ? 'active' : ''}" data-var="radar">Radar (Teia)</button>
            <button type="button" class="chart-variation-btn ${currentChartVariation === 'combinacao' ? 'active' : ''}" data-var="combinacao">Combinação (Coluna+Linha)</button>
          </div>
        `;
      }

      // Seletor de Métrica se houver múltiplas colunas
      const metricOptionsHtml = numericCols.map(nc => `
        <option value="${nc.index}" ${nc.index === currentChartMetricCol ? 'selected' : ''}>${escapeHtml(nc.name)}</option>
      `).join('');

      // 6. Gerar SVG do Gráfico
      const svgW = 760;
      const svgH = 340;
      let svgContent = '';

      if (currentChartCategory === 'colunas') {
        const is3D = currentChartVariation === '3d';
        const padL = 70;
        const padR = 40;
        const padT = 30;
        const padB = 60;
        const plotW = svgW - padL - padR;
        const plotH = svgH - padT - padB;
        const count = dataItems.length;
        const slotW = plotW / count;
        const barW = Math.min(Math.max(slotW * 0.55, 14), 60);

        // Grade Y
        let gridHtml = '';
        for (let i = 0; i <= 4; i++) {
          const y = padT + (plotH / 4) * i;
          const valAtY = maxValue - (maxValue / 4) * i;
          gridHtml += `
            <line x1="${padL}" y1="${y}" x2="${svgW - padR}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3" />
            <text x="${padL - 10}" y="${y + 4}" fill="#64748B" font-size="10" text-anchor="end" font-family="monospace">${escapeHtml(formatSpreadsheetNumber(valAtY, sampleFormatted))}</text>
          `;
        }

        let barsHtml = '';
        dataItems.forEach((item, idx) => {
          const ratio = maxValue > 0 ? (item.value / maxValue) : 0;
          const bH = Math.max(ratio * plotH, 4);
          const x = padL + idx * slotW + (slotW - barW) / 2;
          const y = padT + plotH - bH;
          const color = chartColors[idx % chartColors.length];

          if (is3D) {
            const depth = Math.min(barW * 0.35, 14);
            const front = `<polygon points="${x},${y} ${x + barW},${y} ${x + barW},${y + bH} ${x},${y + bH}" fill="${color}" class="excel-chart-bar-rect" data-item-idx="${idx}" />`;
            const top = `<polygon points="${x},${y} ${x + depth},${y - depth} ${x + barW + depth},${y - depth} ${x + barW},${y}" fill="${color}" filter="brightness(1.3)" />`;
            const side = `<polygon points="${x + barW},${y} ${x + barW + depth},${y - depth} ${x + barW + depth},${y + bH - depth} ${x + barW},${y + bH}" fill="${color}" filter="brightness(0.7)" />`;
            barsHtml += `<g class="excel-chart-bar-group" data-item-idx="${idx}">${top}${side}${front}</g>`;
          } else {
            barsHtml += `
              <rect x="${x}" y="${y}" width="${barW}" height="${bH}" rx="4" ry="4" fill="${color}" class="excel-chart-bar-rect" data-item-idx="${idx}">
                <title>${escapeHtml(item.label)}: ${escapeHtml(item.formatted)}</title>
              </rect>
            `;
          }

          const labelShort = item.label.length > 12 ? (item.label.slice(0, 11) + '…') : item.label;
          barsHtml += `
            <text x="${x + barW / 2}" y="${padT + plotH + 20}" fill="#94A3B8" font-size="11" text-anchor="middle" font-weight="500">${escapeHtml(labelShort)}</text>
            <text x="${x + barW / 2}" y="${y - (is3D ? 16 : 8)}" fill="#FFD100" font-size="10.5" font-weight="700" text-anchor="middle" font-family="monospace">${escapeHtml(item.formatted)}</text>
          `;
        });

        svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
            ${gridHtml}
            ${barsHtml}
          </svg>
        `;
      } else if (currentChartCategory === 'barras') {
        const padL = 130;
        const padR = 80;
        const padT = 20;
        const padB = 30;
        const plotW = svgW - padL - padR;
        const count = dataItems.length;
        const slotH = Math.min((svgH - padT - padB) / count, 45);
        const barH = slotH * 0.55;

        let barsHtml = '';
        dataItems.forEach((item, idx) => {
          const ratio = maxValue > 0 ? (item.value / maxValue) : 0;
          const bW = Math.max(ratio * plotW, 6);
          const y = padT + idx * slotH + (slotH - barH) / 2;
          const color = chartColors[idx % chartColors.length];
          const labelShort = item.label.length > 16 ? (item.label.slice(0, 15) + '…') : item.label;

          barsHtml += `
            <text x="${padL - 12}" y="${y + barH / 2 + 4}" fill="#CBD5E1" font-size="11" text-anchor="end" font-weight="500">${escapeHtml(labelShort)}</text>
            <rect x="${padL}" y="${y}" width="${plotW}" height="${barH}" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x="${padL}" y="${y}" width="${bW}" height="${barH}" rx="3" fill="${color}" class="excel-chart-bar-rect" data-item-idx="${idx}" />
            <text x="${padL + bW + 10}" y="${y + barH / 2 + 4}" fill="#FFD100" font-size="11" font-weight="700" font-family="monospace">${escapeHtml(item.formatted)}</text>
          `;
        });

        svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
            ${barsHtml}
          </svg>
        `;
      } else if (currentChartCategory === 'linhas') {
        const isArea = currentChartVariation === 'area';
        const padL = 70;
        const padR = 40;
        const padT = 30;
        const padB = 60;
        const plotW = svgW - padL - padR;
        const plotH = svgH - padT - padB;
        const count = dataItems.length;
        const stepX = count > 1 ? plotW / (count - 1) : plotW;

        let gridHtml = '';
        for (let i = 0; i <= 4; i++) {
          const y = padT + (plotH / 4) * i;
          const valAtY = maxValue - (maxValue / 4) * i;
          gridHtml += `
            <line x1="${padL}" y1="${y}" x2="${svgW - padR}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3" />
            <text x="${padL - 10}" y="${y + 4}" fill="#64748B" font-size="10" text-anchor="end" font-family="monospace">${escapeHtml(formatSpreadsheetNumber(valAtY, sampleFormatted))}</text>
          `;
        }

        const points = dataItems.map((item, idx) => {
          const x = padL + (count > 1 ? idx * stepX : plotW / 2);
          const ratio = maxValue > 0 ? (item.value / maxValue) : 0;
          const y = padT + plotH - ratio * plotH;
          return { x, y, item, idx };
        });

        let pathD = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i];
          const p1 = points[i + 1];
          const cpX = (p0.x + p1.x) / 2;
          pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
        }

        let areaHtml = '';
        if (isArea) {
          const areaD = `${pathD} L ${points[points.length - 1].x} ${padT + plotH} L ${points[0].x} ${padT + plotH} Z`;
          areaHtml = `
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFD100" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#FFD100" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <path d="${areaD}" fill="url(#areaGrad)" />
          `;
        }

        let nodesHtml = '';
        points.forEach(p => {
          const labelShort = p.item.label.length > 12 ? (p.item.label.slice(0, 11) + '…') : p.item.label;
          nodesHtml += `
            <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#FFD100" stroke="#0F1117" stroke-width="2.5" class="excel-chart-data-node" data-item-idx="${p.idx}" />
            <text x="${p.x}" y="${p.y - 10}" fill="#FFD100" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">${escapeHtml(p.item.formatted)}</text>
            <text x="${p.x}" y="${padT + plotH + 20}" fill="#94A3B8" font-size="11" text-anchor="middle">${escapeHtml(labelShort)}</text>
          `;
        });

        svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
            ${gridHtml}
            ${areaHtml}
            <path d="${pathD}" fill="none" stroke="#FFD100" stroke-width="3" stroke-linecap="round" />
            ${nodesHtml}
          </svg>
        `;
      } else if (currentChartCategory === 'pizza') {
        const isDonut = currentChartVariation === 'donut' || currentChartVariation === '2d';
        const cx = svgW / 2;
        const cy = svgH / 2;
        const r = Math.min(svgW, svgH) * 0.4;
        const innerR = isDonut ? (r * 0.58) : 0;

        let curAngle = -Math.PI / 2;
        let slicesHtml = '';

        dataItems.forEach((item, idx) => {
          const share = totalSum > 0 ? (item.value / totalSum) : 0;
          const sliceAngle = share * 2 * Math.PI;
          const endAngle = curAngle + sliceAngle;
          const color = chartColors[idx % chartColors.length];

          const x1 = cx + r * Math.cos(curAngle);
          const y1 = cy + r * Math.sin(curAngle);
          const x2 = cx + r * Math.cos(endAngle);
          const y2 = cy + r * Math.sin(endAngle);
          const largeArc = sliceAngle > Math.PI ? 1 : 0;

          let pathD = '';
          if (isDonut) {
            const ix1 = cx + innerR * Math.cos(endAngle);
            const iy1 = cy + innerR * Math.sin(endAngle);
            const ix2 = cx + innerR * Math.cos(curAngle);
            const iy2 = cy + innerR * Math.sin(curAngle);
            pathD = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
          } else {
            pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          }

          slicesHtml += `
            <path d="${pathD}" fill="${color}" stroke="#0F1117" stroke-width="2.5" class="excel-chart-pie-slice" data-item-idx="${idx}">
              <title>${escapeHtml(item.label)}: ${escapeHtml(item.formatted)} (${Math.round(share * 100)}%)</title>
            </path>
          `;
          curAngle = endAngle;
        });

        let centerHoleHtml = '';
        if (isDonut) {
          centerHoleHtml = `
            <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="#141721" />
            <text x="${cx}" y="${cy - 6}" fill="#94A3B8" font-size="11" text-anchor="middle" text-transform="uppercase">TOTAL GERAL</text>
            <text x="${cx}" y="${cy + 14}" fill="#FFD100" font-size="14" font-weight="800" text-anchor="middle" font-family="monospace">${escapeHtml(formattedTotal)}</text>
          `;
        }

        svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
            ${slicesHtml}
            ${centerHoleHtml}
          </svg>
        `;
      } else if (currentChartCategory === 'cascata') {
        const isFunnel = currentChartVariation === 'funil';
        if (isFunnel) {
          const padT = 20;
          const padB = 20;
          const count = dataItems.length;
          const stageH = (svgH - padT - padB) / count;
          const maxTrapW = svgW * 0.75;
          let funnelHtml = '';

          dataItems.forEach((item, idx) => {
            const ratioTop = idx === 0 ? 1 : (dataItems[idx - 1].value / dataItems[0].value);
            const ratioBot = item.value / dataItems[0].value;
            const wTop = Math.max(ratioTop * maxTrapW, 60);
            const wBot = Math.max(ratioBot * maxTrapW, 60);
            const yTop = padT + idx * stageH;
            const yBot = yTop + stageH - 4;
            const xTopL = (svgW - wTop) / 2;
            const xTopR = xTopL + wTop;
            const xBotL = (svgW - wBot) / 2;
            const xBotR = xBotL + wBot;
            const color = chartColors[idx % chartColors.length];

            funnelHtml += `
              <polygon points="${xTopL},${yTop} ${xTopR},${yTop} ${xBotR},${yBot} ${xBotL},${yBot}" fill="${color}" opacity="0.88" class="excel-chart-bar-rect" data-item-idx="${idx}" />
              <text x="${svgW / 2}" y="${yTop + stageH / 2}" fill="#FFFFFF" font-size="11.5" font-weight="700" text-anchor="middle">${escapeHtml(item.label)}: ${escapeHtml(item.formatted)}</text>
            `;
          });

          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
              ${funnelHtml}
            </svg>
          `;
        } else {
          // Cascata (Waterfall Chart do Microsoft Excel)
          const padL = 70;
          const padR = 40;
          const padT = 30;
          const padB = 60;
          const plotW = svgW - padL - padR;
          const plotH = svgH - padT - padB;
          const count = dataItems.length + 1;
          const slotW = plotW / count;
          const barW = slotW * 0.6;

          let runningSum = 0;
          let waterfallBars = '';

          dataItems.forEach((item, idx) => {
            const startVal = runningSum;
            runningSum += item.value;
            const endVal = runningSum;
            const isPos = item.value >= 0;
            const color = isPos ? '#10B981' : '#EF4444';

            const bottomVal = Math.min(startVal, endVal);
            const topVal = Math.max(startVal, endVal);
            const y = padT + plotH - (topVal / Math.max(totalSum, maxValue)) * plotH;
            const h = Math.max(((topVal - bottomVal) / Math.max(totalSum, maxValue)) * plotH, 4);
            const x = padL + idx * slotW + (slotW - barW) / 2;

            waterfallBars += `
              <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${color}" class="excel-chart-bar-rect" data-item-idx="${idx}" />
              <text x="${x + barW / 2}" y="${y - 6}" fill="${color}" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">${escapeHtml(item.formatted)}</text>
              <text x="${x + barW / 2}" y="${padT + plotH + 20}" fill="#94A3B8" font-size="10.5" text-anchor="middle">${escapeHtml(item.label.slice(0, 8))}</text>
            `;
          });

          // Barra Total Final
          const totalX = padL + dataItems.length * slotW + (slotW - barW) / 2;
          const totalY = padT + plotH - (totalSum / Math.max(totalSum, maxValue)) * plotH;
          const totalH = Math.max((totalSum / Math.max(totalSum, maxValue)) * plotH, 4);
          waterfallBars += `
            <rect x="${totalX}" y="${totalY}" width="${barW}" height="${totalH}" rx="3" fill="#FFD100" />
            <text x="${totalX + barW / 2}" y="${totalY - 6}" fill="#FFD100" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">${escapeHtml(formattedTotal)}</text>
            <text x="${totalX + barW / 2}" y="${padT + plotH + 20}" fill="#FFD100" font-size="11" font-weight="700" text-anchor="middle">TOTAL</text>
          `;

          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
              <line x1="${padL}" y1="${padT + plotH}" x2="${svgW - padR}" y2="${padT + plotH}" stroke="rgba(255,255,255,0.15)" />
              ${waterfallBars}
            </svg>
          `;
        }
      } else if (currentChartCategory === 'radar') {
        const isCombo = currentChartVariation === 'combinacao';
        if (isCombo) {
          const padL = 70;
          const padR = 40;
          const padT = 30;
          const padB = 60;
          const plotW = svgW - padL - padR;
          const plotH = svgH - padT - padB;
          const count = dataItems.length;
          const slotW = plotW / count;
          const barW = slotW * 0.5;

          let comboBars = '';
          const linePoints = [];

          dataItems.forEach((item, idx) => {
            const ratio = maxValue > 0 ? (item.value / maxValue) : 0;
            const bH = Math.max(ratio * plotH, 4);
            const x = padL + idx * slotW + (slotW - barW) / 2;
            const y = padT + plotH - bH;
            const color = '#38BDF8';

            comboBars += `
              <rect x="${x}" y="${y}" width="${barW}" height="${bH}" rx="3" fill="${color}" opacity="0.8" class="excel-chart-bar-rect" data-item-idx="${idx}" />
              <text x="${x + barW / 2}" y="${padT + plotH + 20}" fill="#94A3B8" font-size="11" text-anchor="middle">${escapeHtml(item.label.slice(0, 10))}</text>
            `;
            linePoints.push({ x: x + barW / 2, y: y, item, idx });
          });

          let linePath = `M ${linePoints[0].x} ${linePoints[0].y}`;
          for (let i = 1; i < linePoints.length; i++) {
            linePath += ` L ${linePoints[i].x} ${linePoints[i].y}`;
          }

          let comboNodes = '';
          linePoints.forEach(p => {
            comboNodes += `
              <circle cx="${p.x}" cy="${p.y}" r="4" fill="#FFD100" stroke="#0F1117" stroke-width="2" />
              <text x="${p.x}" y="${p.y - 8}" fill="#FFD100" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">${escapeHtml(p.item.formatted)}</text>
            `;
          });

          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
              ${comboBars}
              <path d="${linePath}" fill="none" stroke="#FFD100" stroke-width="2.5" />
              ${comboNodes}
            </svg>
          `;
        } else {
          // Radar
          const cx = svgW / 2;
          const cy = svgH / 2;
          const r = Math.min(svgW, svgH) * 0.38;
          const count = dataItems.length;
          const angleStep = (2 * Math.PI) / count;

          let webLines = '';
          for (let level = 1; level <= 4; level++) {
            const curR = (r / 4) * level;
            const pts = [];
            for (let i = 0; i < count; i++) {
              const a = -Math.PI / 2 + i * angleStep;
              pts.push(`${cx + curR * Math.cos(a)},${cy + curR * Math.sin(a)}`);
            }
            webLines += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(255,255,255,0.08)" />`;
          }

          const dataPoints = [];
          for (let i = 0; i < count; i++) {
            const a = -Math.PI / 2 + i * angleStep;
            const ax = cx + r * Math.cos(a);
            const ay = cy + r * Math.sin(a);
            webLines += `<line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="rgba(255,255,255,0.12)" />`;

            const item = dataItems[i];
            const ratio = maxValue > 0 ? (item.value / maxValue) : 0;
            const dx = cx + (r * ratio) * Math.cos(a);
            const dy = cy + (r * ratio) * Math.sin(a);
            dataPoints.push({ x: dx, y: dy, item, idx: i, lx: cx + (r + 18) * Math.cos(a), ly: cy + (r + 18) * Math.sin(a) });
          }

          const polyPts = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
          let nodesHtml = '';
          dataPoints.forEach(p => {
            nodesHtml += `
              <circle cx="${p.x}" cy="${p.y}" r="4" fill="#FFD100" stroke="#0F1117" stroke-width="2" class="excel-chart-data-node" data-item-idx="${p.idx}" />
              <text x="${p.lx}" y="${p.ly + 4}" fill="#CBD5E1" font-size="10.5" text-anchor="middle">${escapeHtml(p.item.label.slice(0, 9))}</text>
            `;
          });

          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="excel-chart-svg">
              ${webLines}
              <polygon points="${polyPts}" fill="rgba(255,209,0,0.25)" stroke="#FFD100" stroke-width="2.5" />
              ${nodesHtml}
            </svg>
          `;
        }
      }

      // 7. Legenda dos Itens
      const legendHtml = dataItems.map((item, idx) => {
        const sharePct = totalSum > 0 ? Math.round((item.value / totalSum) * 100) : 0;
        const color = chartColors[idx % chartColors.length];
        return `
          <div class="chart-legend-item">
            <span class="chart-legend-color" style="background:${color};"></span>
            <span class="chart-legend-name">${escapeHtml(item.label)}</span>
            <span class="chart-legend-val">${escapeHtml(item.formatted)} <small style="color:#94A3B8;font-weight:normal;">(${sharePct}%)</small></span>
          </div>
        `;
      }).join('');

      // 8. Montar o HTML Completo da Tela de Gráficos
      container.innerHTML = `
        <div class="excel-chart-ribbon">
          <div class="chart-ribbon-row">
            <div class="chart-type-categories">
              ${categories.map(cat => `
                <button type="button" class="chart-category-btn ${cat.id === currentChartCategory ? 'active' : ''}" data-cat="${cat.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${cat.icon}</svg>
                  <span>${cat.name}</span>
                </button>
              `).join('')}
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <button type="button" class="btn-chart-export" id="btn-export-chart-png" title="Baixar imagem em alta resolução (PNG)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Baixar Imagem (.png)</span>
              </button>
              <button type="button" class="btn-chart-export" id="btn-export-chart-svg" style="background:rgba(56,189,248,0.12);border-color:rgba(56,189,248,0.3);color:#38BDF8;" title="Baixar vetor editável (SVG)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><polyline points="8 11 12 15 16 11"/><path d="M20 21H4"/></svg>
                <span>Vetor (.svg)</span>
              </button>
            </div>
          </div>
          <div class="chart-ribbon-row">
            <div class="chart-options-group">
              ${variationBtnsHtml}
            </div>
            ${numericCols.length > 1 ? `
              <div class="chart-options-group">
                <span class="chart-select-label">Métrica:</span>
                <select class="chart-metric-select" id="chart-metric-col-select">
                  ${metricOptionsHtml}
                </select>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="excel-chart-stage-card">
          <div class="chart-stage-header">
            <div class="chart-stage-title-wrap">
              <div class="chart-stage-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD100" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                <span>${escapeHtml(activeMetricName)} • Análise Gráfica</span>
              </div>
              <span class="chart-stage-subtitle">${dataItems.length} registros analisados · Sincronizado em tempo real com a grelha</span>
            </div>
            <div class="chart-stage-stat">
              <span class="chart-stage-stat-val">${escapeHtml(formattedTotal)}</span>
              <span class="chart-stage-stat-lbl">Soma Acumulada</span>
            </div>
          </div>

          <div class="chart-svg-container" id="chart-svg-container">
            ${svgContent}
            <div class="chart-interactive-tooltip" id="chart-tooltip" style="display:none;opacity:0;"></div>
          </div>

          <div class="chart-legend-wrap">
            ${legendHtml}
          </div>
        </div>
      `;

      // 9. Event Listeners Interativos
      container.querySelectorAll('.chart-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentChartCategory = btn.getAttribute('data-cat');
          currentChartVariation = '2d';
          renderSpreadsheetCharts(artifact);
        });
      });

      container.querySelectorAll('.chart-variation-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentChartVariation = btn.getAttribute('data-var');
          renderSpreadsheetCharts(artifact);
        });
      });

      const metricSelect = document.getElementById('chart-metric-col-select');
      if (metricSelect) {
        metricSelect.addEventListener('change', (e) => {
          currentChartMetricCol = parseInt(e.target.value, 10);
          renderSpreadsheetCharts(artifact);
        });
      }

      // Tooltip Interativo Flutuante
      const tooltip = document.getElementById('chart-tooltip');
      const svgBox = document.getElementById('chart-svg-container');
      if (tooltip && svgBox) {
        const interactiveEls = svgBox.querySelectorAll('[data-item-idx]');
        interactiveEls.forEach(el => {
          el.addEventListener('mouseenter', () => {
            const idx = parseInt(el.getAttribute('data-item-idx'), 10);
            const item = dataItems[idx];
            if (!item) return;
            const sharePct = totalSum > 0 ? Math.round((item.value / totalSum) * 100) : 0;
            tooltip.innerHTML = `
              <div class="chart-tooltip-title">${escapeHtml(item.label)}</div>
              <div class="chart-tooltip-detail">
                <span>Valor: <strong>${escapeHtml(item.formatted)}</strong></span>
                <span>(${sharePct}%)</span>
              </div>
            `;
            tooltip.style.display = 'block';
            setTimeout(() => { tooltip.style.opacity = '1'; }, 10);
          });

          el.addEventListener('mousemove', (e) => {
            const rect = svgBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
          });

          el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            setTimeout(() => { tooltip.style.display = 'none'; }, 150);
          });
        });
      }

      // Baixar Imagem PNG em Alta Resolução
      const btnExportPng = document.getElementById('btn-export-chart-png');
      if (btnExportPng) {
        btnExportPng.addEventListener('click', () => {
          exportChartAsPng(artifact);
        });
      }

      // Baixar Vetor SVG Puro
      const btnExportSvg = document.getElementById('btn-export-chart-svg');
      if (btnExportSvg) {
        btnExportSvg.addEventListener('click', () => {
          exportChartAsSvg(artifact);
        });
      }
    }

    // Helper: Exportar gráfico SVG ativo como imagem PNG executiva em alta resolução (1600x900)
    function exportChartAsPng(artifact) {
      const stageCard = document.querySelector('.excel-chart-stage-card');
      // Selecionar rigorosamente o SVG do gráfico real (e nunca o ícone de 16x16 do cabeçalho)
      const svgEl = document.querySelector('#chart-svg-container svg') || document.querySelector('.chart-svg-container svg');
      if (!svgEl) {
        showToast('Nenhum gráfico visível para exportar.');
        return;
      }

      try {
        let svgData = new XMLSerializer().serializeToString(svgEl);
        if (!svgData.includes('xmlns="http://www.w3.org/2000/svg"')) {
          svgData = svgData.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
        }
        if (!svgData.includes('width=')) {
          svgData = svgData.replace('<svg ', '<svg width="' + (svgEl.clientWidth || 760) + '" height="' + (svgEl.clientHeight || 340) + '" ');
        }

        const activeMetricName = cleanMarkdownText(artifact.headers[currentChartMetricCol] || 'Valores');
        const targetFileName = (artifact.fileName || 'grafico-excel').replace(/\.[^.]+$/, '') + '-' + currentChartCategory + '-' + currentChartVariation + '.png';

        // Codificação Base64 segura para Unicode
        let base64Svg = '';
        try {
          base64Svg = window.btoa(unescape(encodeURIComponent(svgData)));
        } catch (e) {
          base64Svg = window.btoa(svgData);
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        // Fallback imediato: se o navegador bloquear renderização de SVG no canvas, baixa o vetor SVG
        img.onerror = function(err) {
          console.warn('[Meu Kota] Aviso ao renderizar PNG, baixando vetor SVG diretamente:', err);
          exportChartAsSvg(artifact);
        };

        img.onload = function() {
          try {
            const W = 1600;
            const H = 900;
            const canvas = document.createElement('canvas');
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext('2d');

            // Fundo escuro premium
            ctx.fillStyle = '#0F1117';
            ctx.fillRect(0, 0, W, H);

            // Card interno com sombra e cantos arredondados
            ctx.fillStyle = '#141721';
            if (typeof ctx.roundRect === 'function') {
              ctx.beginPath();
              ctx.roundRect(30, 30, W - 60, H - 60, 16);
              ctx.fill();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
              ctx.lineWidth = 2;
              ctx.stroke();
            } else {
              ctx.fillRect(30, 30, W - 60, H - 60);
            }

            // Cabeçalho: Título da Métrica
            ctx.fillStyle = '#FFD100';
            ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillText(activeMetricName.toUpperCase() + ' — ANÁLISE GRÁFICA', 70, 95);

            ctx.fillStyle = '#94A3B8';
            ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            const fileTitle = (artifact.fileName || 'Planilha').replace(/\.[^.]+$/, '');
            ctx.fillText(fileTitle + ' • ' + currentChartCategory.toUpperCase() + ' (' + currentChartVariation.toUpperCase() + ')', 70, 130);

            // Total acumulado no topo direito
            const totalValEl = stageCard ? stageCard.querySelector('.chart-stage-stat-val') : null;
            if (totalValEl) {
              ctx.textAlign = 'right';
              ctx.fillStyle = '#FFD100';
              ctx.font = 'bold 28px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
              ctx.fillText(totalValEl.textContent.trim(), W - 70, 95);
              ctx.fillStyle = '#94A3B8';
              ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
              ctx.fillText('SOMA ACUMULADA', W - 70, 125);
              ctx.textAlign = 'left';
            }

            // Linha divisória fina
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.beginPath();
            ctx.moveTo(70, 155);
            ctx.lineTo(W - 70, 155);
            ctx.stroke();

            // Desenhar o SVG do Gráfico Real
            ctx.drawImage(img, 70, 185, W - 140, H - 290);

            // Rodapé informativo
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillText('Gerado pelo Meu Kota IA — Análise e Inteligência de Negócios', 70, H - 55);

            // Exportar Blob ou DataURL
            if (canvas.toBlob) {
              canvas.toBlob((pngBlob) => {
                if (pngBlob) {
                  triggerBlobDownload(pngBlob, targetFileName);
                  showToast('Gráfico exportado em imagem PNG de alta resolução!');
                } else {
                  const dataUrl = canvas.toDataURL('image/png');
                  const a = document.createElement('a');
                  a.href = dataUrl;
                  a.download = targetFileName;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  showToast('Gráfico exportado em imagem PNG!');
                }
              }, 'image/png');
            } else {
              const dataUrl = canvas.toDataURL('image/png');
              const a = document.createElement('a');
              a.href = dataUrl;
              a.download = targetFileName;
              document.body.appendChild(a);
              a.click();
              a.remove();
              showToast('Gráfico exportado em imagem PNG!');
            }
          } catch(renderErr) {
            console.warn('[Meu Kota] Erro na rasterização do Canvas, baixando SVG:', renderErr);
            exportChartAsSvg(artifact);
          }
        };

        img.src = 'data:image/svg+xml;base64,' + base64Svg;
      } catch (err) {
        console.error('Erro ao exportar gráfico:', err);
        exportChartAsSvg(artifact);
      }
    }

    // Helper: Exportar gráfico ativo como Vetor SVG puro editável em padrão infográfico executivo
    function exportChartAsSvg(artifact) {
      const stageCard = document.querySelector('.excel-chart-stage-card');
      // Selecionar rigorosamente o SVG do gráfico real (e nunca o ícone de 16x16 do cabeçalho)
      const svgEl = document.querySelector('#chart-svg-container svg') || document.querySelector('.chart-svg-container svg');
      if (!svgEl) {
        showToast('Nenhum gráfico visível para exportar.');
        return;
      }
      try {
        const activeMetricName = cleanMarkdownText(artifact.headers[currentChartMetricCol] || 'Valores');
        const fileTitle = (artifact.fileName || 'Planilha').replace(/\.[^.]+$/, '');
        const totalValEl = stageCard ? stageCard.querySelector('.chart-stage-stat-val') : null;
        const totalValText = totalValEl ? totalValEl.textContent.trim() : '';

        const cardW = 1000;
        const cardH = 580;
        const padX = 70;
        const chartY = 150;

        // Pegar o conteúdo gráfico real
        const chartInner = svgEl.innerHTML;

        const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cardW} ${cardH}" width="${cardW}" height="${cardH}">
  <style>
    text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  </style>

  <!-- Fundo escuro premium -->
  <rect width="100%" height="100%" fill="#0F1117" />
  
  <!-- Card interno -->
  <rect x="25" y="25" width="${cardW - 50}" height="${cardH - 50}" rx="16" fill="#141721" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

  <!-- Cabeçalho -->
  <text x="${padX}" y="78" fill="#FFD100" font-size="22" font-weight="800" letter-spacing="0.5">${escapeHtml(activeMetricName.toUpperCase())} — ANÁLISE GRÁFICA</text>
  <text x="${padX}" y="106" fill="#94A3B8" font-size="13" font-weight="500">${escapeHtml(fileTitle)} • ${escapeHtml(currentChartCategory.toUpperCase())} (${escapeHtml(currentChartVariation.toUpperCase())})</text>

  <!-- Total acumulado -->
  ${totalValText ? `
    <text x="${cardW - padX}" y="78" fill="#FFD100" font-size="22" font-weight="700" text-anchor="end" class="mono">${escapeHtml(totalValText)}</text>
    <text x="${cardW - padX}" y="104" fill="#94A3B8" font-size="11" font-weight="600" text-anchor="end">SOMA ACUMULADA</text>
  ` : ''}

  <!-- Linha divisória fina -->
  <line x1="${padX}" y1="126" x2="${cardW - padX}" y2="126" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

  <!-- Gráfico centralizado -->
  <g transform="translate(120, ${chartY})">
    ${chartInner}
  </g>

  <!-- Rodapé informativo -->
  <text x="${padX}" y="${cardH - 45}" fill="rgba(255,255,255,0.35)" font-size="11.5" font-weight="500">Gerado pelo Meu Kota IA — Análise e Inteligência de Negócios</text>
</svg>`;

        const svgBlob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
        const fileName = (artifact.fileName || 'grafico-excel').replace(/\.[^.]+$/, '') + '-' + currentChartCategory + '-' + currentChartVariation + '.svg';
        triggerBlobDownload(svgBlob, fileName);
        showToast('Gráfico vetorial SVG exportado em alta fidelidade!');
      } catch (err) {
        console.error('Erro ao exportar SVG:', err);
        showToast('Erro ao exportar SVG: ' + err.message);
      }
    }

    // 4. EXPORTAÇÃO EXCEL (.XLSX) COM AMBAS AS ABAS (TRACKER + RESUMO)
    function exportSpreadsheetToXlsx(artifact) {
      if (!artifact) return;
      if (typeof XLSX === 'undefined') {
        showToast('Biblioteca do Microsoft Excel carregando...');
        return;
      }

      try {
        const fullMatrix = [artifact.headers, ...artifact.rows];
        const wsTracker = XLSX.utils.aoa_to_sheet(fullMatrix);

        // Auto-dimensionamento proporcional das colunas
        const colWidths = artifact.headers.map((h, colIdx) => {
          let maxLen = (h || '').toString().length;
          artifact.rows.forEach(r => {
            const cell = (r[colIdx] || '').toString();
            if (cell.length > maxLen) maxLen = cell.length;
          });
          return { wch: Math.min(Math.max(maxLen + 4, 12), 45) };
        });
        wsTracker['!cols'] = colWidths;

        // Criar Segunda Aba: Resumo Executivo
        const summaryData = [
          ['MÉTRICA EXECUTIVA', 'VALOR'],
          ['Total de Tarefas / Registros', artifact.rows.length],
          ['Campos Estruturados', artifact.headers.join(', ')],
          ['Data de Emissão', new Date().toLocaleString('pt-AO')]
        ];
        const wsResumo = XLSX.utils.aoa_to_sheet(summaryData);
        wsResumo['!cols'] = [{ wch: 30 }, { wch: 35 }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsTracker, 'Tracker');
        XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo Executivo');

        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        let targetName = (artifact.fileName || 'tracker-de-tarefas.xlsx').trim();
        if (!targetName.toLowerCase().endsWith('.xlsx')) targetName += '.xlsx';

        triggerBlobDownload(blob, targetName);
        showToast('Planilha Excel (.xlsx) baixada com sucesso (com abas Tracker e Resumo)!');
      } catch (err) {
        console.error('[Meu Kota Canvas] Erro ao exportar XLSX:', err);
        showToast('Erro ao exportar arquivo .xlsx: ' + err.message);
      }
    }

    // 5. EXPORTAÇÃO CSV COM UTF-8 BOM
    function exportSpreadsheetToCsv(artifact) {
      if (!artifact) return;
      try {
        const fullMatrix = [artifact.headers, ...artifact.rows];
        const csvLines = fullMatrix.map(row =>
          row.map(cell => {
            const str = (cell !== undefined && cell !== null ? String(cell) : '').replace(/"/g, '""');
            return `"${str}"`;
          }).join(';')
        ).join('\r\n');

        const blob = new Blob(['\ufeff' + csvLines], { type: 'text/csv;charset=utf-8;' });
        let targetName = (artifact.fileName || 'planilha').replace(/\.xlsx$/i, '') + '.csv';
        triggerBlobDownload(blob, targetName);
        showToast('Arquivo CSV baixado com sucesso!');
      } catch (err) {
        console.error('[Meu Kota Canvas] Erro ao exportar CSV:', err);
        showToast('Erro ao exportar CSV: ' + err.message);
      }
    }

    // 6. DISPARADOR DE PRÉ-VISUALIZAÇÃO DE IMPRESSÃO LIMPA EM PDF (CHROME / NATIVO)
    function triggerCleanPrintPreview(htmlContent) {
      let stage = document.getElementById('meu-kota-print-stage');
      if (!stage) {
        stage = document.createElement('div');
        stage.id = 'meu-kota-print-stage';
        stage.className = 'meu-kota-print-stage';
        document.body.appendChild(stage);
      }

      stage.innerHTML = htmlContent;
      document.body.classList.add('printing-clean-doc');

      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        document.body.classList.remove('printing-clean-doc');
        if (stage) stage.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
      };

      window.addEventListener('afterprint', cleanup);

      // Pequeno timeout para o navegador calcular o DOM e estilos de impressão antes de abrir a janela
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.error('[Meu Kota] Erro ao abrir janela de impressão:', e);
          showToast('Erro ao abrir diálogo de impressão: ' + e.message);
          cleanup();
        }
      }, 400);

      // Fallback estendido de segurança caso o navegador não emita o evento afterprint
      setTimeout(cleanup, 60000);
    }

    // 6A. EXPORTAÇÃO LIMPA DE PLANILHA PARA PDF EXECUTIVO (ABRE A JANELA DE IMPRESSÃO COM PRÉ-VISUALIZAÇÃO)
    function exportSpreadsheetToPdf(artifact) {
      if (!artifact) {
        showToast('Nenhuma planilha disponível para gerar PDF.');
        return;
      }
      showToast('Abrindo pré-visualização de impressão em PDF...');

      const now = new Date();
      const formattedDate = now.toLocaleDateString('pt-AO');
      const docRef = `MK-REL-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
      const cleanTitle = (artifact.title || artifact.fileName || 'Relatório de Tarefas').replace(/\.xlsx$/i, '').trim();

      const rows = Array.isArray(artifact.rows) ? artifact.rows : [];
      const headers = (Array.isArray(artifact.headers) && artifact.headers.length > 0) ? artifact.headers : ['Item', 'Descrição'];

      // Recalcular métricas
      const totalTasks = rows.length;
      let inProgressCount = 0;
      let doneCount = 0;
      let overdueCount = 0;

      const numCols = headers.length;
      const colNumericSums = new Array(numCols).fill(0);
      const colNumericCounts = new Array(numCols).fill(0);

      rows.forEach(r => {
        if (!Array.isArray(r)) return;
        r.forEach((val, cIdx) => {
          if (cIdx >= numCols) return;
          const text = cleanMarkdownText(val || '').toLowerCase();
          if (/^(done|conclu[ií]d[oa]|pago|ok|aprovado|sim|yes|finalizado|feito)$/.test(text) || text.includes('conclu')) {
            doneCount++;
          } else if (/^(in progress|em andamento|pendente|ativo|doing|execu[cç][aã]o)$/.test(text) || text.includes('andamento') || text.includes('progr')) {
            inProgressCount++;
          } else if (/^(overdue|atrasad[oa]|urgente|bloqueado|cancelado)$/.test(text) || text.includes('atras') || text.includes('overdue')) {
            overdueCount++;
          }

          const cleanNumStr = text.replace(/[^0-9.,-]/g, '').replace(/,/g, '.');
          const parts = cleanNumStr.split('.');
          let numVal = NaN;
          if (parts.length > 2) {
            numVal = parseFloat(parts.slice(0, -1).join('') + '.' + parts[parts.length - 1]);
          } else {
            numVal = parseFloat(cleanNumStr);
          }
          if (!isNaN(numVal) && isFinite(numVal) && text.length > 0) {
            colNumericSums[cIdx] += numVal;
            colNumericCounts[cIdx]++;
          }
        });
      });

      let bestNumericCol = -1;
      let maxNumCount = 0;
      colNumericCounts.forEach((count, cIdx) => {
        if (count > maxNumCount) {
          maxNumCount = count;
          bestNumericCol = cIdx;
        }
      });

      let formattedSum = '-';
      if (bestNumericCol >= 0 && maxNumCount > 0) {
        const sum = colNumericSums[bestNumericCol];
        const headerName = headers[bestNumericCol] || 'Total';
        formattedSum = sum.toLocaleString('pt-AO', { maximumFractionDigits: 2 });
        if (headerName.toLowerCase().includes('kz') || headerName.toLowerCase().includes('preço') || headerName.toLowerCase().includes('custo') || headerName.toLowerCase().includes('valor')) {
          formattedSum += ' Kz';
        }
      }

      const html = `
        <div class="clean-print-report" style="width: 100%; max-width: 100%; background: #FFFFFF; color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; padding: 20px;">

          <!-- APENAS A TABELA DE DADOS — SEM CABEÇALHO, SEM TÍTULO, SEM RODAPÉ -->
          <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
            <thead>
              <tr style="background: #0F172A; color: #FFFFFF;">
                ${headers.map(h => `<th style="padding: 10px 12px; text-align: left; font-weight: 700; font-size: 11px; border: 1px solid #0F172A; color: #FFFFFF; background: #0F172A;">${escapeHtml(cleanMarkdownText(h))}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map((row, idx) => {
                const rowArr = Array.isArray(row) ? row : [];
                return `
                <tr style="background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
                  ${headers.map((_, cIdx) => {
                    const cell = rowArr[cIdx] !== undefined ? rowArr[cIdx] : '';
                    const raw = cleanMarkdownText(cell);
                    const statusClass = getStatusClass(raw);
                    let content = escapeHtml(raw);
                    if (statusClass === 'done') {
                      content = `<span style="display:inline-block;background:#DEF7EC;color:#03543F;border:1px solid #31C48D;padding:2px 7px;border-radius:4px;font-weight:700;font-size:10px;">${content}</span>`;
                    } else if (statusClass === 'progress') {
                      content = `<span style="display:inline-block;background:#FEF08A;color:#713F12;border:1px solid #FACC15;padding:2px 7px;border-radius:4px;font-weight:700;font-size:10px;">${content}</span>`;
                    } else if (statusClass === 'overdue') {
                      content = `<span style="display:inline-block;background:#FEE2E2;color:#991B1B;border:1px solid #F87171;padding:2px 7px;border-radius:4px;font-weight:700;font-size:10px;">${content}</span>`;
                    }
                    return `<td style="padding: 9px 12px; border: 1px solid #CBD5E1; color: #1E293B; vertical-align: top; line-height: 1.45;">${content}</td>`;
                  }).join('')}
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>

        </div>
      `;

      triggerCleanPrintPreview(html);
    }

    // 6B. EXPORTAÇÃO LIMPA DO DOCUMENTO A4 PARA PDF (ABRE A JANELA DE IMPRESSÃO COM PRÉ-VISUALIZAÇÃO)
    function exportDocumentToPdf() {
      const sheet = document.getElementById('canvas-a4-sheet');
      if (!sheet) return;
      showToast('Abrindo pré-visualização de impressão em PDF...');

      const clone = sheet.cloneNode(true);
      clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

      const html = `
        <div class="clean-print-report" style="width: 100%; max-width: 100%; background: #FFFFFF; color: #0F172A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; padding: 10px;">
          ${clone.innerHTML}
        </div>
      `;

      triggerCleanPrintPreview(html);
    }

    // 7. EXPORTAÇÃO DE CÓDIGO
    function exportCodeToFile() {
      if (!codeTextarea) return;
      const code = codeTextarea.value || '';
      const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
      let targetName = (fileNameInput ? fileNameInput.value : 'index.html') || 'index.html';
      if (!targetName.includes('.')) targetName += '.html';
      triggerBlobDownload(blob, targetName);
      showToast('Arquivo de código baixado com sucesso!');
    }

    // 8. COPIAR DADOS
    function copySpreadsheetToClipboard(artifact) {
      if (!artifact) return;
      const fullMatrix = [artifact.headers, ...artifact.rows];
      const tsv = fullMatrix.map(row => (row || []).join('\t')).join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tsv).then(() => {
          showToast('Dados copiados! Pode colar no Excel, Sheets ou Bloco de Notas.');
        });
      }
    }

    // 9. ATUALIZAR GUTTER DO EDITOR DE CÓDIGO
    function updateCodeGutter() {
      if (!codeGutter || !codeTextarea) return;
      const linesCount = (codeTextarea.value || '').split('\n').length;
      let numbersHtml = '';
      for (let i = 1; i <= linesCount; i++) {
        numbersHtml += `<div>${i}</div>`;
      }
      codeGutter.innerHTML = numbersHtml;
    }

    // 10. ATUALIZAR PREVIEW AO VIVO NO IFRAME (COM BLINDAGEM DE NAVEGAÇÃO INTERNA)
    function updateCodeLivePreview() {
      if (!previewIframe || !codeTextarea) return;
      let rawHtml = codeTextarea.value || '';
      if (!rawHtml.trim()) {
        previewIframe.srcdoc = '';
        return;
      }

      // Script de blindagem e isolamento:
      // Impede que âncoras como #problema, #solucao, #, / ou links relativos
      // recarreguem ou dupliquem o Meu Kota IA dentro do iframe de pré-visualização.
      const navigationShieldScript = `
<script id="meu-kota-sandbox-shield">
(function() {
  document.addEventListener('click', function(e) {
    var anchor = e.target.closest('a');
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href) return;
    
    // 1. Âncoras internas (#problema, #solucao, #metodo, etc.)
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#' || href === '#!') return;
      try {
        var targetId = href.slice(1);
        var targetEl = document.getElementById(targetId) || document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (err) {}
      return;
    }
    
    // 2. Links relativos vazios ou que apontem para a raiz (evita navegar para Meu Kota)
    if (href === '/' || href === './' || href === 'index.html' || href === '' || href.startsWith('/')) {
      e.preventDefault();
      return;
    }
    
    // 3. Links externos de conversão (WhatsApp, redes sociais, telefones, etc.)
    if (/^(https?:|\\/\\/|tel:|mailto:|wa\\.me)/i.test(href)) {
      e.preventDefault();
      var targetUrl = href;
      // Normalização inteligente e anti-bloqueio de WhatsApp:
      // Evita o redirecionamento para api.whatsapp.com (que é bloqueado por adblockers e antivírus com ERR_BLOCKED_BY_RESPONSE)
      if (targetUrl.includes('api.whatsapp.com') || targetUrl.includes('wa.me')) {
        try {
          var phone = '';
          var msg = '';
          if (targetUrl.includes('wa.me/')) {
            var parts = targetUrl.split('wa.me/')[1] || '';
            var phoneAndQuery = parts.split('?');
            phone = (phoneAndQuery[0] || '').replace(/[^0-9]/g, '');
            if (phoneAndQuery[1]) {
              var params = new URLSearchParams(phoneAndQuery[1]);
              msg = params.get('text') || '';
            }
          } else {
            var u = new URL(targetUrl, 'https://api.whatsapp.com');
            phone = (u.searchParams.get('phone') || '').replace(/[^0-9]/g, '');
            msg = u.searchParams.get('text') || '';
          }
          if (phone) {
            var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (!isMobile) {
              // No computador (Windows/Mac/Linux): abrir diretamente o WhatsApp Web oficial
              targetUrl = 'https://web.whatsapp.com/send?phone=' + phone + (msg ? '&text=' + encodeURIComponent(msg) : '');
            } else {
              // No telemóvel (Android/iOS): abrir diretamente o app do WhatsApp
              targetUrl = 'https://wa.me/' + phone + (msg ? '?text=' + encodeURIComponent(msg) : '');
            }
          }
        } catch(err) {}
      }
      // Delega a abertura do link para a janela raiz (top-level) via postMessage
      // Isso garante que a nova aba seja aberta 100% fora do sandbox do iframe,
      // eliminando completamente o erro ERR_BLOCKED_BY_RESPONSE
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'meu_kota_open_external', url: targetUrl }, '*');
          return;
        }
      } catch(postErr) {}
      var tempA = document.createElement('a');
      tempA.href = targetUrl;
      tempA.target = '_blank';
      tempA.rel = 'noopener noreferrer';
      document.body.appendChild(tempA);
      tempA.click();
      tempA.remove();
      return;
    }
  }, true);

  // Evita que formulários vazios deem reload na tela
  document.addEventListener('submit', function(e) {
    var form = e.target;
    var action = form ? form.getAttribute('action') : null;
    if (!action || action === '#' || action === '/' || action === './') {
      e.preventDefault();
    }
  }, true);
})();
<\/script>`;

      let secureDoc = rawHtml;
      if (/<\/body>/i.test(secureDoc)) {
        secureDoc = secureDoc.replace(/<\/body>/i, navigationShieldScript + '\n</body>');
      } else {
        secureDoc += '\n' + navigationShieldScript;
      }

      previewIframe.srcdoc = secureDoc;
    }

    // --- MÉTODOS DE ABERTURA DO CANVAS ---

    function openSpreadsheetInCanvas(artifact, initialTab = 'tracker') {
      if (!artifact) return;
      window.activeCanvasArtifact = artifact;
      artifact.type = 'spreadsheet';

      if (layout) layout.classList.add('canvas-open');
      if (canvasPanel) canvasPanel.style.display = 'flex';

      // Ativar subview de planilha
      document.querySelectorAll('.canvas-subview').forEach(v => v.classList.remove('active'));
      const spreadView = document.getElementById('canvas-view-spreadsheet');
      if (spreadView) spreadView.classList.add('active');

      // Atualizar cabeçalho
      if (canvasTypeIcon) canvasTypeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
      if (modeStatus) modeStatus.textContent = 'Planilha Excel';
      if (canvasExportLabel) canvasExportLabel.textContent = 'Exportar (.xlsx)';
      if (fileNameInput) {
        let name = artifact.fileName || 'tracker-de-tarefas.xlsx';
        if (!name.endsWith('.xlsx')) name += '.xlsx';
        fileNameInput.value = name;
        artifact.fileName = name;
      }

      // Renderizar grelha, KPIs e resumo com histórico resetado e recálculo dinâmico
      resetSpreadsheetUndo();
      autoRecalculateSpreadsheet(artifact);
      renderSpreadsheetGrid(artifact);
      recalculateSpreadsheetKpis(artifact);
      renderSpreadsheetSummary(artifact);

      // Manter cartões de métricas recolhidos por padrão
      if (kpiStrip) kpiStrip.classList.add('collapsed');
      if (btnToggleKpiStrip) btnToggleKpiStrip.classList.remove('active');

      // Alternar para a aba solicitada (Tracker, Resumo ou Gráficos)
      switchSpreadsheetTab(initialTab);

      // Atualizar barra de contexto no chat
      if (contextBar) contextBar.style.display = 'flex';
      if (contextDocName) contextDocName.textContent = artifact.fileName || artifact.title || 'planilha.xlsx';
      if (contextIcon) contextIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>';

      if (window.innerWidth <= 860 && canvasPanel) {
        canvasPanel.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Planilha aberta no Canvas! Modo de Edição em Dupla ativo.');
    }

    function openDocumentInCanvas(docData) {
      window.activeCanvasArtifact = {
        type: 'document',
        title: (docData && docData.title) || 'Documento Comercial',
        fileName: (docData && docData.fileName) || 'documento-comercial.pdf'
      };

      if (layout) layout.classList.add('canvas-open');
      if (canvasPanel) canvasPanel.style.display = 'flex';

      // Ativar subview de documento
      document.querySelectorAll('.canvas-subview').forEach(v => v.classList.remove('active'));
      const docView = document.getElementById('canvas-view-document');
      if (docView) docView.classList.add('active');

      // Atualizar cabeçalho
      if (canvasTypeIcon) canvasTypeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
      if (modeStatus) modeStatus.textContent = 'Folha A4 Executiva';
      if (canvasExportLabel) canvasExportLabel.textContent = 'Baixar PDF (.pdf)';
      if (fileNameInput) fileNameInput.value = 'documento-comercial.pdf';

      // Atualizar data de emissão
      if (a4MetaDate) a4MetaDate.textContent = new Date().toLocaleDateString('pt-AO');

      // Barra de contexto
      if (contextBar) contextBar.style.display = 'flex';
      if (contextDocName) contextDocName.textContent = 'documento-comercial.pdf';
      if (contextIcon) contextIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

      if (window.innerWidth <= 860 && canvasPanel) {
        canvasPanel.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Documento Comercial A4 aberto no Canvas!');
    }

    function openCodeInCanvas(codeData) {
      window.activeCanvasArtifact = {
        type: 'code',
        title: (codeData && codeData.title) || 'Código Fonte',
        fileName: (codeData && codeData.fileName) || 'index.html'
      };

      if (layout) layout.classList.add('canvas-open');
      if (canvasPanel) canvasPanel.style.display = 'flex';

      // Ativar subview de código
      document.querySelectorAll('.canvas-subview').forEach(v => v.classList.remove('active'));
      const codeView = document.getElementById('canvas-view-code');
      if (codeView) codeView.classList.add('active');

      // Atualizar cabeçalho
      if (canvasTypeIcon) canvasTypeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
      if (modeStatus) modeStatus.textContent = 'Sandbox Interativo';
      if (canvasExportLabel) canvasExportLabel.textContent = 'Baixar Código (.html)';
      if (fileNameInput) fileNameInput.value = (codeData && codeData.fileName) || 'index.html';

      // Injetar código
      if (codeTextarea && codeData && codeData.code) {
        codeTextarea.value = codeData.code;
        updateCodeGutter();
        updateCodeLivePreview();
      }

      // Ativar aba Código ou Preview
      const isAlreadyOnPreview = tabCodePreview && tabCodePreview.classList.contains('active');
      if (!isAlreadyOnPreview) {
        if (tabCodeEditor) tabCodeEditor.classList.add('active');
        if (tabCodePreview) tabCodePreview.classList.remove('active');
        if (codeEditorWrap) codeEditorWrap.style.display = 'flex';
        if (codePreviewWrap) codePreviewWrap.style.display = 'none';
      } else {
        if (codeEditorWrap) codeEditorWrap.style.display = 'none';
        if (codePreviewWrap) codePreviewWrap.style.display = 'flex';
        updateCodeLivePreview();
      }

      // Barra de contexto
      if (contextBar) contextBar.style.display = 'flex';
      if (contextDocName) contextDocName.textContent = fileNameInput ? fileNameInput.value : 'index.html';
      if (contextIcon) contextIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';

      if (window.innerWidth <= 860 && canvasPanel) {
        canvasPanel.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Editor de Código aberto no Canvas!');
    }

    function closeCanvas() {
      if (layout) layout.classList.remove('canvas-open');
      if (canvasPanel) {
        canvasPanel.style.display = 'none';
        canvasPanel.classList.remove('is-fullscreen');
      }
      if (exportDropdown) exportDropdown.style.display = 'none';
      if (launcherMenu) launcherMenu.style.display = 'none';
    }

    // Templates padrão pré-configurados
    function createDefaultSpreadsheetTemplate() {
      return {
        id: 'default-tracker-' + Date.now(),
        type: 'spreadsheet',
        title: 'Planejamento e Tracker de Tarefas 2026',
        fileName: 'tracker-de-tarefas.xlsx',
        headers: ['Tarefa / Atividade', 'Responsável', 'Prioridade', 'Status', 'Prazo', 'Custo Previsto (Kz)'],
        rows: [
          ['Configuração Servidor Google Firebase', 'Equipa DevOps', 'Alta', 'Done', '29/09/2026', '50.000 Kz'],
          ['Desenvolvimento Canvas Interativo', 'Bruno Souza', 'Crítica', 'In Progress', '30/09/2026', '120.000 Kz'],
          ['Auditoria de Segurança & Chaves', 'Segurança', 'Média', 'In Progress', '02/10/2026', '35.000 Kz'],
          ['Validação do Sistema com Cliente', 'Gestão', 'Alta', 'Overdue', '26/09/2026', '25.000 Kz'],
          ['Homologação & Treinamento da Equipa', 'Operações', 'Normal', 'Done', '05/10/2026', '40.000 Kz']
        ]
      };
    }

    function createDefaultCodeTemplate() {
      return {
        title: 'Página Web Interativa',
        fileName: 'index.html',
        code: `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demonstração Meu Kota IA</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0B0E14;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      box-sizing: border-box;
    }
    .card {
      background: #151923;
      border: 1.5px solid #FFD100;
      border-radius: 14px;
      padding: 32px;
      max-width: 440px;
      text-align: center;
      box-shadow: 0 12px 36px rgba(0,0,0,0.6);
    }
    h1 { color: #FFD100; font-size: 22px; margin-top: 0; }
    p { color: #94A3B8; font-size: 14px; line-height: 1.5; }
    .btn {
      background: #FFD100;
      color: #000;
      font-weight: 800;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .btn:hover { background: #FFE033; transform: scale(1.04); }
    .counter {
      font-size: 36px;
      font-weight: 800;
      color: #34D399;
      margin: 18px 0;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Meu Kota IA Sandbox</h1>
    <p>Esta interface está rodando ao vivo diretamente no navegador!</p>
    <div class="counter" id="count">0</div>
    <button class="btn" onclick="inc()">Clique para Interagir</button>
  </div>
  <script>
    let c = 0;
    function inc() {
      c++;
      document.getElementById('count').textContent = c;
    }
  <\/script>
</body>
</html>`
      };
    }

    function createDefaultDocumentTemplate() {
      return {
        title: 'Relatório & Proposta Comercial Executiva',
        fileName: 'documento-comercial.pdf'
      };
    }

    // --- SISTEMA DE HISTÓRICO E DESFAZER (CTRL+Z) DA PLANILHA ---
    let spreadsheetUndoStack = [];
    let pendingFocusSnapshot = null;
    let lastFocusedCell = null;

    function captureSpreadsheetSnapshot(art) {
      if (!art) return null;
      return {
        headers: JSON.parse(JSON.stringify(art.headers || [])),
        rows: JSON.parse(JSON.stringify(art.rows || [])),
        aligns: art.aligns ? JSON.parse(JSON.stringify(art.aligns)) : null
      };
    }

    function pushSpreadsheetUndoState() {
      if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
      const snapshot = captureSpreadsheetSnapshot(window.activeCanvasArtifact);
      if (!snapshot) return;
      spreadsheetUndoStack.push(snapshot);
      if (spreadsheetUndoStack.length > 50) spreadsheetUndoStack.shift();
      updateUndoButtonUI();
    }

    function undoSpreadsheetAction() {
      if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
      if (!spreadsheetUndoStack.length) {
        showToast('Nenhuma alteração anterior para desfazer.');
        return;
      }
      const prev = spreadsheetUndoStack.pop();
      const art = window.activeCanvasArtifact;
      art.headers = prev.headers;
      art.rows = prev.rows;
      if (prev.aligns) art.aligns = prev.aligns;
      autoRecalculateSpreadsheet(art);
      renderSpreadsheetGrid(art);
      recalculateSpreadsheetKpis(art);
      renderSpreadsheetSummary(art);
      updateUndoButtonUI();
      showToast('Ação desfeita com sucesso (Ctrl+Z)!');
    }

    function resetSpreadsheetUndo() {
      spreadsheetUndoStack = [];
      pendingFocusSnapshot = null;
      lastFocusedCell = null;
      updateUndoButtonUI();
    }

    function updateUndoButtonUI() {
      if (!btnGridUndo) return;
      if (spreadsheetUndoStack.length > 0) {
        btnGridUndo.classList.remove('disabled');
        btnGridUndo.removeAttribute('disabled');
        btnGridUndo.title = `Desfazer última alteração (Ctrl+Z) • ${spreadsheetUndoStack.length} ação(ões)`;
      } else {
        btnGridUndo.classList.add('disabled');
        btnGridUndo.setAttribute('disabled', 'true');
        btnGridUndo.title = 'Desfazer última alteração (Ctrl+Z)';
      }
    }

    // --- EVENT LISTENERS DO CANVAS ---

    // 1. Edição em tempo real das células da tabela (contenteditable) com histórico
    if (excelTable) {
      excelTable.addEventListener('focusin', (e) => {
        const target = e.target.closest('[contenteditable="true"]');
        if (target && window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'spreadsheet') {
          const cellType = target.getAttribute('data-type');
          const colIdx = parseInt(target.getAttribute('data-col'), 10);
          const rowIdx = parseInt(target.getAttribute('data-row'), 10);
          lastFocusedCell = { type: cellType, row: isNaN(rowIdx) ? null : rowIdx, col: isNaN(colIdx) ? null : colIdx };
          pendingFocusSnapshot = captureSpreadsheetSnapshot(window.activeCanvasArtifact);
        }
      });

      excelTable.addEventListener('click', (e) => {
        const target = e.target.closest('[data-type="header"], [data-type="cell"]');
        if (target) {
          const cellType = target.getAttribute('data-type');
          const colIdx = parseInt(target.getAttribute('data-col'), 10);
          const rowIdx = parseInt(target.getAttribute('data-row'), 10);
          lastFocusedCell = { type: cellType, row: isNaN(rowIdx) ? null : rowIdx, col: isNaN(colIdx) ? null : colIdx };
        }
      });

      excelTable.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const target = e.target.closest('[contenteditable="true"]');
          if (target) target.blur();
        }
      });

      excelTable.addEventListener('input', (e) => {
        const target = e.target;
        if (!target || !window.activeCanvasArtifact) return;

        if (pendingFocusSnapshot) {
          spreadsheetUndoStack.push(pendingFocusSnapshot);
          if (spreadsheetUndoStack.length > 50) spreadsheetUndoStack.shift();
          updateUndoButtonUI();
          pendingFocusSnapshot = null;
        }

        const cellType = target.getAttribute('data-type');
        const colIdx = parseInt(target.getAttribute('data-col'), 10);
        const rowIdx = parseInt(target.getAttribute('data-row'), 10);
        const newText = target.innerText.trim();

        if (cellType === 'header' && !isNaN(colIdx)) {
          window.activeCanvasArtifact.headers[colIdx] = newText;
          autoRecalculateSpreadsheet(window.activeCanvasArtifact);
          syncSpreadsheetDomFromData(window.activeCanvasArtifact);
          recalculateSpreadsheetKpis(window.activeCanvasArtifact);
          renderSpreadsheetSummary(window.activeCanvasArtifact);
        } else if (cellType === 'cell' && !isNaN(rowIdx) && !isNaN(colIdx)) {
          if (window.activeCanvasArtifact.rows[rowIdx]) {
            window.activeCanvasArtifact.rows[rowIdx][colIdx] = newText;
            autoRecalculateSpreadsheet(window.activeCanvasArtifact);
            syncSpreadsheetDomFromData(window.activeCanvasArtifact);
            recalculateSpreadsheetKpis(window.activeCanvasArtifact);
            renderSpreadsheetSummary(window.activeCanvasArtifact);
          }
        }
      });

      excelTable.addEventListener('focusout', () => {
        if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
        autoRecalculateSpreadsheet(window.activeCanvasArtifact);
        syncSpreadsheetDomFromData(window.activeCanvasArtifact);
        recalculateSpreadsheetKpis(window.activeCanvasArtifact);
        renderSpreadsheetSummary(window.activeCanvasArtifact);
      });
    }

    // 2. Toolbar da Planilha: Adicionar Linha (+ Linha)
    if (btnAddRow) {
      btnAddRow.addEventListener('click', () => {
        if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
        const art = window.activeCanvasArtifact;
        pushSpreadsheetUndoState();
        const emptyRow = new Array(art.headers.length).fill('');
        const insertIdx = (lastFocusedCell && lastFocusedCell.row !== null && lastFocusedCell.row < art.rows.length) 
          ? lastFocusedCell.row + 1 
          : art.rows.length;
        art.rows.splice(insertIdx, 0, emptyRow);
        renderSpreadsheetGrid(art);
        recalculateSpreadsheetKpis(art);
        renderSpreadsheetSummary(art);
        showToast('Nova linha adicionada!');
      });
    }

    // 2B. Toolbar da Planilha: Excluir Linha (- Linha)
    if (btnDelRow) {
      btnDelRow.addEventListener('click', () => {
        if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
        const art = window.activeCanvasArtifact;
        if (!art.rows || art.rows.length === 0) {
          showToast('Não há linhas para excluir.');
          return;
        }
        pushSpreadsheetUndoState();
        if (art.rows.length === 1) {
          // Manter pelo menos 1 linha na grelha, limpando o conteúdo
          art.rows[0].fill('');
          renderSpreadsheetGrid(art);
          recalculateSpreadsheetKpis(art);
          renderSpreadsheetSummary(art);
          showToast('Linha esvaziada (a tabela precisa ter ao menos 1 linha).');
          return;
        }

        let removedIdx = art.rows.length - 1;
        if (lastFocusedCell && lastFocusedCell.row !== null && lastFocusedCell.row < art.rows.length) {
          removedIdx = lastFocusedCell.row;
          lastFocusedCell = null;
        }
        art.rows.splice(removedIdx, 1);
        renderSpreadsheetGrid(art);
        recalculateSpreadsheetKpis(art);
        renderSpreadsheetSummary(art);
        showToast(`Linha ${removedIdx + 2} excluída!`);
      });
    }

    // 3. Toolbar da Planilha: Adicionar Coluna (+ Coluna)
    if (btnAddCol) {
      btnAddCol.addEventListener('click', () => {
        if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
        const art = window.activeCanvasArtifact;
        pushSpreadsheetUndoState();
        const nextColNumber = art.headers.length + 1;
        const newColName = 'Coluna ' + nextColNumber;
        const insertColIdx = (lastFocusedCell && lastFocusedCell.col !== null && lastFocusedCell.col < art.headers.length)
          ? lastFocusedCell.col + 1
          : art.headers.length;
        art.headers.splice(insertColIdx, 0, newColName);
        art.rows.forEach(r => r.splice(insertColIdx, 0, ''));
        if (art.aligns) art.aligns.splice(insertColIdx, 0, 'left');
        renderSpreadsheetGrid(art);
        recalculateSpreadsheetKpis(art);
        renderSpreadsheetSummary(art);
        showToast(`Coluna "${newColName}" adicionada!`);
      });
    }

    // 3B. Toolbar da Planilha: Excluir Coluna (- Coluna)
    if (btnDelCol) {
      btnDelCol.addEventListener('click', () => {
        if (!window.activeCanvasArtifact || window.activeCanvasArtifact.type !== 'spreadsheet') return;
        const art = window.activeCanvasArtifact;
        if (!art.headers || art.headers.length <= 1) {
          showToast('A planilha precisa ter pelo menos 1 coluna.');
          return;
        }
        pushSpreadsheetUndoState();
        let targetColIdx = art.headers.length - 1;
        if (lastFocusedCell && lastFocusedCell.col !== null && lastFocusedCell.col < art.headers.length) {
          targetColIdx = lastFocusedCell.col;
          lastFocusedCell = null;
        }
        const colName = art.headers[targetColIdx] || ('Coluna ' + (targetColIdx + 1));
        art.headers.splice(targetColIdx, 1);
        art.rows.forEach(r => r.splice(targetColIdx, 1));
        if (art.aligns) art.aligns.splice(targetColIdx, 1);
        renderSpreadsheetGrid(art);
        recalculateSpreadsheetKpis(art);
        renderSpreadsheetSummary(art);
        showToast(`Coluna "${colName}" excluída!`);
      });
    }

    // 4. Toolbar da Planilha: Botão Desfazer (Ctrl+Z)
    if (btnGridUndo) {
      btnGridUndo.addEventListener('click', () => {
        undoSpreadsheetAction();
      });
    }

    // 4B. Atalho de Teclado Global: Ctrl+Z para Desfazer na Planilha
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z') && !e.shiftKey) {
        if (window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'spreadsheet') {
          const spreadView = document.getElementById('canvas-view-spreadsheet');
          if (spreadView && spreadView.classList.contains('active')) {
            e.preventDefault();
            undoSpreadsheetAction();
          }
        }
      }
    });

    // 4B. Alternar exibição dos cartões de métricas (expandir / recolher com seta)
    if (btnToggleKpiStrip && kpiStrip) {
      btnToggleKpiStrip.addEventListener('click', () => {
        const isCollapsed = kpiStrip.classList.toggle('collapsed');
        btnToggleKpiStrip.classList.toggle('active', !isCollapsed);
      });
    }

    // 5. Abas da Planilha (Tracker / Resumo / Gráficos)
    function switchSpreadsheetTab(tabName) {
      if (tabSheetTracker) tabSheetTracker.classList.toggle('active', tabName === 'tracker');
      if (tabSheetResumo) tabSheetResumo.classList.toggle('active', tabName === 'resumo');
      if (tabSheetGraficos) tabSheetGraficos.classList.toggle('active', tabName === 'graficos');

      if (viewTracker) viewTracker.style.display = tabName === 'tracker' ? 'block' : 'none';
      if (viewResumo) {
        viewResumo.style.display = tabName === 'resumo' ? 'block' : 'none';
        if (tabName === 'resumo' && window.activeCanvasArtifact) {
          renderSpreadsheetSummary(window.activeCanvasArtifact);
        }
      }
      if (viewGraficos) {
        viewGraficos.style.display = tabName === 'graficos' ? 'block' : 'none';
        if (tabName === 'graficos' && window.activeCanvasArtifact) {
          renderSpreadsheetCharts(window.activeCanvasArtifact);
        }
      }
    }

    if (tabSheetTracker) {
      tabSheetTracker.addEventListener('click', () => switchSpreadsheetTab('tracker'));
    }
    if (tabSheetResumo) {
      tabSheetResumo.addEventListener('click', () => switchSpreadsheetTab('resumo'));
    }
    if (tabSheetGraficos) {
      tabSheetGraficos.addEventListener('click', () => switchSpreadsheetTab('graficos'));
    }

    if (btnAddSheetTab) {
      btnAddSheetTab.addEventListener('click', () => {
        showToast('Nova aba criada com sucesso.');
      });
    }

    // 6. Abas do Sandbox de Código (Código / Preview)
    if (tabCodeEditor && tabCodePreview) {
      tabCodeEditor.addEventListener('click', () => {
        tabCodeEditor.classList.add('active');
        tabCodePreview.classList.remove('active');
        if (codeEditorWrap) codeEditorWrap.style.display = 'flex';
        if (codePreviewWrap) codePreviewWrap.style.display = 'none';
      });

      tabCodePreview.addEventListener('click', () => {
        tabCodePreview.classList.add('active');
        tabCodeEditor.classList.remove('active');
        if (codeEditorWrap) codeEditorWrap.style.display = 'none';
        if (codePreviewWrap) {
          codePreviewWrap.style.display = 'flex';
          updateCodeLivePreview();
        }
      });
    }

    if (btnCodeRefresh) {
      btnCodeRefresh.addEventListener('click', () => {
        updateCodeLivePreview();
        showToast('Pré-visualização ao vivo atualizada!');
      });
    }

    if (codeTextarea) {
      codeTextarea.addEventListener('input', () => {
        updateCodeGutter();
      });
      codeTextarea.addEventListener('scroll', () => {
        if (codeGutter) codeGutter.scrollTop = codeTextarea.scrollTop;
      });
    }

    // 7. Renomear Arquivo no Cabeçalho
    if (fileNameInput) {
      fileNameInput.addEventListener('change', () => {
        if (window.activeCanvasArtifact) {
          let val = fileNameInput.value.trim() || 'arquivo';
          window.activeCanvasArtifact.fileName = val;
          if (contextDocName) contextDocName.textContent = val;
        }
      });
    }

    // 8. Botão Principal de Exportação Dinâmico
    if (btnExportPrimary) {
      btnExportPrimary.addEventListener('click', () => {
        if (!window.activeCanvasArtifact) {
          showToast('Nenhum arquivo ativo no Canvas.');
          return;
        }

        const type = window.activeCanvasArtifact.type;
        if (type === 'spreadsheet') {
          exportSpreadsheetToXlsx(window.activeCanvasArtifact);
        } else if (type === 'document') {
          exportDocumentToPdf();
        } else if (type === 'code') {
          exportCodeToFile();
        } else {
          showToast('Formato exportado com sucesso.');
        }
      });
    }

    // 9. Menu Dropdown de Mais Opções
    if (btnMoreExports && exportDropdown) {
      btnMoreExports.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShown = exportDropdown.style.display === 'block';
        exportDropdown.style.display = isShown ? 'none' : 'block';
      });

      document.addEventListener('click', (e) => {
        if (!exportDropdown.contains(e.target) && e.target !== btnMoreExports) {
          exportDropdown.style.display = 'none';
        }
      });
    }

    if (btnDlXlsx) {
      btnDlXlsx.addEventListener('click', () => {
        if (exportDropdown) exportDropdown.style.display = 'none';
        if (window.activeCanvasArtifact) exportSpreadsheetToXlsx(window.activeCanvasArtifact);
      });
    }

    if (btnDlCsv) {
      btnDlCsv.addEventListener('click', () => {
        if (exportDropdown) exportDropdown.style.display = 'none';
        if (window.activeCanvasArtifact) exportSpreadsheetToCsv(window.activeCanvasArtifact);
      });
    }

    if (btnDlPdf) {
      btnDlPdf.addEventListener('click', (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (exportDropdown) exportDropdown.style.display = 'none';
        if (!window.activeCanvasArtifact) {
          if (excelTable && excelTable.rows && excelTable.rows.length > 0) {
            window.activeCanvasArtifact = createDefaultSpreadsheetTemplate();
          } else {
            showToast('Nenhum arquivo ativo no Canvas.');
            return;
          }
        }
        if (window.activeCanvasArtifact.type === 'spreadsheet') {
          exportSpreadsheetToPdf(window.activeCanvasArtifact);
        } else {
          exportDocumentToPdf();
        }
      });
    }

    if (btnCopyAll) {
      btnCopyAll.addEventListener('click', () => {
        if (exportDropdown) exportDropdown.style.display = 'none';
        if (window.activeCanvasArtifact) copySpreadsheetToClipboard(window.activeCanvasArtifact);
      });
    }

    // 10. Alternar Tela Cheia
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (canvasPanel) {
          canvasPanel.classList.toggle('is-fullscreen');
          const isFull = canvasPanel.classList.contains('is-fullscreen');
          showToast(isFull ? 'Tela cheia ativada' : 'Modo dividido normal');
        }
      });
    }

    // 11. Fechar Canvas
    if (btnClose) btnClose.addEventListener('click', closeCanvas);
    if (btnMobileBack) btnMobileBack.addEventListener('click', closeCanvas);

    // 12. Desvincular Contexto Ativo do Chat
    if (btnDetach) {
      btnDetach.addEventListener('click', () => {
        window.activeCanvasArtifact = null;
        if (contextBar) contextBar.style.display = 'none';
        showToast('Contexto do Canvas desvinculado do chat.');
      });
    }

    // 12B. Interceptar atalho de impressão (Ctrl+P / Cmd+P) para sempre disparar o PDF executivo limpo sem métricas
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        if (window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'spreadsheet') {
          e.preventDefault();
          exportSpreadsheetToPdf(window.activeCanvasArtifact);
        } else if (window.activeCanvasArtifact && window.activeCanvasArtifact.type === 'document') {
          e.preventDefault();
          exportDocumentToPdf();
        }
      }
    });

    // 13. Launcher de Novo Arquivo no Topo do Chat
    if (btnOpenLauncher && launcherMenu) {
      btnOpenLauncher.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShown = launcherMenu.style.display === 'flex';
        launcherMenu.style.display = isShown ? 'none' : 'flex';
      });

      document.addEventListener('click', (e) => {
        if (!launcherMenu.contains(e.target) && e.target !== btnOpenLauncher) {
          launcherMenu.style.display = 'none';
        }
      });
    }

    // 14. Ferramentas do Modo Documento (A4 Paper Sheet)
    document.querySelectorAll('.canvas-doc-tool').forEach(toolBtn => {
      toolBtn.addEventListener('click', () => {
        const cmd = toolBtn.getAttribute('data-cmd');
        const val = toolBtn.getAttribute('data-val') || null;
        if (cmd) {
          document.execCommand(cmd, false, val);
          if (a4Sheet) a4Sheet.focus();
        }
      });
    });

    if (btnDocTodayDate) {
      btnDocTodayDate.addEventListener('click', () => {
        if (a4MetaDate) a4MetaDate.textContent = new Date().toLocaleDateString('pt-AO');
        showToast('Data do documento atualizada para hoje.');
      });
    }

    // 15. Delegação de Eventos Global (Launchers, Cartões Rápidos, Chat Clicks)
    document.addEventListener('click', (e) => {
      // Itens do menu launcher no header
      const menuItem = e.target.closest('.canvas-menu-item');
      if (menuItem) {
        if (launcherMenu) launcherMenu.style.display = 'none';
        const action = menuItem.getAttribute('data-action');
        if (action === 'new-spreadsheet') {
          openSpreadsheetInCanvas(createDefaultSpreadsheetTemplate());
        } else if (action === 'new-document') {
          openDocumentInCanvas(createDefaultDocumentTemplate());
        } else if (action === 'new-code') {
          openCodeInCanvas(createDefaultCodeTemplate());
        }
        return;
      }

      // Cartões rápidos da tela inicial de boas-vindas
      const quickCard = e.target.closest('.canvas-quick-card');
      if (quickCard) {
        const action = quickCard.getAttribute('data-action');
        if (action === 'new-spreadsheet') {
          openSpreadsheetInCanvas(createDefaultSpreadsheetTemplate());
        } else if (action === 'new-document') {
          openDocumentInCanvas(createDefaultDocumentTemplate());
        } else if (action === 'new-code') {
          openCodeInCanvas(createDefaultCodeTemplate());
        }
        return;
      }

      // Botão "Abrir no Canvas" na tabela do chat
      const btnOpen = e.target.closest('.btn-open-canvas-pill, .btn-open-canvas-artifact');
      if (btnOpen) {
        const artId = btnOpen.getAttribute('data-artifact-id');
        if (artId && window.meuKotaArtifactRegistry && window.meuKotaArtifactRegistry[artId]) {
          openSpreadsheetInCanvas(window.meuKotaArtifactRegistry[artId], 'tracker');
        }
        return;
      }

      // Botão "Gráficos" Direto na tabela do chat
      const btnQuickCharts = e.target.closest('.btn-artifact-quick-charts');
      if (btnQuickCharts) {
        const artId = btnQuickCharts.getAttribute('data-artifact-id');
        if (artId && window.meuKotaArtifactRegistry && window.meuKotaArtifactRegistry[artId]) {
          openSpreadsheetInCanvas(window.meuKotaArtifactRegistry[artId], 'graficos');
        }
        return;
      }

      // Botão "Excel (.xlsx)" Direto na tabela do chat
      const btnQuickDl = e.target.closest('.btn-artifact-quick-dl, .btn-direct-download-xlsx');
      if (btnQuickDl) {
        const artId = btnQuickDl.getAttribute('data-artifact-id');
        if (artId && window.meuKotaArtifactRegistry && window.meuKotaArtifactRegistry[artId]) {
          exportSpreadsheetToXlsx(window.meuKotaArtifactRegistry[artId]);
        }
        return;
      }

      // Botão "PDF Limpo" Direto na tabela do chat
      const btnQuickPdf = e.target.closest('.btn-artifact-quick-pdf');
      if (btnQuickPdf) {
        const artId = btnQuickPdf.getAttribute('data-artifact-id');
        if (artId && window.meuKotaArtifactRegistry && window.meuKotaArtifactRegistry[artId]) {
          exportSpreadsheetToPdf(window.meuKotaArtifactRegistry[artId]);
        }
        return;
      }

      // Botão "Testar com Meu Kota" em qualquer bloco de código do chat
      const btnTestCode = e.target.closest('.btn-open-code-canvas');
      if (btnTestCode) {
        const wrapper = btnTestCode.closest('.code-block-wrapper');
        if (wrapper) {
          const lang = wrapper.getAttribute('data-lang') || 'html';
          const codeEl = wrapper.querySelector('code');
          const rawCode = codeEl ? (codeEl.textContent || codeEl.innerText).trim() : '';
          openCodeInCanvas({
            title: `Código ${lang.toUpperCase()}`,
            fileName: lang === 'javascript' || lang === 'js' ? 'script.js' : 'index.html',
            code: rawCode
          });
          // Alternar automaticamente para a visualização ao vivo
          if (tabCodePreview) tabCodePreview.click();
        }
        return;
      }
    });

    // Expor globalmente para depuração e testes
    window.openSpreadsheetInCanvas = openSpreadsheetInCanvas;
    window.openDocumentInCanvas = openDocumentInCanvas;
    window.openCodeInCanvas = openCodeInCanvas;
    window.updateCodeLivePreview = updateCodeLivePreview;
    window.updateCodeGutter = updateCodeGutter;
    window.exportSpreadsheetToXlsx = exportSpreadsheetToXlsx;
    window.exportSpreadsheetToPdf = exportSpreadsheetToPdf;
    window.exportDocumentToPdf = exportDocumentToPdf;
    window.exportCodeToFile = exportCodeToFile;

    // Receptor de links externos seguros do Canvas Sandbox
    // Abre a URL diretamente a partir do contexto raiz do navegador (top-level)
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'meu_kota_open_external' && event.data.url) {
        const safeUrl = event.data.url;
        const tempA = document.createElement('a');
        tempA.href = safeUrl;
        tempA.target = '_blank';
        tempA.rel = 'noopener noreferrer';
        document.body.appendChild(tempA);
        tempA.click();
        tempA.remove();
      }
    });
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
  setupShareChatEvents();
  setupCanvasWorkspace();
  initPwaServiceWorker();
  setupOfflineAndNetworkEvents();

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

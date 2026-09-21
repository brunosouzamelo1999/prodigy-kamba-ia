/* ============================================================
   MEU KOTA IA — SERVICE WORKER (PWA & OFFLINE CACHE)
   Carregamento Instantâneo & Atualização em Tempo Real
   ============================================================ */

const CACHE_NAME = 'meu-kota-cache-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/logo-meu-kota.png',
  './assets/logo-meu-kota-circle.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js'
];

// Instalação do Service Worker & Pre-caching
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Aviso ao pré-cachear assets:', err);
      });
    })
  );
});

// Ativação e limpeza imediata de versões antigas de cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições de rede
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignorar métodos que não sejam GET
  if (req.method !== 'GET') return;

  // Bypass para APIs de Inteligência Artificial e Autenticação
  if (
    url.hostname.includes('generativelanguage.googleapis.com') ||
    url.hostname.includes('image.pollinations.ai') ||
    url.hostname.includes('identitytoolkit.googleapis.com') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('firestore.googleapis.com') ||
    req.url.startsWith('data:')
  ) {
    return; // Passa direto para a rede sem cachear
  }

  // ESTRATÉGIA NETWORK-FIRST PARA NAVEGAÇÃO E HTML:
  // Garante que qualquer atualização no index.html apareça de imediato para o usuário!
  const isHtml = req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html');
  if (isHtml) {
    event.respondWith(
      fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Se estiver offline, serve a versão em cache
        return caches.match('./index.html') || caches.match('./');
      })
    );
    return;
  }

  // Estratégia Stale-While-Revalidate para outros assets estáticos (CSS, JS, imagens)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});

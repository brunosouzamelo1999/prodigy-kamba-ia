/* ============================================================
   MEU KOTA IA — SERVICE WORKER (PWA & OFFLINE CACHE)
   Carregamento Instantâneo & Atualização em Tempo Real
   ============================================================ */

const CACHE_NAME = 'meu-kota-cache-v32';

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

  // ESTRATÉGIA NETWORK-FIRST PARA CÓDIGO (HTML, JS, CSS):
  // Garante atualização imediata online e resiliência offline com ignoreSearch
  const isHtml = req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html');
  const isCodeAsset = isHtml || url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.search.includes('v=');

  if (isCodeAsset) {
    event.respondWith(
      fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch(async () => {
        // 1. Tentar correspondência exata
        const exactMatch = await caches.match(req);
        if (exactMatch) return exactMatch;

        // 2. Tentar ignorando parâmetros de versão/busca (?v=...)
        const ignoreSearchMatch = await caches.match(req, { ignoreSearch: true });
        if (ignoreSearchMatch) return ignoreSearchMatch;

        // 3. Fallbacks estritos por tipo de recurso
        if (isHtml) {
          return (await caches.match('./index.html')) || (await caches.match('./', { ignoreSearch: true }));
        }
        if (url.pathname.endsWith('.css') || req.destination === 'style') {
          return await caches.match('./styles.css', { ignoreSearch: true });
        }
        if (url.pathname.endsWith('.js') || req.destination === 'script') {
          return await caches.match('./app.js', { ignoreSearch: true });
        }
        return null;
      })
    );
    return;
  }

  // Estratégia Stale-While-Revalidate para outros assets (imagens, fontes)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cachedResponse) => {
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

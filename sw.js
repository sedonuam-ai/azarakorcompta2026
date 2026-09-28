// S.A.M.COMPTA — Service worker : mise en cache pour un fonctionnement 100% hors ligne.
// Incrémenter CACHE_NAME à chaque nouvelle version déployée pour forcer la mise à jour du cache.
const CACHE_NAME = 'samcompta-cache-v3';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-48.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        PRECACHE_URLS.map((url) => cache.add(url).catch(() => null))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// Stratégie : cache d'abord, puis réseau (et mise à jour silencieuse du cache).
// Fonctionne entièrement hors connexion une fois la première visite effectuée.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached || caches.match('./index.html'));
      return cached || network;
    })
  );
});

const CACHE_NAME = 'cronicas-rpg-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/favicon.svg',
  '/site.webmanifest',
  '/hero-bg.webp',
  '/vampire-bg.webp',
  '/cyberpunk-bg.webp',
  '/arsenal-bg.webp',
  '/monster-bg.webp',
  '/inheritance-bg.webp',
  '/metal-bg.webp',
  '/monastery-bg.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure, continuing:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // Stale-While-Revalidate for local assets
  if (request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});

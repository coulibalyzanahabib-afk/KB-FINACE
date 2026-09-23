/**
 * KB Finance — Service Worker
 * Stratégie : Cache-First pour les assets, Network-First pour les données
 * Version : 1.0.0
 */

const CACHE_NAME    = 'kb-finance-v1';
const CACHE_STATIC  = 'kb-static-v1';
const OFFLINE_URL   = '/offline.html';

// Ressources à mettre en cache immédiatement
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/favicon.svg',
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

/* ── INSTALL : pré-cacher les ressources critiques ── */
self.addEventListener('install', event => {
  console.log('[SW] Installation KB Finance v1');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pré-cache des ressources');
        return cache.addAll(PRECACHE_URLS.map(url => new Request(url, { mode: 'no-cors' })))
          .catch(err => console.warn('[SW] Pré-cache partiel:', err));
      })
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE : supprimer les anciens caches ── */
self.addEventListener('activate', event => {
  console.log('[SW] Activation');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_STATIC)
          .map(k => {
            console.log('[SW] Suppression ancien cache:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH : stratégie Cache-First avec fallback réseau ── */
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Ne pas intercepter les requêtes non-GET
  if (req.method !== 'GET') return;

  // Stratégie selon le type de ressource
  if (url.origin === location.origin) {
    // Ressources locales : Cache-First
    event.respondWith(cacheFirst(req));
  } else if (url.hostname.includes('fonts.googleapis') ||
             url.hostname.includes('fonts.gstatic') ||
             url.hostname.includes('jsdelivr')) {
    // CDN externes : Stale-While-Revalidate
    event.respondWith(staleWhileRevalidate(req));
  } else {
    // Autres : Network-First
    event.respondWith(networkFirst(req));
  }
});

/* ── Stratégies de cache ── */

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const response = await fetch(req);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, response.clone());
    }
    return response;
  } catch {
    const offline = await caches.match(OFFLINE_URL);
    return offline || new Response('Hors ligne', { status: 503 });
  }
}

async function networkFirst(req) {
  try {
    const response = await fetch(req);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(req);
    return cached || caches.match(OFFLINE_URL);
  }
}

async function staleWhileRevalidate(req) {
  const cache    = await caches.open(CACHE_STATIC);
  const cached   = await cache.match(req);
  const fetchProm = fetch(req).then(response => {
    if (response.ok) cache.put(req, response.clone());
    return response;
  }).catch(() => null);
  return cached || fetchProm;
}

/* ── Message du client (ex: forcer la mise à jour) ── */
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});

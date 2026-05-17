/* ============================================
   静界 Service Worker
   离线缓存策略: Cache First (静态资源)
   ============================================ */

const CACHE_NAME = 'jingjie-v2';
const STATIC_ASSETS = [
  '/jingjie/',
  '/jingjie/index.html',
  '/jingjie/yuedu.html',
  '/jingjie/riqian.html',
  '/jingjie/timer.html',
  '/jingjie/diary.html',
  '/jingjie/videos.html',
  '/jingjie/rumen.html',
  '/jingjie/experience.html',
  '/jingjie/about.html',
  '/jingjie/404.html',
  '/jingjie/css/style.css',
  '/jingjie/js/main.js',
  '/jingjie/js/riqian.js',
  '/jingjie/js/yuedu.js',
  '/jingjie/js/yuedu-data.js',
  '/jingjie/js/yuedu-data-confucian.js',
  '/jingjie/js/yuedu-data-zhuangzi.js',
  '/jingjie/js/timer.js',
  '/jingjie/js/diary.js',
  '/jingjie/manifest.json'
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('SW cache-all partial:', err);
        // Continue even if some fail (e.g. fonts from external CDN)
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first strategy for static assets, network-first for pages
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests and external resources
  if (event.request.method !== 'GET') return;
  if (url.hostname !== self.location.hostname) return;
  if (!url.pathname.startsWith('/jingjie')) return;

  // For navigation (HTML pages): network-first with cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then(resp => {
          return resp || caches.match('/jingjie/index.html');
        });
      })
    );
    return;
  }

  // For static assets: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Don't cache opaque responses
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      }).catch(err => {
        // Offline fallback for non-HTML: just fail gracefully
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/jingjie/index.html');
        }
        throw err;
      });
    })
  );
});

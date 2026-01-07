const cacheName = 'lifemgr-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './dexie.js',
  './chart.js',
  './iconn.png'
];

// 1. Install Event: Saves everything to the device
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('App Shell: Caching local assets');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event: Deletes old versions of the app
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serve from Cache, then Network
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      // Return cached file if found, otherwise try network
      return cacheRes || fetch(evt.request).catch(() => {
        // Fallback if both fail (e.g., trying to load a new page offline)
        if (evt.request.url.indexOf('.html') > -1) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
                               

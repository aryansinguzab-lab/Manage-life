const cacheName = 'lifemgr-v1';
const assets = [
  '/Manage-life/index.html',
  '/Manage-life/manifest.json',
  
  '/Manage-life/dexie.js'
  '/Manage-life/icon.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => {
      return res || fetch(evt.request);
    })
  );
});

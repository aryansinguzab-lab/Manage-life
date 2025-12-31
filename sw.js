const cacheName = 'lifemgr-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './dexie.js',
  './chart.js',
  './icon.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      // we use return here to ensure the promise resolves correctly
      return cache.addAll(assets);
    }).catch(err => console.error("Cache addAll failed:", err))
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => {
      return res || fetch(evt.request);
    })
  );
});

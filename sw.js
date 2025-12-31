const cacheName = 'lifemgr-v1';
const assets = [
  '/Manage-life/',
  '/Manage-life/index.html',
  '/Manage-life/manifest.json',
  '/Manage-life/dexie.js', // Added missing comma here
  '/Manage-life/chart.js', // Added this so your reports work offline
  '/Manage-life/icon.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      // It's better to use addAll to ensure everything is saved
      return cache.addAll(assets);
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

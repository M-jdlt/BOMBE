// service-worker.js
const CACHE_NAME = 'bomb-game-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/qrData.json',
  '/chime.mp3',
  '/explosion.mp3',
  '/tick.mp3',
  '/icon-180x180.png'
];

// Install event – cache all required files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  console.log('Service Worker installed and files cached');
});

// Fetch event – serve from cache first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event – clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  console.log('Service Worker activated');
});

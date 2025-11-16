const CACHE_NAME = "bomb-game-cache-v1";

const ASSETS_TO_CACHE = [
  "/", 
  "/index.html",
  "/manifest.json",
  "/service-worker.js",

  // IMAGES
  "/images/icon-192.png",
  "/images/icon-512.png",

  // SOUNDS (IMPORTANT!)
  "/sounds/tick.mp3",
  "/sounds/chime.mp3",
  "/sounds/explosion.mp3",

  // LIBRARY
  "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

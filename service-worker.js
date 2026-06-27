// Service worker mínimo — necesario para que Chrome considere el sitio "instalable".
// Cachea el archivo principal para que también abra si por un instante no hay señal.
const CACHE = "tagger-rival-v1";
const ASSET = "./index.html";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.add(ASSET).catch(function () {});
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    })
  );
});

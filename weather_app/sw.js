const CACHE_NAME = "weather_v1";

const assetsToCache = [
  "/",
  "style.css",
  "images/beach-removebg-preview.png",
  "images/clear.png",
  "images/cloud.jpg",
  "images/clouds.png",
  "images/drizzle.png",
  "images/rain.png",
  "images/snow.png",
  "images/sunny.png",
  "images/thunderstorm.png",
  "images/touch/homescreen48.png",
  "images/touch/homescreen72.png",
  "images/touch/homescreen96.png",
  "images/touch/homescreen144.png",
  "images/touch/homescreen168.png",
  "images/touch/homescreen192.png",
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching assets...");
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", (ev) => {
  ev.respondWith(
    caches.match(ev.request).then((response) => {
      console.log("[Service Worker] Serving from cache...");
      return (
        response ||
        fetch(ev.request).then((resp) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(ev.request, resp.clone());
            console.log("[Service Worker] Serving from URL...");
            return resp;
          });
        })
      );
    })
  );
});

var CACHE_NAME = "pwa-cache-v1";
var urlsToCache = [
  "/",
  "/fallback.json",

  // html
  "/src/characters/Eevee/*.html",
  "/src/characters/Pikachu/*.html",
  "/src/characters/Snivy/*.html",
  "/src/characters/Squirtle/*.html",

  // js
  "/src/js/*.js",
  "/src/js/character1/*.js",
  "/src/js/character2/*.js",
  "/src/js/character3/*.js",
  "/src/js/character4/*.js",

  // img
  "/src/img/*.png",
  "/src/img/about/*.png",
  "/src/img/food_icon/*.png",
  "/src/img/ikon/*.png",
  "/src/img/main_bg/*.jpg",
  "/src/img/character1/*.png",
  "/src/img/character2/*.png",
  "/src/img/character3/*.png",
  "/src/img/character4/*.png",

  // resources
  "/src/resources/*.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName != CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// fetch
self.addEventListener("fetch", (event) => {
  var request = event.request;
  var url = new URL(request.url);

  // pisahkan request API dan Internal
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request);
      })
    );
  } else {
    event.respondWith(
      caches.open("pwa-cache-v1").then(function (cache) {
        return fetch(request)
          .then(function (liveResponse) {
            cache.put(request, liveResponse.clone());
            return liveResponse;
          })
          .catch(function () {
            return caches.match(request).then(function (response) {
              if (response) return response;
              return caches.match("/fallback.json");
            });
          });
      })
    );
  }
});

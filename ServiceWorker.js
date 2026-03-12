const cacheName = "DefaultCompany-ZapparTest-0.1.0";
const contentToCache = [
    "Build/c9ee1094d24be02fc01f0d1bd0012c4b.loader.js",
    "Build/f5236769f0387c59edf81885204e5a91.framework.js",
    "Build/8e2999283914ccb3e21efcd115b1c9da.data",
    "Build/5bdaf455e58bd7010a2e8fb2a35dbf27.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

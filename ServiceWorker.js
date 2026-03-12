const cacheName = "DefaultCompany-ZapparTest-0.1.0";
const contentToCache = [
    "Build/a31d99b6334a74a4b74828fae5fec6d2.loader.js",
    "Build/21ecd63a96adbb71f089a36e4b4b6bf2.framework.js",
    "Build/b685393d666aebf2ac444a9d35b10bcf.data",
    "Build/b10054b0acf85bf33aa753b93ef67e3e.wasm",
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

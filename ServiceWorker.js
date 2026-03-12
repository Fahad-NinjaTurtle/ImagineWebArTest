const cacheName = "DefaultCompany-ZapparTest-0.1.0";
const contentToCache = [
    "Build/9d47dd25563183c524d4b74e00311428.loader.js",
    "Build/74e129268b9db62e5c9d8f79ef79d3c1.framework.js",
    "Build/88830afc2e2730fc61761587c6d7181f.data",
    "Build/c2ed04b420218a6661c069bb89e696c7.wasm",
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

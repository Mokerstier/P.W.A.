const CORE_CACHE_NAME = 'v3'
const CORE_ASSETS = [
  '/css/index.css',
  '/img/dota-2-logo-192.png',
]
// const e = require("express");

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CORE_CACHE_NAME)
    .then(cache => cache.addAll(CORE_ASSETS))
    .then(()=> self.skipWaiting())
  )
  
  // event.waitUntil(
  //   caches.open('mysite-static-v3').then(function(cache) {
  //     return cache.addAll([
  //       '/css/index.css',
  //       '/img/pngfind.com-dota-2-logo-png-774896.png',
        
  //       // etc
  //     ]);
  //   })
  // );
});

self.addEventListener("fetch", (e)=>{
  console.log(e.request)
  const req = e.request
  e.respondWith(
    caches.match(req).then(cachedRes =>{
        return cachedRes || fetch(req).then((response) =>{
          let responseClone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(e.request, responseClone);
        })
        return response
      })
    }).catch(()=>{
      return caches.match('/img/dota-2-logo-192.png')
    })
  )
})
        
  
self.addEventListener('activate', (event) => {
  var cacheKeeplist = ['v2'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
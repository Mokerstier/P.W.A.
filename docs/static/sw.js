const CORE_CACHE_NAME = 'v4'
const CORE_ASSETS = [
  '/css/index.css',
  '/img/dota-2-offline.png',
  '/img/dota-2-logo-192.png',
]


self.addEventListener('install',(e) => {
  e.waitUntil(
    caches.open(CORE_CACHE_NAME)
    .then(cache => cache.addAll(CORE_ASSETS))
    .then(()=> self.skipWaiting())
  )
});

self.addEventListener("fetch", (e) => {
  // console.log(e.request)
  const req = e.request

  e.respondWith(
    caches.match(req).then(cachedRes => {
        return cachedRes || fetch(req).then((response) =>{
          const responseClone = response.clone();
        caches.open(CORE_CACHE_NAME).then((cache) => {
          cache.put(req, responseClone);
        })
        return response
      })
    }).catch(()=>{
      return caches.match('/img/dota-2-offline.png')
    })
  )
})

// function fetchAndCache(request, chacheName){
//   return cachedRes || fetch(req).then((response) =>{
//           let responseClone = response.clone();
//         caches.open(CORE_CACHE_NAME).then((cache) => {
//           cache.put(req, responseClone);
//         })
//         return response
//       })
// }
  
self.addEventListener('activate', (event) => {
  var cacheKeeplist = [CORE_CACHE_NAME];

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
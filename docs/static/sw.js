const CORE_CACHE_NAME = 'v3'
const CORE_ASSETS = [
  '/css/index.css',
  '/img/dota-2-offline.png',
  '/img/dota-2-logo-192.png',
]

// self.addEventListener("install", event => {
//   console.log("Installing service worker");

//   event.waitUntil(
//       caches.open(CORE_CACHE_NAME).then(function (cache) {
//           return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());
//       })
//   );
// });

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CORE_CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  )
});

self.addEventListener("fetch", event => {

  const req = event.request
  if (isCoreGetRequest(req)) {
    console.log("Core get request: ", req.url);
    // cache only strategy
    event.respondWith(
      caches
        .open(CORE_CACHE_NAME)
        .then(cache => cache.match(event.request.url))
    );
  } else if (isHtmlGetRequest(event.request)) {
    console.log("html get request", event.request.url);
    // generic fallback
    console.log(req)
    event.respondWith(
      
      caches
        .open("html-cache")
        .then(cache => cache.match(event.request.url))
        // .then(response =>
        //   response.headers.match ? response : fetchAndCache(event.request, "html-cache")
        // )
        .catch(event => {
          console.log(event)
          debugger
          return caches
            .open(CORE_CACHE_NAME)
            .then(cache => cache.match('/img/dota-2-offline.png'));
        })
    );
  }
});

//   e.respondWith(
//     caches.match(req.url).then(cachedRes => {
//       // console.log("html get request", req.url);
//          if (cachedRes){
//          response.headers.match ? response : fetchAndCache(event.request, "html-cache")
//}
//         return cachedRes || fetch(req).then((response) =>{
//           console.log(req)
//           const responseClone = response.clone();
//         caches
//         .open(CORE_CACHE_NAME)
//         .then((cache) => {
//           cache.put(req, responseClone);
//         })
//         return response
//       })
//     }).catch(()=>{
//       return caches.match('/img/dota-2-offline.png')
//     })
//   )
// })

// self.addEventListener("activate", event => {
//   console.log("Activating service worker");
//   event.waitUntil(clients.claim());
// });
// self.addEventListener("fetch", event => {
//   console.log("Fetch event: ", event.request.url);
//   if (isCoreGetRequest(event.request)) {
//       console.log("Core get request: ", event.request.url);
//       // cache only strategy
//       event.respondWith(
//           caches
//           .open(CORE_CACHE_NAME)
//           .then(cache => cache.match(event.request.url))
//       );
//   } else if (isHtmlGetRequest(event.request)) {
//       console.log("html get request", event.request.url);
//       // generic fallback
//       event.respondWith(
//           caches
//           .open("html-cache")
//           .then(cache => cache.match(event.request.url))
//           .then(response =>
//               response.headers.match ? response : fetchAndCache(event.request, "html-cache")
//           )
//           .catch(event => {
//               return caches
//                   .open(CORE_CACHE_NAME)
//                   .then(cache => cache.match('/img/dota-2-offline.png'));
//           })
//       );
//   }
// });


// function fetchAndCache(request, chacheName){
//   return cachedRes || fetch(req).then((response) =>{
//           let responseClone = response.clone();
//         caches.open(CORE_CACHE_NAME).then((cache) => {
//           cache.put(req, responseClone);
//         })
//         return response
//       })
// }
// self.addEventListener("fetch", (e) => {
//   // console.log(e.request)
//   const req = e.request

//   e.respondWith(
//     caches.match(req).then(cachedRes => {
//         return cachedRes || fetch(req).then((response) =>{
//           const responseClone = response.clone();
//         caches.open(CORE_CACHE_NAME).then((cache) => {
//           cache.put(req, responseClone);
//         })
//         return response
//       })
//     }).catch(()=>{
//       return caches.match('/img/dota-2-offline.png')
//     })
//   )
// })
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

/**
 * Get a pathname from a full URL by stripping off domain
 *
 * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index.css
 * @returns {String}                Relative url to the domain, e.g. index.css
 */
function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}
/**
 * Checks if a request is a GET and HTML request
 *
 * @param {Object} request        The request object
 * @returns {Boolean}            Boolean value indicating whether the request is a GET and HTML request
 */
function isHtmlGetRequest(request) {
  return (
    request.method === "GET" &&
    request.headers.get("accept") !== null &&
    request.headers.get("accept").indexOf("text/html") > -1
  );
}
/**
 * Checks if a request is a core GET request
 *
 * @param {Object} request        The request object
 * @returns {Boolean}            Boolean value indicating whether the request is in the core mapping
 */
function isCoreGetRequest(request) {
  return (
    request.method === "GET" && CORE_ASSETS.includes(getPathName(request.url))
  );
}
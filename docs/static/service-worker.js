const CORE_CACHE_VERSION = "v5";
const CORE_ASSETS = [
  '/css/index-ac53320c90.css',

  '/img/dota-2-logo-192.png',
  '/img/dota-2-offline.png',

  '/offline.html',
  '/404.html'
];

self.addEventListener("install", event => {
  console.log("Installing service worker");
  event.waitUntil(
    caches.open(CORE_CACHE_VERSION).then(function(cache) {
      return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());

    })
  );
});

self.addEventListener('activate', (event) => {
  var cacheKeeplist = [CORE_CACHE_VERSION];

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

self.addEventListener("fetch", event => {
  if (isCoreGetRequest(event.request)) {
    //console.log("Core get request: ", event.request.url);
    // cache only strategy
    event.respondWith(
      caches
        .open(CORE_CACHE_VERSION)
        .then(cache => cache.match(event.request.url))
    );
 
  } else if (isHtmlGetRequest(event.request)) {
    // generic fallback
    event.respondWith(
      caches
        .open("html-cache")
        .then(cache => cache.match(event.request.url))
        
        .then(response =>
          response ? response : fetchAndCache(event.request, "html-cache")
        )
        .catch(e => {
          console.log(e)
          return caches
            .open(CORE_CACHE_VERSION)
            .then(cache => cache.match('/img/dota-2-offline.png'));
        })
    );
  } else if(isImgGetRequest(event.request)) {
    event.respondWith(
    caches.match(event.request.url).then(cachedRes => {
        return cachedRes || fetch(event.request).then((response) =>{
        const responseClone = response.clone();
        caches
        .open("dump-cache")
        .then((cache) => {
          cache.put(event.request, responseClone);
        })
        return response
      })
    }).catch(()=>{
      return caches.match('/img/dota-2-offline.png')
    })
  )
  }
});

function fetchAndCache(request, cacheName) {
  return fetch(request).then(response => {
    if (!response.ok) {
      throw new TypeError("Bad response status");
    }

    const clone = response.clone();
    caches
      .open(cacheName)
      .then(cache => cache.put(request, clone));
    return response;
  });
}

function isImgGetRequest(request){
  return( 
    request.method === "GET" &&
    request.destination === "image"
  )
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

/**
 * Get a pathname from a full URL by stripping off domain
 *
 * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index-ac53320c90.css
 * @returns {String}                Relative url to the domain, e.g. index.css
 */
function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {
      return cache.addAll([
        '/css/index.css',
        '/img/pngfind.com-dota-2-logo-png-774896.png',
        
        // etc
      ]);
    })
  );
});
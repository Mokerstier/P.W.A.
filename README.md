# Progressive Web Apps DOTA2API · 2019-2020
## [LIVE DEMO](https://dota2api.herokuapp.com/)

![Screenshot](https://github.com/Mokerstier/progressive-web-apps-1920/blob/inlog/repo-img/DOTA2API.png)

## Concept
Server side rendered web-app that makes use of the [OpenDota API](https://docs.opendota.com/). User can look up DOTA2 heroes and look up their stats. Also user can see their current match history up to 20 games.

#### FEATURES
- Overview page with all heroes available in DOTA2
- Detail page of the heroes
- Recent matches played (only recent matches I played)
- ~~Login~~ (didnt have enough time to implement)

### Server Side Rendering 📡

### Progressive Web App 🚀


### Critical Rendering Path 📉 

To improve the rendering path of the app the following methods are used to enhance loading time and TTFP (time to first paint) 
#### Minify CSS

Loading critical files like CSS and JS are necessary for a smooth application. Therefore waiting on these crucial files are a pain. With minify and clean css I tried to reduce the size and loading time of my critical CSS files.
##### Loading time BEFORE using Build-CSS script
![No clean CSS](https://github.com/Mokerstier/progressive-web-apps-1920/blob/inlog/repo-img/no-clean-css.png)

To do this I use a build-css script that compiles all my CSS files into 1 file minifies it and writes it to the static folder.
The build script:

```
return gulp.src([
    "./src/css/*.css",
  ])
    .pipe(concat("index.css"))
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest("./docs/static/css"))
```
##### Loading time AFTER using Build-CSS script
![Clean CSS](https://github.com/Mokerstier/progressive-web-apps-1920/blob/inlog/repo-img/clean-css.png)

A total of 14ms are won because of the minifier. Note: my application isn't really big and I dont have allot CSS. But imagine what this method could do if you are running a greater application. WOW!

#### Minify JS
I have little to zero server-side javascript so the results of compression are minimal so the results of these compression are not shown.

For compression of the js I used the same approach as the CSS build:
```
return gulp.src([
        './src/js/*.js'
    ])
    
    .pipe(concat('bundle.min.js'))
    
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./docs/static/js'))
```

#### Express Compression 
By using this middleware function with express, files are compressed with gzip. With this method all headers sent by the server to the client. By default a compression is used that compromises between speed and compression (zlib.Z_DEFAULT_COMPRESSION points). [Source](https://expressjs.com/en/resources/middleware/compression.html)

How to implement:
`npm install compression` and erquire the package: `const compression = require('compression')`
 then make sure to use the compression as high as possible. All requests pas through the middleware will be compressed.

```
app.use(compression())
```
#### Service worker
With compression and the buildsteps mentioned above all is done to reduce file size and loading time. Nevertheless there is still a giant wait time on the TTFB (time to first byte). This problem can be easily tackled with a cahcing strategy!

Therfore I used a service worker that serves all my static files from the cache.

On first visit the service worker tells the browser to cache my critical files:
```
const CORE_ASSETS = [
  '/css/index.css',
  '/offline.html',
  '/img/dota-2-logo-192.png',
  '/img/dota-2-offline.png',
  '/404.html'
];
```
This way the browser doesnt have to make a request to the server when fetching the CSS, offline page and error page, reducing the TTFB significantly.

![Cache strat](https://github.com/Mokerstier/progressive-web-apps-1920/blob/inlog/repo-img/Cache-TTFB.png)

The service worker also caches all visited pages making them availeble even when the user is offline.

Approach:
```
} else if (isHtmlGetRequest(event.request)) {
    
    console.log("html get request", event.request.url);
    // generic fallback
    event.respondWith(
      caches
        .open("html-cache")
        .then(cache => cache.match(event.request.url))
        .then(response => console.log(response)
        )
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
```
This apporach checks if a HTML request was made and if so it fetches the request from the server and stores it in HTML-cache with `fetchAndCache(event.request, "html-cache")`

The fetch and cache function
```
function fetchAndCache(request, cacheName) {
  return fetch(request).then(response => {
    console.log(response)
    if (!response.ok) {
      throw new TypeError("Bad response status");
    }

    const clone = response.clone();
    console.log("clone "+clone)
    caches
      .open(cacheName)
      .then(cache => cache.put(request, clone));
    return response;
  });
}
```
The same was done for the images:

Because the application makes use of images form another source which I dont controll and they significantly increase the loading time of the page, I decided to cache all the images with the service worker.

Approach:
```
else if(isImgGetRequest(event.request)) {
    event.respondWith(
    caches.match(event.request.url).then(cachedRes => {
      // console.log("html get request", req.url);
        return cachedRes || fetch(event.request).then((response) =>{
          console.log("this is the img Fetch response: ",response)
        const responseClone = response.clone();
        caches
        .open("dump-cache")
        .then((cache) => {
          cache.put(event.request, responseClone);
        })
        return response
      })
    }).catch(()=>{
      console.log(response.ok)
      debugger
      return caches.match('/img/dota-2-offline.png')
    })
  )
  }
```
### Conclusion
Results are amazing with all strategys mentioned above combined, the loading times and thereby the waiting times are reduced with approximatly a full second for TTI (time to interactive) and about half a second for the FMP (first meaningfull paint) as seen below:

![Results](https://github.com/Mokerstier/progressive-web-apps-1920/blob/inlog/repo-img/results.png)

![performance](https://github.com/Mokerstier/progressive-web-apps-1920/blob/inlog/repo-img/Conclusion.png)



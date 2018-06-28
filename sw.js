const mainCache = "restaurant-reviews-v1";

self.addEventListener('install', function(evt) {
	//installation will finish only after all files are cached
	evt.waitUntil(
		caches.open(mainCache).then(function(cache) {
			return cache.addAll([
				'index.html',
				'restaurant.html',
				'css/styles.css',
				'css/styles-rest.css',
				'css/media.css',
				'css/media-rest.css',
				'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'data/restaurants.json',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/rest.jpg'
			]);
		}).catch(function(err){
			console.log("error in load files in cache", err);
		})
	);
});


//update cache and delete older caches
self.addEventListener('activate', function(evt) {
	evt.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') && cacheName != mainCache;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

//fetch files from cache or network
self.addEventListener('fetch', function(evt) {
	console.log('Handling fetch event for', evt.request.url);
	evt.respondWith(
		caches.match(evt.request).then(function(response) {

			if(response) {
				console.log('Found response in cache:', response);
				return response;
			}

			console.log('No response in cache. Fetching from network..');

			return fetch(evt.request).then(function(response) {
				console.log('Response from network is:', response);
				return response;
			}).catch(function(err) {
				console.log('Fetching failed', err);
			});
		
		})
	);
});
const cacheName = "DropIt-cache-v1"
const urlsToCache = [
    'index.html',
    'offline.html',
]

// Installation
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

//Listen Request
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request)
                .catch(() => caches.match('offline.html'));
        })
    );
});

//Activating

self.addEventListener('activate', function(event) {
    console.log('Service Worker is been updated...')
    const cacheWhiteList = [];
    cacheWhiteList.push(cacheName);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})
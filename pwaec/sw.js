const CACHE_NAME = 'ecommerce-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Sync event
self.addEventListener('sync', event => {
    if (event.tag === 'sync-cart') {
        event.waitUntil(
            // Add your sync logic here
            console.log('Background sync triggered')
        );
    }
});

// Push event
self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'https://via.placeholder.com/192'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
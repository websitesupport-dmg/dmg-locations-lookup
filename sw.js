self.addEventListener('install', event => {
  // take control immediately
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // very small offline-responder: try network, otherwise a fallback (optional)
  event.respondWith(
    fetch(event.request).catch(() => {
      // return a simple offline response for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
      return new Response('', { status: 503, statusText: 'offline' });
    })
  );
});

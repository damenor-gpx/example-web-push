// Register event listener for the 'push' event.
self.addEventListener('push', function (event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
  // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
  const payload = event.data ? event.data.text() : 'no payload'
  const title = 'Prueba de notificación push'

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    self.registration.showNotification('Prueba de notificación push', {
      body: payload,
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  let url = 'https://web-push.damenor.site/'
  event.notification.close() // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (const i = 0; i < windowClients.length; i++) {
        const client = windowClients[i]
        // If so, just focus it.
        if (client.url === url && 'focus' in client) return client.focus()
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})

// const CACHE_NAME = 'cache-v1'
// const filesToCache = ['/', '/index.html', '/main.js']

// self.addEventListener('install', e => {
//   console.log('[Service Worker] Install')
//   e.waitUntil(
//     caches.open(CACHE_NAME).then(cache => {
//       console.log('[Service Worker] Caching all: app shell and content')
//       return cache.addAll(filesToCache)
//     }).catch(err => console.log(err))
//   )
// })

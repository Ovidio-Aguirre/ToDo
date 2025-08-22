self.addEventListener('push', (event) => {
    // Si no hay datos, no hace nada
    const data = event.data ? event.data.json() : {};

    // Configura la notificación
    const title = data.title || 'Tienes un recordatorio';
    const options = {
        body: data.body || '¡Revisa tus tareas pendientes!',
        icon: 'images/icon-192x192.png',
        badge: 'images/icon-192x192.png',
        vibrate: [200, 100, 200], // Vibración personalizada
        sound: 'alarm.mp3' // Si tienes un archivo de sonido en tu app
    };

    // Muestra la notificación y espera a que se complete
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === 'http://localhost:3000/girlfriend_view.html' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/girlfriend_view.html');
            }
        })
    );
});

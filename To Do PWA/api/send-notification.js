const webpush = require('web-push');

// Reemplaza con tus propias claves VAPID
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
    'mailto:tu-email@example.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' });
        return;
    }

    const { subscription } = req.body;
    
    // Si no hay suscripción, no se puede enviar
    if (!subscription) {
        res.status(400).json({ message: 'Falta la suscripción' });
        return;
    }

    // El 'payload' es el contenido de la notificación
    const payload = JSON.stringify({
        title: '¡Recordatorio de tu novio!',
        body: '¡Revisa las tareas pendientes ahora!',
        sound: 'default' // Pide al sistema operativo que reproduzca el sonido predeterminado
    });

    try {
        await webpush.sendNotification(subscription, payload);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error al enviar la notificación:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

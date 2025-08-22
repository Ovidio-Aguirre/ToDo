// La URL del endpoint de tu Google Apps Script. DEBES REEMPLAZAR ESTO.
const SHEETS_API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Función para enviar una notificación a un usuario
async function sendNotification(message, recipientUsername) {
    try {
        const url = `${SHEETS_API_URL}?action=sendNotification&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipientUsername)}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === 'success') {
            console.log('Notificación enviada con éxito.');
        } else {
            console.error('Error al enviar la notificación:', result.message);
        }
        return result;
    } catch (error) {
        console.error('Error de red al enviar la notificación:', error);
        return { status: 'error', message: 'Error de red o de API.' };
    }
}
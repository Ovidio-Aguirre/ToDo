// Lógica para tu vista
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    // Carga las tareas al iniciar
    loadTasks();

    const alertBtn = document.getElementById('alert-btn');
    const statusMessage = document.getElementById('status-message');

    alertBtn.addEventListener('click', () => {
        // En un escenario real, aquí iría el token de suscripción de tu novia
        // Para este ejemplo, debes pegarlo manualmente una vez que tu novia lo obtenga
        // del navegador.
        const subscription = JSON.parse(localStorage.getItem('girlfriendSubscription'));
        
        if (!subscription) {
            statusMessage.textContent = 'Error: No se encontró la suscripción. Asegúrate de que tu novia haya activado las notificaciones.';
            statusMessage.style.color = '#dc3545';
            return;
        }

        statusMessage.textContent = 'Enviando alerta...';
        statusMessage.style.color = '#007bff';

        fetch('/api/send-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subscription })
        })
        .then(response => {
            if (response.ok) {
                statusMessage.textContent = '¡Alerta enviada con éxito!';
                statusMessage.style.color = '#28a745';
            } else {
                statusMessage.textContent = 'Hubo un error al enviar la alerta.';
                statusMessage.style.color = '#dc3545';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = 'Error de conexión. Revisa la consola para más detalles.';
            statusMessage.style.color = '#dc3545';
        });
    });
});

// Lógica para la vista de tu novia
document.addEventListener('DOMContentLoaded', () => {
    // Muestra la fecha y hora
    const updateDateTime = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        document.getElementById('datetime').textContent = now.toLocaleDateString('es-ES', options);
    };
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Actualiza el título dinámicamente
    const pageTitle = document.getElementById('page-title');
    pageTitle.textContent = "Mis Tareas Pendientes";

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

    // Lógica para el Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
                // Aquí, puedes guardar la suscripción si lo necesitas
                // Solo una vez que se tiene la suscripción, se puede enviar el token a tu vista
            })
            .catch(error => {
                console.error('Fallo en el registro del Service Worker:', error);
            });
    } else {
        console.warn('Este navegador no soporta Service Workers.');
    }
});

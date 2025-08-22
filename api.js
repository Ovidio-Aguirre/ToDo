// La URL del endpoint de tu Google Apps Script. DEBES REEMPLAZAR ESTO.
const SHEETS_API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Función para manejar el inicio de sesión
async function login(username, password) {
    try {
        const url = `${SHEETS_API_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Login error:', error);
        return { status: 'error', message: 'Error de red o de API.' };
    }
}

// Función para obtener todas las tareas
async function getTasks() {
    try {
        const response = await fetch(SHEETS_API_URL + '?action=getTasks');
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        return [];
    }
}

// Función para agregar una tarea
async function addTask(task) {
    try {
        const url = `${SHEETS_API_URL}?action=addTask&text=${encodeURIComponent(task.text)}&username=${encodeURIComponent(task.username)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        return { status: 'error', message: 'Error de red o de API.' };
    }
}

// Función para actualizar el estado de una tarea
async function updateTaskStatus(id, completed) {
    try {
        const url = `${SHEETS_API_URL}?action=updateStatus&id=${id}&completed=${completed}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        return { status: 'error', message: 'Error de red o de API.' };
    }
}

// Función para eliminar una tarea
async function deleteTask(id) {
    try {
        const url = `${SHEETS_API_URL}?action=deleteTask&id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        return { status: 'error', message: 'Error de red o de API.' };
    }
}


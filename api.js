// The URL of your Google Sheets API endpoint. YOU MUST REPLACE THIS.
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbw1yzZUinA_WAOitNfRaNVBVJIGIWLzKojQxDfCYn6GO_piiUTR9Q-o-cvjjQwcAaBeaQ/exec';

// Function to handle login
async function login(username, password) {
    try {
        const url = `${SHEETS_API_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Login error:', error);
        return { status: 'error', message: 'Network or API error.' };
    }
}

// Function to get all tasks
async function getTasks() {
    try {
        const response = await fetch(SHEETS_API_URL + '?action=getTasks');
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        return [];
    }
}

// Function to add a task
async function addTask(task) {
    try {
        const url = `${SHEETS_API_URL}?action=addTask&text=${encodeURIComponent(task.text)}&username=${encodeURIComponent(task.username)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding task:', error);
        return { status: 'error', message: 'Network or API error.' };
    }
}

// Function to update task status
async function updateTaskStatus(id, completed) {
    try {
        const url = `${SHEETS_API_URL}?action=updateStatus&id=${id}&completed=${completed}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating task:', error);
        return { status: 'error', message: 'Network or API error.' };
    }
}

// Function to delete a task
async function deleteTask(id) {
    try {
        const url = `${SHEETS_API_URL}?action=deleteTask&id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting task:', error);
        return { status: 'error', message: 'Network or API error.' };
    }
}


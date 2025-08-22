// Variable para almacenar el ID del task que se está editando
let editingTaskId = null;

// Carga las tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);
}

// Guarda las tareas en localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderiza la lista de tareas en el HTML
function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #888;">No hay tareas pendientes.</p>';
    } else {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.textContent = task.text;
            li.appendChild(textSpan);

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'task-actions';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.className = 'edit-btn';
            editBtn.onclick = () => editTask(task.id);
            actionsDiv.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => deleteTask(task.id);
            actionsDiv.appendChild(deleteBtn);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onclick = () => toggleTaskCompleted(task.id);
            actionsDiv.prepend(checkbox);

            li.appendChild(actionsDiv);
            taskList.appendChild(li);
        });
    }
}

// Agrega una nueva tarea o guarda la editada
function addTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (editingTaskId !== null) {
        // Editando una tarea existente
        const taskToEdit = tasks.find(t => t.id === editingTaskId);
        if (taskToEdit) {
            taskToEdit.text = text;
        }
        editingTaskId = null;
        document.getElementById('add-task-btn').textContent = 'Agregar';
    } else {
        // Agregando una nueva tarea
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
    }
    saveTasks(tasks);
    loadTasks();
}

// Marca una tarea como completada o incompleta
function toggleTaskCompleted(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id == id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        loadTasks();
    }
}

// Elimina una tarea
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    loadTasks();
}

// Pone una tarea en el campo de texto para editar
function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('task-input').value = task.text;
        document.getElementById('add-task-btn').textContent = 'Guardar';
        editingTaskId = id;
    }
}

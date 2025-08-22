<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Tareas</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="manifest" href="manifest.json">
    <!-- Favicon genérico -->
    <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/google/material-design-icons/master/png/action/done_black_18dp.png">
</head>
<body>

    <div class="container">
        <h1 id="page-title">Cargando...</h1>
        <p id="datetime"></p>

        <input type="text" id="task-input" placeholder="Agregar una nueva tarea...">
        <button id="add-task-btn">Agregar</button>

        <ul class="task-list" id="task-list"></ul>
    </div>
    
    <script src="js/common.js"></script>
    <script src="js/gf_app.js"></script>
</body>
</html>

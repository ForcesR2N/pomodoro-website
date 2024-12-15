<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pomodoro Timer</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/css/notes.css', 'resources/js/app.js'])
</head>
<body>
    @yield('content')

    <script type="module">
        import { Timer } from '@/js/Timer/timer';
        import TaskManager from '@/js/Notes/note';

        // Initialize Timer
        if (document.getElementById('timer')) {
            window.timer = new Timer();
        }

        // Initialize TaskManager
        if (document.getElementById('ongoing-tasks-list')) {
            window.taskManager = new TaskManager();
        }
    </script>
</body>
</html>

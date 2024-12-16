// resources/js/app.js
import './bootstrap';
import { Navbar } from '../views/components/Navbar/navbar.js';
import { Timer } from '../views/components/Timer/timer.js';
import TaskManager from './Notes/note.js';

document.addEventListener('DOMContentLoaded', function() {
    new Navbar();

    if (document.getElementById('timer')) {
        window.timer = new Timer();
    }

    if (document.getElementById('ongoing-tasks-list')) {
        window.taskManager = new TaskManager();
    }
});

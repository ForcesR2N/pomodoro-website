// resources/js/app.js
import './bootstrap';
import { Navbar } from '../views/components/Navbar/navbar.js';
import '../views/components/Timer/timer.js';

document.addEventListener('DOMContentLoaded', function() {
    new Navbar();
});

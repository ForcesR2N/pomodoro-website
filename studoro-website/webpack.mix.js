const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/Notes/note.js', 'public/js/Notes')
   .postCss('resources/css/app.css', 'public/css', [
       require('tailwindcss'),
   ])
   .version();  // Tambahkan ini untuk cache busting

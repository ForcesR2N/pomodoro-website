const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .postCss(['resources/css/app.css', 'resources/css/notes.css'], 'public/css', [
       require('tailwindcss'),
   ])
   .version();

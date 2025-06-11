const mix = require('laravel-mix');

// Compile JavaScript
mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/Notes/note.js', 'public/js/Notes')

   // Compile CSS with Tailwind
   .postCss('resources/css/app.css', 'public/css', [
       require('tailwindcss'),
       require('autoprefixer'),
   ])

   // Compile Notes CSS
   .postCss('resources/css/notes.css', 'public/css', [
       require('autoprefixer'),
   ])

   // Options for development
   .options({
       processCssUrls: false,
       postCss: [
           require('tailwindcss'),
           require('autoprefixer'),
       ]
   })

   // Enable source maps in development
   .sourceMaps(false, 'source-map')

   // Version files for cache busting in production
   .version()

   // Enable hot reloading for development
   .browserSync({
       proxy: 'localhost:8000', // Sesuaikan dengan port Laravel kamu
       open: false,
       files: [
           'app/**/*.php',
           'resources/views/**/*.php',
           'resources/js/**/*.js',
           'resources/css/**/*.css'
       ]
   });

// Configure for development vs production
if (mix.inProduction()) {
    mix.version();
} else {
    mix.options({
        hmrOptions: {
            host: 'localhost',
            port: 8080
        }
    });
}

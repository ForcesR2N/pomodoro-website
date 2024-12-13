import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', 'sans-serif'],
            },
            spacing: {
                '21': '5.25rem',  // Adds a custom width value of 5.25rem (84px)
                '22': '8rem',
                '23': '15rem',
                '24': '20rem',    // Adds a custom width value of 5.5rem (88px)
              },
        },
    },
    plugins: [],
};

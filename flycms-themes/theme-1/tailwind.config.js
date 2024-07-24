/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.html"],
    theme: {
        extend: {
            colors: {
                'primary': '#003B72',
                'secondary':'#274375',
                'tertiary':'#2f497a',
                'quaternary':'#e7e5e5',
            },
        },
    },
    plugins: [],
}
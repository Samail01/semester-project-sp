/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*/.js',
    './index.html',
    './register.html',
    './login.html'
  ],

  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]


  }
  // ...
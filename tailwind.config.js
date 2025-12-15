/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Inclui todos os arquivos JS/TS/JSX/TSX no src/
    "./public/**/*.html",           // Inclui arquivos HTML no public/ (se necessário)
  ],
  theme: {
    extend: {
      // Adicione aqui suas extensões de tema personalizadas
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... outras extensões
        },
      },
    },
  },
  plugins: [
    // Adicione plugins aqui se necessário (ex: Tailwind Forms, Typography)
    // require('@tailwindcss/forms'),
  ],
};

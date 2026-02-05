/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Figma Light
        'calc-light-bg': '#F1F2F3',
        'calc-light-text': '#000000',
        'calc-light-btn-medium': '#D2D3DA',
        'calc-light-btn-high': '#4B5EFC',
        'calc-light-btn-low': '#FFFFFF',
        // Figma Dark
        'calc-dark-bg': '#17171C',
        'calc-dark-text': '#FFFFFF',
        'calc-dark-btn-medium': '#4E505F',
        'calc-dark-btn-high': '#4B5EFC',
        'calc-dark-btn-low': '#2E2F38',
      },
      fontFamily: {
        sans: ['SF Pro Text', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'calc-prev': ['15px', { lineHeight: '20px', letterSpacing: '-0.5px' }],
        'calc-display': ['64px', { lineHeight: '1.1', fontWeight: '600' }],
        'calc-btn': ['24px', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'calc': '24px',
        'calc-btn': '16px',
      },
    },
  },
  plugins: [],
}

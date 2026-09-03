/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.06)',
        card: '0 10px 30px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        xl2: '1rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

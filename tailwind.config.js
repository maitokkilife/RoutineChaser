/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef7f0',
          100: '#d6ecdb',
          200: '#aed8b8',
          300: '#7cbd8e',
          400: '#4f9f68',
          500: '#2f7f49',
          600: '#1f6636',
          700: '#0d4d25',
          800: '#0a3d1e',
          900: '#08301818',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Pretendard Variable"', 'Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

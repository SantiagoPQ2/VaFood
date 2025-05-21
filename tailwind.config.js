/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vafood': {
          red: '#FF0000',
          black: '#000000',
        }
      },
      keyframes: {
        notification: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { transform: 'translateY(0)', opacity: '1' },
          '90%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        }
      },
      animation: {
        'notification': 'notification 2s ease-in-out forwards'
      }
    },
  },
  plugins: [],
};
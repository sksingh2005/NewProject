/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        darkGray: 'rgb(33, 37, 41)',
        
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066CC', // Primary color
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        secondary: {
          50: '#E6F2F5',
          100: '#CCE4EB',
          200: '#99C9D7',
          300: '#66AEC3',
          400: '#3394AF',
          500: '#2C7D8C', // Secondary color
          600: '#236470',
          700: '#1A4B54',
          800: '#123238',
          900: '#09191C',
        },
        accent: {
          50: '#FFF2E6',
          100: '#FFE5CC',
          200: '#FFCC99',
          300: '#FFB266',
          400: '#FF9933',
          500: '#FF9500', // Accent color
          600: '#CC7A00',
          700: '#995C00',
          800: '#663D00',
          900: '#331F00',
        },
        success: {
          500: '#34C759',
        },
        warning: {
          500: '#FFCC00',
        },
        error: {
          500: '#FF3B30',
        },
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 2px 10px rgba(0, 0, 0, 0.2)',
        'card-hover-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: [
          'Poppins',
          'sans-serif'
        ],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        burgundy: {
          50: '#fdf4f4',
          100: '#fbe8e8',
          200: '#f5d5d5',
          300: '#edb5b5',
          400: '#e08888',
          500: '#d25a5a',
          600: '#b73e3e',
          700: '#9a2f2f',
          800: '#7f2929',
          900: '#6b2626',
        },
        beige: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf0db',
          300: '#f5e1b8',
          400: '#efcb87',
          500: '#e8b560',
          600: '#d9a441',
          700: '#b68834',
          800: '#926c2e',
          900: '#765729',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-light': 'bounceLight 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
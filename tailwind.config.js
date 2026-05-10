/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontSize: {
        'display-mobile': 'clamp(2.2rem, 8vw, 2.8rem)',
        'display-desktop': 'clamp(3.5rem, 8vw, 9rem)',
        'hero-mobile': 'clamp(1.8rem, 7vw, 2.4rem)',
        'hero-desktop': 'clamp(2.5rem, 5vw, 6rem)',
      },
      spacing: {
        section: 'clamp(4rem, 10vw, 10rem)',
        gutter: 'clamp(1.25rem, 5vw, 6rem)',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        dm: ['"DM Mono"', 'monospace'],
        inter: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        gold: {
          100: '#f5e6c8',
          200: '#e8c97e',
          300: '#d4aa50',
          400: '#c49a30',
          500: '#a67c2e',
        },
        ink: {
          900: '#0a0805',
          800: '#110e09',
          700: '#1a1510',
          600: '#241d16',
        },
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(1%, -2%)' },
          '90%': { transform: 'translate(3%, 4%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        grain: 'grain 0.12s steps(1) infinite',
        fadeIn: 'fadeIn 1.5s ease forwards',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

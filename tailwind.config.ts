import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#0B5DAA',
          'red-dark': '#08457E',
          'red-light': '#2F80D8',
          black: '#0B1F3A',
          'black-soft': '#12345A',
          gray: {
            50: '#FAFAFA',
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D4D4D8',
            400: '#A1A1AA',
            500: '#71717A',
            600: '#52525B',
            700: '#3F3F46',
            800: '#27272A',
            900: '#18181B',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.06), 0 4px 16px -4px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 8px 24px -8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 30px -6px rgba(11, 31, 58, 0.14), 0 18px 50px -12px rgba(11, 93, 170, 0.14)',
        'glow-red': '0 0 0 1px rgba(11, 93, 170, 0.1), 0 8px 30px -6px rgba(11, 93, 170, 0.32)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'marquee': 'marquee 35s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000' fill-opacity='0.03' d='M0 0h1v40H0zM40 0v1H0V0z'/%3E%3C/svg%3E\")",
        'gradient-hero': 'linear-gradient(135deg, #FFFFFF 0%, #F4F8FC 58%, #E7F0FA 100%)',
        'gradient-red': 'linear-gradient(135deg, #0B5DAA 0%, #08457E 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

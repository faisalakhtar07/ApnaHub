/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14151F',
        paper: '#F3F5F6',
        paperdark: '#0F1117',
        indigo: {
          900: '#1B1F3B',
          800: '#242A4D',
          700: '#2E355E',
        },
        sindoor: {
          DEFAULT: '#E4472B',
          light: '#FF6B4A',
          dark: '#C23A22',
        },
        peacock: {
          DEFAULT: '#0E7C7B',
          light: '#149795',
        },
        gold: '#D4A017',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        stamp: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '1.25rem',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(16px) rotate(var(--tilt, 0deg))' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(var(--tilt, 0deg))' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        floatIn: 'floatIn 0.7s cubic-bezier(0.16,1,0.3,1) both',
        drift: 'drift 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

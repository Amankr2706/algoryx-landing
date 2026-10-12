export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6D1FF2',
          light:   '#A66BFF',
          deep:    '#4A14B5',
          ice:     '#F4ECFF',
        },
        ink: '#0B0B12',
      },
      keyframes: {
        ticker: {
          to: { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(166, 107, 255, 0.5))' },
          '50%':      { filter: 'drop-shadow(0 0 9px rgba(166, 107, 255, 0.95))' },
        },
      },
      animation: {
        ticker: '32s linear infinite ticker',
        glow:   '3s ease-in-out infinite glow',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
}

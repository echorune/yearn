/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#020b0d',
          900: '#041517',
          850: '#072124',
          800: '#0c2d32',
          750: '#113b42',
          700: '#164850',
          600: '#1d5a64',
        },
        lagoon: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        biolum: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        coral: {
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        sunburst: {
          300: '#fde047',
          400: '#facc15',
          500: '#f59e0b',
          600: '#d97706',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f7f3ea',
          200: '#ede4d4',
          300: '#decbb4',
          400: '#cbaf90',
          800: '#3d3429',
          900: '#211c16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      boxShadow: {
        'glow-lagoon': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'glow-biolum': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'glow-coral': '0 0 25px -4px rgba(244, 63, 94, 0.35)',
        'glow-sunburst': '0 0 25px -4px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
};

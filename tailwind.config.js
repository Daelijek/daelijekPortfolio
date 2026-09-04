/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '420px',
        xl: '1200px',
      },
      colors: {
        background: 'var(--bg-primary)',
        'background-alt': 'var(--bg-secondary)',
        surface: 'var(--bg-surface)',
        'surface-hover': 'var(--bg-surface-hover)',
        border: 'var(--border-subtle)',
        'border-strong': 'var(--border-bright)',
        acid: {
          DEFAULT: '#00FF9F',
          glow: 'rgba(0, 255, 159, 0.15)',
          dark: '#00cc7d',
        },
        cyan: {
          DEFAULT: '#00F3FF',
          glow: 'rgba(0, 243, 255, 0.15)',
        },
        obsidian: {
          950: '#040608',
          900: '#070A0E',
          850: '#0B1015',
          800: '#10161E',
          700: '#18202A',
        }
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'Bebas Neue', 'Oswald', 'Impact', 'sans-serif'],
        display: ['var(--font-display)', 'Chakra Petch', 'sans-serif'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'radar': 'radar 4s linear infinite',
        'border-draw': 'borderDraw 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }
    },
  },
  plugins: [],
};

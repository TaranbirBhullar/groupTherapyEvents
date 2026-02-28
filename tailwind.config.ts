import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      colors: {
        midnight: '#03050b',
        ink: '#0a1020',
        cyanflash: '#7ba8b4',
        acid: '#b8ab8a',
        lava: '#7a5f6d'
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(123,168,180,0.3), 0 18px 42px rgba(8,12,24,0.62)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(123,168,180,0.13), transparent 34%), radial-gradient(circle at 80% 10%, rgba(122,95,109,0.2), transparent 34%), radial-gradient(circle at 70% 80%, rgba(184,171,138,0.12), transparent 36%)'
      }
    }
  },
  plugins: []
} satisfies Config;

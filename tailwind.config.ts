import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      colors: {
        midnight: '#0a1014',
        ink: '#182229',
        cyanflash: '#b4bdb9',
        acid: '#b08a4f',
        lava: '#5f5140'
      },
      boxShadow: {
        neon: '0 8px 24px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 10%, rgba(176,138,79,0.12), transparent 35%), radial-gradient(circle at 80% 20%, rgba(180,189,185,0.08), transparent 30%)'
      }
    }
  },
  plugins: []
} satisfies Config;

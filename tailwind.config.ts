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
        midnight: '#07090d',
        ink: '#10141b',
        cyanflash: '#a8b3c4',
        acid: '#d1d5db',
        lava: '#6b7280'
      },
      boxShadow: {
        neon: '0 1px 2px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
        mesh: 'none'
      }
    }
  },
  plugins: []
} satisfies Config;

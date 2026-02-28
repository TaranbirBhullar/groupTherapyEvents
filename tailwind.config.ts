import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif']
      },
      colors: {
        midnight: '#060816',
        ink: '#0f1328',
        cyanflash: '#17d3ff',
        acid: '#b4ff3b',
        lava: '#ff5a3d'
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(23,211,255,0.3), 0 16px 40px rgba(23,211,255,0.16)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(23,211,255,0.2), transparent 30%), radial-gradient(circle at 80% 10%, rgba(255,90,61,0.2), transparent 32%), radial-gradient(circle at 70% 80%, rgba(180,255,59,0.14), transparent 30%)'
      }
    }
  },
  plugins: []
} satisfies Config;

import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        gp: {
          'roxo-escuro': 'var(--gp-roxo-escuro)',
          roxo: 'var(--gp-roxo)',
          lilas: 'var(--gp-lilas)',
          'lilas-claro': 'var(--gp-lilas-claro)',
          ciano: 'var(--gp-ciano)',
          branco: 'var(--gp-branco)',
          sucesso: 'var(--gp-sucesso)',
          atencao: 'var(--gp-atencao)',
          info: 'var(--gp-info)',
          sugestao: 'var(--gp-sugestao)',
        },
      },
      borderRadius: {
        'gp-sm': '8px',
        'gp-md': '12px',
        'gp-lg': '16px',
        'gp-xl': '24px',
      },
      boxShadow: {
        'gp-sm': '0 4px 14px rgba(63, 39, 87, 0.18)',
        'gp-md': '0 8px 24px rgba(63, 39, 87, 0.25)',
        'gp-lg': '0 16px 40px rgba(63, 39, 87, 0.38)',
        'gp-glow': '0 0 24px rgba(60, 199, 232, 0.35)',
        'gp-roxo-glow': '0 8px 28px rgba(152, 71, 238, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;

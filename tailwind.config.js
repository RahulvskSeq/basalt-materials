/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#08080A',
        panel: '#101013',
        raised: '#17171B',
        line: '#26262B',
        steel: '#5A5A62',
        concrete: '#8C8C93',
        chalk: '#F2F2EF',
        signal: '#E2552A',
      },
      fontFamily: {
        display: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        sans: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.045em', wide2: '0.16em', ultra: '0.3em' },
      maxWidth: { edge: '1760px' },
      transitionTimingFunction: { hard: 'cubic-bezier(0.65, 0, 0.35, 1)' },
      spacing: { rail: '104px' },
    },
  },
  plugins: [],
}

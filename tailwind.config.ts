import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Trauma-informed color palette (psychology thing apparently)
        'athena-violet': '#4B1F66',
        'lavender-mist': '#C6B1E7',
        'snow-white': '#FCFAFF',
        'warm-white': '#F7F5FD',
        'soft-charcoal': '#2E2A32',
        'warm-blush': '#F7C6D0',
        'hope-gold': '#F4D27A',
        'confidence-blue': '#3A5FCD',
        'hope-green': '#88C57F',
        'lavender-card': '#EFE7F7',
        'gold-white': '#FDF6D9',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'sans-serif'],
        'serif': ['var(--font-dm-serif)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config


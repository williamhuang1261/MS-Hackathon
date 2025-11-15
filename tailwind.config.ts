import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Refreshed palette
        'deep-navy': '#1C1A3C',
        'medium-purple': '#7373A8',
        'light-purple-gray': '#CACAD7',
        'cream': '#FAFAF7',
        'near-white': '#FDFDFE',
        'soft-charcoal': '#2E2A32',
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

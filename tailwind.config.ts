import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF7',
        'light-purple': '#CACAD7',
        'dark-navy': '#1C1A37',
        'off-white': '#FDFDFE',
        'primary-purple': '#7373A8',
      },
    },
  },
  plugins: [],
}
export default config


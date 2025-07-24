import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#e5e7eb',
            '--tw-prose-headings': '#f3f4f6',
            '--tw-prose-links': '#34d399',
            '--tw-prose-code': '#10b981',
          },
        },
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(45deg, #10b981, #34d399)',
      },
    },
  },
  plugins: [typography],
} satisfies Config

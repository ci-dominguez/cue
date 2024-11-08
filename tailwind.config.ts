import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lora: ['"Lora"', 'sans'],
        inter: ['"Inter"', 'sans'],
      },
      colors: {
        content: '#FFF',
        'content-1': '#F5F5F4',
        'content-2': '#D9D9D9',
        text: '#0C0A09',
        'text-1': '#44403C',
        accent: '#FDF3DD',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
} satisfies Config;

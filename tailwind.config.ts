import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        mobile: '640px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },
      // as this is a design system for a chat application, I want to use grayish background colors, that contrast well with white text balloons for other users and blue text balloons for the current user, as well as contrasting titles, for night mode, I want to use a dark gray background, more vivid blue and gray text balloons, and the text to contrast well with the background and balloons respectively
      colors: {
        // light mode
        'back-light': '#F5F5F5',
        'back-secondary-light': '#FFFFFF',
        'fore-titles-light': '#000000',
        'fore-secondary-light': '#828282',
        'fore-blue-balloons-light': '#FFFFFF',
        'fore-gray-balloons-light': '#000000',
        'blue-balloons-light': '#2F80ED',
        'gray-balloons-light': '#E0E0E0',
        // dark mode
        'back-dark': '#1A1A1A',
        'back-secondary-dark': '#2D2D2D',
        'fore-titles-dark': '#FFFFFF',
        'fore-secondary-dark': '#BDBDBD',
        'fore-blue-balloons-dark': '#FFFFFF',
        'fore-gray-balloons-dark': '#000000',
        'blue-balloons-dark': '#2962FF',
        'gray-balloons-dark': '#4F4F4F',
      },      
    },
  },
  plugins: [],
}
export default config

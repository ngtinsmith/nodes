/** @type {import('tailwindcss').Config} */
import pseudoClasses from './src/tailwind/pseudo-classes'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [pseudoClasses]
}

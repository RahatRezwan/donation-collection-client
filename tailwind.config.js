/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            inter: ['Inter', 'sans-serif'],
         },
         colors: {
            'light-blue': '#A6B6F8',
            'dark-blue': '#041F60',
            'light-red': 'rgba(255, 229, 219, 0.973)',
            'light-green': 'rgba(233, 255, 240, 0.973)',
         },
      },
      screens: {
         sm: '350px',
         md: '768px',
         lg: '1280px',
         xl: '1440px',
      },
   },
   plugins: [],
};

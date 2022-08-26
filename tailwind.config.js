module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container:{
      center: false,
      padding:'0rem'
    },
    fontSize:{
      'new':'.50rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily:{
        'fuenterara':['Smooch', 'cursive']
      },
      keyframes: {
        myanimation:{
          from:{
            transform:'translate(100%)'
          },
          to:{
            transform:'translate(0%)'
          }
        },
        imgresize:{
          from:{
            transform:'scale(0)'
          },
          to:{
            transform:'scale(1)'
          }
        }
      },
      animation:{
        'bounce-new':'myanimation .5s',
        'img':'imgresize .3s'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}

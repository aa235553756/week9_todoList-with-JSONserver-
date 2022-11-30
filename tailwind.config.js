/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    container:{
      center:true,
      padding:'32px',
    },
    extend: {
      boxShadow:{
        'list':'0px 0px 15px 0px #00000026'
      },
      color:{
        'border':'#333333'
      }
    },
  },
  plugins: [],
}

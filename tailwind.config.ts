import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  
  theme: {
    extend: {
      colors: {
        'button-primary-text':"#fff",
        'field-label':"#666",
        'default-text-color':"#333",
        'text-dark':"#111"
      },
      borderRadius:{
       'button-default-radius':"999px" 
      },
      fontSize:{
        'button-text-size': '22px'
      },
      backgroundColor:{
        'default':"#fff",
        'button-primary':'#111',
      },
      fontFamily:{
        albert:["var(--font-albert)","sans-serif"]
      },
      screens:{
        'min-1024':'1024px',
        'min-1050':'1050px'
      }
    },
    backgroundPosition:{
      'center-left':'right -160px center',
      'centered':'center center'
    }
  },
  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', 'cursive', 'sans-serif'],
      },
      // 1. ส่วนสีของคุณ
      colors: {
        primary: '#FF6B93',
        secondary: '#4A90E2',
      },
      // 2. ส่วนอนิเมชั่น
      keyframes: {
        jiggle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '30%': { transform: 'scale(1.08) rotate(-5deg)' },
          '40%': { transform: 'scale(1.08) rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        // Nurse: หายใจ + โยก
        nurse: {
          '0%, 100%': { transform: 'scale(1) rotate(2deg) translateX(0px) translateY(0px)' },
          '25%': { transform: 'scale(1.06) rotate(6deg) translateX(10px) translateY(-12px)' },
          '50%': { transform: 'scale(0.96) rotate(-2deg) translateX(-10px) translateY(8px)' },
          '75%': { transform: 'scale(1.04) rotate(4deg) translateX(5px) translateY(-6px)' },
        },
        // Logo: ขยับ
        logo: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg) translateX(0px) translateY(0px)' },
          '25%': { transform: 'scale(1.08) rotate(4deg) translateX(-10px) translateY(-15px)' },
          '50%': { transform: 'scale(0.95) rotate(-3deg) translateX(8px) translateY(5px)' },
          '75%': { transform: 'scale(1.05) rotate(2deg) translateX(10px) translateY(-10px)' },
        },
        // ปุ่ม START: เต้น
        btn: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '20%': { transform: 'scale(1.12) rotate(-5deg)' },
          '40%': { transform: 'scale(1.2) rotate(5deg)' },
          '60%': { transform: 'scale(1.12) rotate(-3deg)' },
          '80%': { transform: 'scale(1.05) rotate(2deg)' },
        },
      },
      animation: {
        jiggle: 'jiggle 2s infinite ease-in-out',
        float: 'float 3s ease-in-out infinite',
        nurse: 'nurse 4s ease-in-out infinite',
        logo: 'logo 5s ease-in-out infinite',
        btn: 'btn 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

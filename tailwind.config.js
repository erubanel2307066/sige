/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6E1736',
          secondary: '#9C3156',
          accent: '#F5B700',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0'
        }
      },
      boxShadow: {
        soft: '0 30px 80px rgba(15, 23, 42, 0.08)',
        glow: '0 0 0 1px rgba(109, 20, 54, 0.08), 0 20px 45px rgba(109, 20, 54, 0.12)'
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

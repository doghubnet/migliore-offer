/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: 'var(--brand-500)',
          700: 'var(--brand-700)',
          900: 'var(--brand-900)'
        },
        accent: {
          500: 'var(--accent-500)'
        }
      },
      borderRadius: {
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      },
      boxShadow: {
        card: '0 8px 30px rgba(11,16,32,0.06)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

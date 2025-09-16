import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 20%, 95%)',
        foreground: 'hsl(210, 20%, 20%)',
        muted: 'hsl(210, 20%, 70%)',
        accent: 'hsl(150, 70%, 45%)',
        primary: 'hsl(210, 80%, 50%)',
        surface: 'hsl(210, 20%, 100%)',
      },
      borderRadius: {
        lg: '18px',
        md: '12px',
        sm: '6px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 20%, 0%, 0.08)',
      },
      spacing: {
        lg: '24px',
        md: '16px',
        sm: '8px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

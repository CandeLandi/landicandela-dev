/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Colores Base
        background: '#000000',
        foreground: '#FFFFFF',

        // Colores de Tarjetas
        card: {
          bg: '#0D0D0D',
          fg: '#FFFFFF',
        },

        // Colores Primarios
        primary: {
          DEFAULT: '#8B5CF6',
          foreground: '#FFFFFF',
        },

        // Colores Secundarios
        secondary: {
          DEFAULT: '#1A1A1A',
          foreground: '#FFFFFF',
        },

        // Colores de Acento
        accent: {
          DEFAULT: '#8B5CF6',
          foreground: '#FFFFFF',
        },

        // Colores Neutros
        muted: {
          DEFAULT: '#1A1A1A',
          foreground: '#999999',
        },

        // Colores de Borde
        border: '#2D1B69',
        input: '#1A1A1A',
        ring: '#8B5CF6',
      },

      // Gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
        'gradient-card': 'linear-gradient(135deg, #0D0D0D, #1A1A1A)',
      },

      // Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

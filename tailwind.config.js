module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.njk'],
  theme: {
    fontFamily: {
      serif: ['Noto Serif', 'serif'],
    },
    fontSize: {
      tiny: '0.667rem',
      base: '1rem',
      lg: '1.5rem',
      xl: '2.25rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};

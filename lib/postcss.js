/* eslint-disable global-require, import/no-extraneous-dependencies */
const postcss = require('postcss');
const CleanCSS = require('clean-css');

const minify = (css) => {
  const minified = new CleanCSS({
    level: {
      1: {
        specialComments: 0,
      },
    },
  }).minify(css);
  if (minified.warnings.length >= 1)
    console.warn('CleanCSS warnings:', minified.warnings);
  if (minified.errors >= 1) {
    console.error('CleanCSS errors:', minified.errors);
    return css;
  }
  return minified.styles;
};

module.exports = async (css, cssPath) => {
  try {
    const result = await postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]).process(css, { from: cssPath });
    return process.env.NODE_ENV === 'production'
      ? minify(result.css)
      : result.css;
  } catch (error) {
    console.error(error);
  }
  return '';
};

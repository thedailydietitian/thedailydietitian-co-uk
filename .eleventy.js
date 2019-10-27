/* eslint-disable import/no-extraneous-dependencies */
const HtmlMinifier = require('html-minifier');
const CleanCSS = require('clean-css');
const Terser = require('terser');

module.exports = config => {
  config.addLayoutAlias('base', 'layouts/base.njk');
  config.addLayoutAlias('recipe', 'layouts/recipe.njk');

  config.addPassthroughCopy({ 'src/site/content/assets': 'assets' });
  config.addPassthroughCopy('src/site/admin');
  config.addPassthroughCopy('src/site/assets');
  config.addPassthroughCopy('src/site/favicon.ico');
  config.addPassthroughCopy('src/site/robots.txt');
  config.addPassthroughCopy('src/site/sitemap.xml');

  // -------
  // FILTERS
  // -------
  config.addFilter('cssmin', code => {
    const minified = new CleanCSS().minify(code);
    if (minified.warnings.length >= 1)
      console.warn('CleanCSS warnings:', minified.warnings);
    if (minified.errors >= 1) {
      console.error('CleanCSS errors:', minified.errors);
      return code;
    }
    return minified.styles;
  });

  config.addFilter('jsmin', code => {
    const minified = Terser.minify(code, { warnings: 'verbose' });
    if (minified.warnings) console.warn('Terser warnings:', minified.warnings);
    if (minified.error) {
      console.error('Terser error:', minified.error);
      return code;
    }
    return minified.code;
  });

  // ----------
  // TRANSFORMS
  // ----------
  config.addTransform('htmlmin', (code, outputPath) => {
    if (typeof outputPath === 'string' && outputPath.endsWith('.html')) {
      const minified = HtmlMinifier.minify(code, {
        collapseWhitespace: true,
        removeComments: true,
      });
      return minified;
    }

    return code;
  });

  // -------
  // CONFIG.
  // -------
  config.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    online: false,
  });

  return {
    dir: {
      input: 'src/site',
      output: 'public',
    },
  };
};

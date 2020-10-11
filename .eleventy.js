/* eslint-disable import/no-extraneous-dependencies */
const HtmlMinifier = require('html-minifier');
const terser = require('terser');

const postcss = require('./lib/postcss');

module.exports = (config) => {
  config.addLayoutAlias('base', 'layouts/base.njk');

  config.addPassthroughCopy('src/site/favicon.ico');
  config.addPassthroughCopy('src/site/robots.txt');
  config.addPassthroughCopy('src/site/sitemap.xml');

  // -------
  // FILTERS
  // -------
  // - Filters are used to transform or modify content.
  // -------
  config.addNunjucksAsyncFilter('jsmin', async (code, callback) => {
    if (process.env.NODE_ENV !== 'production') callback(null, code);
    try {
      const result = await terser.minify(code);
      callback(null, result.code);
    } catch (error) {
      console.error(error);
      callback(null, code);
    }
  });

  // ----------
  // SHORTCODES
  // ----------
  // - A shortcode returns content that is injected into the template. You can
  //   use these however you’d like—you could even think of them as reusable
  //   components.
  // - Paired Shortcodes have a start and end tag—and allow you to nest other
  //   template content inside.
  // ----------
  config.addPairedNunjucksAsyncShortcode('postcss', postcss);

  // ----------
  // TRANSFORMS
  // ----------
  config.addTransform('htmlmin', (code, outputPath) => {
    if (typeof outputPath === 'string' && outputPath.endsWith('.html')) {
      const result = HtmlMinifier.minify(code, {
        collapseWhitespace: true,
        removeComments: true,
      });
      return result;
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

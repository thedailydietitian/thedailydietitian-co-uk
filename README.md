# thedailydietitian.co.uk

A static site built using Eleventy.

## Overview
```
/src
  /site - processed by Eleventy.
    /_data - global site data.
    /_includes - files included from Nunjucks templates.
      /css
      /js
      /layouts
      /partials
    /admin - CMS index.
    /assets - static assets. Copied to /public/assets.
    /content - anything that would come from a CMS.
      /assets - static assets used in content. Copied to /public/assets.
    /recipes - recipes index.
```

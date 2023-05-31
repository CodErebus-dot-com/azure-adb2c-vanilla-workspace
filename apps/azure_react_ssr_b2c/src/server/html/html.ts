import { minify } from 'html-minifier';

const htmlBoilerplate = ({ head, styles, markup, extractor }: any) => {
  const html = 
  `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <base href="/" />
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        
        ${styles}

        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body ${head.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        
        ${extractor.getScriptTags()}
        
        ${head.script.toString()}
      </body>
    </html>
  `;
  
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };

  return process.env.NODE_ENV === 'development' ? html : minify(html, minifyConfig);
};

export default htmlBoilerplate;

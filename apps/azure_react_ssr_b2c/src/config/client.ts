const description = 'A React SSR starter template';
const keywords = 'react, ssr, react-ssr, webpack';

const appConfig = {
  seo: {
    htmlAttributes: { lang: 'en', class: 'h-100' },
    bodyAttributes: { class: 'h-100' },
    defaultTitle: 'React SSR',
    meta: [
      {
        name: 'keywords',
        content: keywords,
      },
      {
        name: 'description',
        content: description,
      },
    ],
  },
};

export default appConfig;

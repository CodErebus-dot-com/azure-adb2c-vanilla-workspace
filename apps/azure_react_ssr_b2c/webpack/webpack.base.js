const scriptExtensions = /\.(tsx|ts|js|jsx|mjs)$/;
const imageExtensions = /\.(bmp|gif|jpg|jpeg|png)$/;
const fontsExtension = /\.(eot|otf|ttf|woff|woff2)$/;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: scriptExtensions,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: fontsExtension,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: imageExtensions,
        type: 'asset/resource',
      },
    ],
  },
};

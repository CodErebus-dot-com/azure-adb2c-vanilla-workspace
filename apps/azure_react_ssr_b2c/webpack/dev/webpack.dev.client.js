const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('../webpack.base.js');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const PACKAGE_JSON = require('../../package.json');

const ROOT_DIR = path.resolve(__dirname, '../../');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const BUILD_DIR = resolvePath('dist');
const APP_NAME = PACKAGE_JSON.name.toLowerCase();

const configureDevServer = () => ({
  static: {
    directory: './dist',
  },
  compress: true,
  historyApiFallback: true,
  hot: true,
  open: true,
  allowedHosts: 'all',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  }
});

const configureOutput = () => ({
  path: resolvePath(BUILD_DIR, 'client'),
  publicPath: '',
  filename: '[name].js',
  chunkFilename: '[name].js',
  devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  assetModuleFilename: 'assets/[hash][ext][query]',
});

const configureCssRules = () => ({
  test: /\.(css|less|styl|scss|sass|sss)$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
});

const addReactRefresh = () => {
  const instance = new ReactRefreshPlugin({
    overlay: {
        sockIntegration: 'whm',
    },
  });

  return instance;
}
const addDefinePlugin = () => {
  const instance = new webpack.DefinePlugin({
    __APP_NAME__: APP_NAME
  });

  return instance;
};

const addLoadable = () => {
  const instance = new LoadablePlugin({
    outputAsset: false, // to avoid writing loadable-stats in the same output as client
    writeToDisk: true,
    filename: `${BUILD_DIR}/loadable-stats.json`,
  });
  return instance;
};

const addHtmlReplace = () => (
  new HtmlReplaceWebpackPlugin([
    {
      pattern: '@@app_name',
      replacement: APP_NAME
    }
  ])
);

const addBuildManifest = () => {
  const instance = new WebpackManifestPlugin({
    basePath: '',
    publicPath: '',
    fileName: 'asset-manifest.json'
  });

  return instance;
};

const plugins = [
  new MiniCssExtractPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  addDefinePlugin(),
  addReactRefresh(),
  // loadable plugin will create all the chunks
  addLoadable(),
  addHtmlReplace(),
  addBuildManifest(),
];

const configureOptimization = () => ({
  runtimeChunk: 'single', // creates a runtime file to be shared for all generated chunks.
  splitChunks: {
    chunks: 'all', // This indicates which chunks will be selected for optimization.
    automaticNameDelimiter: '-',
    cacheGroups: {
      vendor: {
        // to convert long vendor generated large name into vendor.js
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      },
    },
  },
  minimize: false,
  minimizer: [],
});

const clientConfig = {
  target: 'web',
  mode: 'development',
  entry: {
    client: ['webpack-hot-middleware/client?reload=true&noInfo=true', 'react-refresh/runtime', './src/client/index.tsx'],
  },
  devtool: 'inline-cheap-module-source-map',
  devServer: configureDevServer(),
  output: configureOutput(),
  plugins,
  resolve: {
    ...baseConfig.resolve,
  },
  module: {
    ...baseConfig.module,
    rules: [configureCssRules()],
  },

  optimization: configureOptimization(),
};

module.exports = merge(baseConfig, clientConfig);

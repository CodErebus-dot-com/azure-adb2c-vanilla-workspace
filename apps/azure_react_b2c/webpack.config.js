// Node modules
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const WP = require('webpack');
const path = require('path');
const PACKAGE_JSON = require('./package.json');
const deps = PACKAGE_JSON.dependencies;

/**
 * HTMLTemplate: Used to run dev build
 * ENTRY_PATH: index file
 * APP_NAME: Library name to access render
 */
const ENTRY_PATH = './src/index.tsx';
const HTMLTemplate = './src/index.html';
const APP_NAME = PACKAGE_JSON.name.toLowerCase();

/**
 * Module federation config
 * By default all dependencies are added to shared
 */
const MF_CONFIG = {
  name: `${APP_NAME}_remote`,
  // remotes: this is where we will include items to consume from remote
  remotes: {},
  // exposes: this is where we will include items to expose
  exposes: {
    './app': './src/index',
  },
  // shared: here we can put the list of modules we would like to share
  shared: [
    {
      react: {
        eager: true,
        singleton: true,
        requiredVersion: deps['react'],
      },
    },
    {
      'react-dom': {
        eager: true,
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
    },
    {
      'styled-components': {
        eager: true,
        singleton: true,
      },
    },
  ],
};

/**
 * ****** WEBPACK CONFIG STARTS HERE *****
 * @param {*} env process var
 * @param {*} argv cmd args
 * @returns webpack config object
 */
module.exports = (env, argv) => {
  const { mode } = argv;
  const isDev = mode === 'development';

  const addDefinePlugin = () => {
    const instance = new WP.DefinePlugin({
      __IS_DEV__: isDev,
      __APP_NAME__: APP_NAME,
    });

    return instance;
  };

  const addModuleFederation = () => {
    const instance = new ModuleFederationPlugin({
      ...MF_CONFIG,
      filename: 'remoteEntry.js',
    });

    return instance;
  };

  const addHTMLTemplate = () => {
    const instance = new HtmlWebPackPlugin({
      template: HTMLTemplate,
      filename: 'index.html',
      templateParameters: {
        app_name: APP_NAME,
      },
    });

    return instance;
  };

  const addHTMLReplace = () =>
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '@@app_name',
        replacement: APP_NAME,
      },
    ]);

  const addBuildManifest = () => {
    const instance = new WebpackManifestPlugin({
      basePath: '',
      publicPath: '',
    });

    return instance;
  };

  const cleanupDist = () => {
    const instance = new CleanWebpackPlugin({ verbose: true });
    return instance;
  };

  /** Add styles to custom object instead of adding to Head */
  function addStylesToWindow(el) {
    const windowRef = typeof window !== 'undefined' ? window : {};
    if (!windowRef.customElStyles) {
      windowRef.customElStyles = [];
    }
    windowRef.customElStyles.push(el);
  }

  const addReactRefresh = () => {
    const instance = new ReactRefreshPlugin(); // default sockIntegration: wds
    return instance;
  };

  const config = {
    entry: ENTRY_PATH,

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name]-[fullhash].js',
      library: APP_NAME,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.jsx', '.js'],
    },

    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      historyApiFallback: true,
    },

    devtool: isDev ? 'inline-source-map' : undefined,

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },

    plugins: [
      cleanupDist(),
      addDefinePlugin(),
      addModuleFederation(),
      addHTMLTemplate(),
      addHTMLReplace(),
      addBuildManifest(),
      addReactRefresh(),
    ],
    optimization: {
      runtimeChunk: 'single',
    },
  };

  return config;
};

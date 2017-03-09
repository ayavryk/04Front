const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJSON = require('../package.json');

const ROOT_PATH = path.resolve(__dirname, '..');

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: {
    vendor: [
      'core-js/es6',
      'core-js/es7/array',
      'classnames',
      'react',
      'react-addons-transition-group',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-logger',
      'redux-persist',
      'redux-thunk'
    ],
    app: [
      'whatwg-fetch',
      './app/index.tsx',
    ],
  },

  output: {
    path: path.resolve(ROOT_PATH, 'resource','dist'),
    filename: 'js/[name]-[hash].js',
    chunkFilename: 'js/[name]-[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          'awesome-typescript-loader',
        ],
        include: path.resolve(ROOT_PATH, 'app'),
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: [
          path.resolve(ROOT_PATH, 'node_modules/zb-platforms-bundler'),
        ],
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[path][name].[ext]?[hash]',
          },
        },
      },
    ],
  },

  resolve: {
    modules: [
      path.resolve(ROOT_PATH, 'app'),
      'node_modules',
    ],
    extensions: [
      '.json',
      '.tsx',
      '.ts',
      '.js',
    ],
    alias: {
      assets: path.resolve(ROOT_PATH, 'app/styles/assets'),
    },
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'platforms', 'manifest'], // Specify the common bundle's name.
    }),
    new HtmlWebpackPlugin({
      title: 'HPSY V4',
      template: path.resolve(ROOT_PATH, 'templates/index.ejs'),
    }),
    new webpack.DefinePlugin({
      __VERSION__: `'${packageJSON.version}'`,
      __RESOLUTION__: `'${process.env.npm_package_config_resolution}'`,
      __PC_DUID__: process.env.PC_DUID ? `'${process.env.PC_DUID}'` : false,
    }),
  ],
};

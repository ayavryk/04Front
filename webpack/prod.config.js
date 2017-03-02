const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sharedConfig = require('./shared.config');
const merge = require('./utils').merge;

const prodConfig = {
  devtool: '',

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&minimize&importLoaders=2&sourceMap&localIdentName=[hash:base64:7]!postcss-loader',
        }),
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEV__: false,
      __TEST__: false,
      __API_HOST__: `'${process.env.API}'`,
    }),

    // CSS files from 'extract-text-webpack-plugin'
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true,
    }),

    // Optimizations
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
  ],
};

module.exports = merge(sharedConfig, prodConfig);

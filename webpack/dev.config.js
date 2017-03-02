const webpack = require('webpack');
const ip = require('ip');
const { CheckerPlugin } = require('awesome-typescript-loader');

const sharedConfig = require('./shared.config');
const merge = require('./utils').merge;

const HOST = process.env.HOST || ip.address();
const PORT = Number(process.env.PORT) || 1337;
const PROXY_PORT = Number(process.env.PROXY_PORT) || 5050;
const LOGGER_PORT = Number(process.env.LOGGER_PORT) || 8181;

const enableProxy = process.env.PROXY === 'true';

const devConfig = {
  devtool: 'source-map',

  output: {
    pathinfo: true,

    // NOTE Used for loading images with 'style-loader' in dev mode
    publicPath: `http://${HOST}:${PORT}/`,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new CheckerPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEV__: true,
      __TEST__: process.env.TEST || false,
      __PLATFORM__: null,
      __API_HOST__: enableProxy ? `'http://${HOST}:${PROXY_PORT}'` : `'${process.env.API}'`,
      __LOGGER_URL__: `'http://${HOST}:${LOGGER_PORT}/log'`,
      __DEFAULT_LOGGER__: '"remote"',
    })
  ],
};

if (process.env.npm_package_config_hmr === 'true') {
  devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  devConfig.entry = {
    app: [
      'webpack-hot-middleware/client',
    ],
  };
}

module.exports = merge(sharedConfig, devConfig);

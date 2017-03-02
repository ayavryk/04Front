/* eslint no-console: 0 */

const app = require('express')();
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const ip = require('ip');
const path = require('path');

const utils = require('./utils');
const devConfig = require('./dev.config');

require('colors');

const HOST = process.env.HOST || ip.address();
const PORT = Number(process.env.PORT) || 1337;
const PROXY_PORT = Number(process.env.PROXY_PORT) || 5050;

if (process.env.PROXY === 'true') {
  const proxy = require('./proxy');
  proxy.start(process.env.API, PROXY_PORT);
}

const compiler = webpack(devConfig);

const logRequest = (request) => {
  console.info('--------------------------------------------------------------------------------');
  console.info(`➡ ${utils.getDateString().green} ${request.originalUrl.magenta}`);
  if (request.headers['user-agent']) {
    console.info(`${request.headers['user-agent'].cyan}`);
  }
};

app.get('/', (request, response, next) => {
  logRequest(request);

  next();
});

app.use(historyApiFallback());

app.use(webpackDevMiddleware(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  stats: 'errors-only',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  serverSideRender: false,
  publicPath: devConfig.output.publicPath || '/',
  lazy: false,
}));

app.use(webpackHotMiddleware(compiler));


app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



app.use(express.static(path.join(__dirname,'../resource')));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`\n${'===>'.green} 🌎  Webpack dev server launched on ${`http://${HOST}:${PORT}/`.cyan.underline}`);
  }
});

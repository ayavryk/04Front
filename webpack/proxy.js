const http = require('http');
const httpProxy = require('http-proxy');

require('colors');

// response headers for netcast
const RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  Allow: 'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS',
};

function startProxy(url, port) {
  if (!url) {
    throw new Error('Can\'t start proxy for empty endpoint!');
  }

  const proxy = httpProxy.createProxyServer({});

  const server = http.createServer((req, res) => {
    proxy.web(req, res, {
      target: url,
    });
  });

  proxy.on('proxyRes', (proxyRes, req, res) => {
    Object.keys(RESPONSE_HEADERS).forEach((header) => {
      res.setHeader(header, RESPONSE_HEADERS[header]);
    });
  });

  // eslint-disable-next-line no-console
  console.log(`\n${'===>'.green} Proxy created on port ${`${port}`.cyan}`);
  server.listen(port);
}

if (require.main === module) {
  const PROXY_PORT = Number(process.env.PROXY_PORT);
  const API_URL = process.env.API;
  startProxy(API_URL, PROXY_PORT);
}

module.exports.start = startProxy;

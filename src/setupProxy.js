const { createProxyMiddleware } = require('http-proxy-middleware');
const notionProxy = {
    target: 'https://api.notion.com',
    changeOrigin: true
}
const twitterProxy = {
  target: 'https://api.twitter.com/',
  changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware(notionProxy)
  );
  app.use(
    '/2',
    createProxyMiddleware(twitterProxy)
  );
};
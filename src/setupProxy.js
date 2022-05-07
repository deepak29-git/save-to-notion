const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://api.notion.com',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware(proxy)
  );
};
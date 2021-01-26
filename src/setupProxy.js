const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: 'https://animated-shopping-web.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/products/:id',
    createProxyMiddleware({
      target: 'https://animated-shopping-web.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/orders',
    createProxyMiddleware({
      target: 'https://animated-shopping-web.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/orders/:id',
    createProxyMiddleware({
      target: 'https://animated-shopping-web.herokuapp.com/',
      changeOrigin: true,
    })
  );
};
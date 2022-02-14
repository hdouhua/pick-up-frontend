const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()

// routers
app.use('/employee', express.static('employee'));

// proxy
// /api/employee/getEmployee.action
// =>
// /employee/getEmployee.json
app.use(createProxyMiddleware('/api', {
  target: 'http://localhost:4000',
  // changeOrigin: true,
  pathRewrite: function (path, req) {
    let newPath = path.replace('/api', '').replace('.action', '.json');
    console.log(path, '=>', newPath);
    return newPath;
  },
  onProxyRes: function(proxyRes, req, res) {
    // enable cors origin
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
}));

app.listen(4000);

const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

// 1)
// let config = process.NODE_ENV === 'development' ? devConfig : proConfig
// module.exports = merge(baseConfig, config)

// OR 2)
module.exports = (env, argv) => {
  let config = argv.mode === 'development' ? devConfig : proConfig;

  return merge(baseConfig, config);
}

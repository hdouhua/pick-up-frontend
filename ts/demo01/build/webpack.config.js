const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

// // 1) wrong way!!!
// console.log('mode:', process.NODE_ENV) // undefined
// let config = process.NODE_ENV === 'development' ? devConfig : proConfig
// module.exports = merge(baseConfig, config)

// 2) correct way
module.exports = (env, argv) => {
  console.log('mode:', argv.mode)
  let config = argv.mode === 'development' ? devConfig : proConfig;

  return merge(baseConfig, config);
}

// import { Configuration } from 'webpack' // used by vs-code intellisense only
const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const Terser = require('terser')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const RemoveCommentsWebpackPlugin = require('./plugins/remove-comments-plugin')

const isProduction = process.env.NODE_ENV === 'production'
process.traceDeprecation = !isProduction

module.exports = async () => {

  const MinifyOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  }

  /**
   * @type {Configuration}
   */
  const config = {
    mode: isProduction ? 'production' : 'none',
    entry: {
      main: './src/home/index.js',
      album: './src/album/index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    cache: {
      // type: 'memory'
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.cache'),
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: './loaders/markdown-loader',
        },
        {
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, "node_modules"),
          ],
          loader: "babel-loader",
          options: {
            "presets": [
              [
                "@babel/preset-env"
              ]
            ],
            "plugins": [
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        // chunksSortMode: 'none',
        // inject: true,
        template: path.resolve(__dirname, './src/home/index.html'),
        filename: 'index.html',
        chunks: ['main'],
        minify: MinifyOptions,
        // templateParameters,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/album/index.html'),
        filename: 'album.html',
        chunks: ['album'],
        minify: true,
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name]-[contenthash:7].css' : '[name].css',
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      }),
    ],
    devtool: isProduction ? 'nosources-cheap-module-source-map' : 'cheap-module-source-map',
    optimization: {
      usedExports: true,
      sideEffects: true,
      splitChunks: {
        chunks: 'all'
      },
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
    },
    infrastructureLogging: {
      colors: true,
      level: 'info',
    },
    // recordsPath: path.join(__dirname, 'records.json'),
    profile: isProduction,
    // parallelism: 1,
  }

  // for demo only
  // enable RemoveCommentsWebpackPlugin for non-production build
  !isProduction && config.plugins.push(new RemoveCommentsWebpackPlugin())

  return config
}

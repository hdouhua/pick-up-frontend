const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'app': './src/index.tsx'
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/tpl/index.html' }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  stats: {
    errorDetails: true,
  },
}

const CompressionPlugin = require('compression-webpack-plugin')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
})

const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
	  port: process.env['DIARIOBOT_CLIENT_PORT'],
    host: '0.0.0.0'
  },
  watchOptions: {
    poll: true
  }
})

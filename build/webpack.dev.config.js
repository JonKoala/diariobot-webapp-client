const merge = require('webpack-merge')

const base = require('./webpack.base.config.js')

module.exports = merge(base, {
  devtool: '#cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
	  port: process.env['DIARIOBOT_CLIENT_PORT'],
    host: '0.0.0.0'
  },
  performance: {
    hints: false
  },
  watchOptions: {
    poll: true
  }
})

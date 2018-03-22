const merge = require('webpack-merge')

const appconfig = require('../appconfig')
const base = require('./webpack.base.config.js')

module.exports = merge(base, {
  devtool: '#cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
	  port: appconfig.server.port
  },
  performance: {
    hints: false
  }
})

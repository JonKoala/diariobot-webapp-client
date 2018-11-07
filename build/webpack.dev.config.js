const merge = require('webpack-merge')

const base = require('./webpack.base.config.js')

module.exports = merge(base, {
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

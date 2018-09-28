const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const __root = path.resolve(__dirname, '../');

module.exports = {
  entry: path.resolve(__root, './src/packages/' + process.env.BUILD + '/' + process.env.BUILD + '.js'),
  output: {
    path: path.resolve(__root, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(yml|yaml)$/,
        loader: 'js-yaml-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'common': path.resolve(__root, './src/common'),
      'components': path.resolve(__root, './src/components'),
      'mixins': path.resolve(__root, './src/mixins'),
      '~': __root
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: path.resolve(__root, './images/favicon.ico')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'DIARIOBOT_API_URL': JSON.stringify(process.env['DIARIOBOT_API_URL'])
      }
    })
  ]
}

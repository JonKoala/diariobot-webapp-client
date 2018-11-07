const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')

const __root = path.resolve(__dirname, '../');

module.exports = {
  entry: path.resolve(__root, './src/packages/' + process.env.BUILD + '/' + process.env.BUILD + '.js'),
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
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
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: path.resolve(__root, './images/favicon.ico')
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'DIARIOBOT_API_URL': JSON.stringify(process.env['DIARIOBOT_API_URL'])
      }
    })
  ]
}

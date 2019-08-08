import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { resolve, join } from 'path'
import packagejson from './package.json'

module.exports = env => ({
  entry: join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'index.js',
    path: join(__dirname, 'app')
  },

  watch: false,

  node: {
    fs: 'empty'
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: env.dev ? 'source-map' : false,

  resolve: {
    modules: [join(__dirname, '.'), join(__dirname, 'src')]
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: packagejson.description,
      filename: 'index.html',
      template: join(__dirname, 'src', 'index.html'),
      inject: 'body',
      hash: true,
      debug: env.dev
    })
  ],

  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [join(__dirname, 'src')],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: resolve(__dirname, './node_modules/bpmn-js'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        include: resolve(__dirname, './node_modules/diagram-js-minimap'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  }
})

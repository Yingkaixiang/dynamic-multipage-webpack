var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var MyHtmlWebpackPlugin = require('./myHtmlWebpackPlugin');

module.exports = {
  entry: {
    test: [
      './dist/publics/test.js',
      './dist/publics/test1.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/publics/'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/views/test.pug',
      filename: '../views/test.pug',
      inject: 'body',
      hash: true,
      chunks: ['test'],
    }),
    new MyHtmlWebpackPlugin(),
    new HtmlWebpackPugPlugin(),
  ],
};

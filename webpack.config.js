var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var MyHtmlWebpackPlugin = require('./lib/myHtmlWebpackPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    test: [
      './src/publics/test.js',
      './src/publics/test1.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/publics/'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
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

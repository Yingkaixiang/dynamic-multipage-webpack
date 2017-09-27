var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var path = require('path')

module.exports = {
  entry: {
    test: './dist/publics/test.js',
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
    }),
    new HtmlWebpackPugPlugin(),
  ],
};

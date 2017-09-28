const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MyHtmlWebpackPlugin = require('./lib/myHtmlWebpackPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mainfest = require('./lib/mainfest.js');

const getEntries = () => {
  const entry = {};
  const plugins = {};
  const htmlPlugin = {
    inject: 'body',
    hash: true,
  };
  Object.keys(mainfest).forEach((item) => {
    const { js, page } = mainfest[item];
    entry[item] = js;
    plugins[item] = new HtmlWebpackPlugin(Object.assign(htmlPlugin, page));
  });
  return { entry, plugins };
};

module.exports = {
  entry: {
    demo: [
      './src/publics/js/common.js',
      './src/publics/js/demo.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/publics/js'),
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
    new ExtractTextPlugin('../css/[name].css'),
    new HtmlWebpackPlugin({
      template: './src/views/mobile/demo.pug',
      filename: '../../views/mobile/demo.pug',
      inject: 'body',
      hash: true,
      chunks: ['demo'],
    }),
    new MyHtmlWebpackPlugin(),
    new HtmlWebpackPugPlugin(),
  ],
};

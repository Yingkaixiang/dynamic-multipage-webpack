const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MyHtmlWebpackPlugin = require('./lib/myHtmlWebpackPlugin');

const config = {
  entry: {
    layout: [
      './src/publics/js/lib/common.js',
    ],
    moment: [
      './src/publics/js/lib/alloyfinger.js',
      './src/publics/js/moment.js',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist/publics/'),
    publicPath: '/publics/',
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
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader?limit=5120',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
};

// 生成新模板
const files = glob.sync('./src/views/**/*.pug');
files.forEach((file) => {
  const filename = path.parse(file).name;
  const chunks = ['layout', filename];
  config.plugins.push(new HtmlWebpackPlugin({
    template: `raw-loader!${file}`,
    filename: file.replace(/^\.\/src/, '..'),
    chunks,
    chunksSortMode: (chunk1, chunk2) => {
      const order1 = chunks.indexOf(chunk1.names[0]);
      const order2 = chunks.indexOf(chunk2.names[0]);
      return order1 - order2;
    },
  }));
});

config.plugins.push(new MyHtmlWebpackPlugin());
config.plugins.push(new HtmlWebpackPugPlugin());

module.exports = config;

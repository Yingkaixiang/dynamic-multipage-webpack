module.exports = {
  demo: {
    js: [
      './src/publics/js/common.js',
      './src/publics/js/demo.js',
    ],
    page: {
      template: 'src/views/mobile/demo.pug',
      filename: '../views/mobile/demo.pug',
      chunks: ['demo'],
    },
  },
};

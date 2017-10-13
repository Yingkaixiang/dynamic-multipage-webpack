const yargs = require('yargs');
require('babel-core/register');
require('babel-polyfill');

if (yargs.argv.config === 'consul') {
  console.log('Get config from consul');
}

require('./app');


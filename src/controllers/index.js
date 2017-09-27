import requireIndex from 'es6-requireindex';

const controllers = {};
const dirs = requireIndex(__dirname);
Object.keys(dirs).forEach((controller) => {
  controllers[controller] = dirs[controller];
});

export default controllers;

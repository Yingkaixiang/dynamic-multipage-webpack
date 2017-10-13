import requireIndex from 'es6-requireindex';

export default requireIndex(__dirname)[process.env.NODE_ENV || 'development'];

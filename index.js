
module.exports = process.env.EIO_COV
  ? require('./lib-cov/engine.io')
  : require('./dist/engine.io');

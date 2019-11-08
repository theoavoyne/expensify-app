const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./../webpack.config.js')('development');

const compiler = webpack(config);

const webpackDev = () => (
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: 'errors-only'
  })
);

module.exports = { webpackDev };

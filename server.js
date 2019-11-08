/* eslint-disable import/newline-after-import */

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const publicPath = path.join(__dirname, 'public');

require('./config/config');

const app = express();

// WEBPACK DEV MIDDLEWARE
const { webpackDev } = require('./middlewares/webpackDev');
if (process.env.NODE_ENV === 'development') {
  app.use(webpackDev());
}

// APP SETUP
app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(helmet());

// ROUTE
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// LISTENING
app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Sever is up on port ${process.env.PORT}`);
  }
});

// webpack.config.js
const path = require('path');

module.exports = {
  entry: './frontend/script.js', // Entry point for the application
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './frontend/dist'),
  },
  mode: 'development', // change to 'production' when building for production
};

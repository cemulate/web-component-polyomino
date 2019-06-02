const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'web-component-polyomino.js',
    library: 'webComponentPolyomino',
    libraryTarget: 'umd',
  }
};
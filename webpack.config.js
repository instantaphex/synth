let path = require('path');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname),
    watchContentBase: true,
    compress: true,
    port: 9000
  },
  module: {
    loaders: [
      {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015!ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015' ]
        }
      }
    ]
  }
};

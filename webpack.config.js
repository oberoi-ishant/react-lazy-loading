var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'cheap-source-map',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/preset-react", '@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-dynamic-import']
        }
      }
    ]
  }

}

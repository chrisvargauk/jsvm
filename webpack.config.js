const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [ new HtmlWebpackPlugin({
    template: "./src/index.html"
  })],
  devServer: {
    port: 3000
  },
  watchOptions: {
    poll: 1000 // Check for changes every second
  }
};
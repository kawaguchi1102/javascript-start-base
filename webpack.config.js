const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: `./src/index.js`,
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchContentBase: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
  },
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new CopyPlugin([
      {from: './src/assets', to: './assets' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
};
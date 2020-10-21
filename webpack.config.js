const path = require('path');
const Fiber = require('fibers');
const Sass = require('sass');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require("write-file-webpack-plugin");

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
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              sassOptions: {
                fiber: Fiber
              }
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          'file-loader?name=[name].[ext]'
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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: path.resolve(__dirname, "dist/assets")
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WriteFilePlugin()
  ],
};
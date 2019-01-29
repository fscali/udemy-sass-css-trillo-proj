const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const the_mode = 'production';

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval',
  mode: the_mode,
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.s?css$/,
        use: [
          // fallback to style-loader in development
          the_mode !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|webm|mp4)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }]),
    new WriteFilePlugin({
      // Write only files that have ".css" extension.
      test: /img\/*/
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
      //  favicon: 'src/img/favicon.png'
    }),
    new CleanWebpackPlugin('dist'),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};

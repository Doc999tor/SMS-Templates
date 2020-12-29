const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const alias = {
  'project-components': path.resolve('./components-lib'),
  'project-services': path.resolve('./services'),
  'helpers': path.resolve('./helpers'),
}
module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader', 'stylus-loader']
      },
      {
        test: /\.(img|png|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    stats: {
      version: false,
      modules: false,
      assets: false,
      hash: false
    },
    port: '3000'
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: '[name].chunk.css',
      filename: 'main.bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new DynamicCdnWebpackPlugin({ env: 'production' }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.styl'],
    alias: alias
  },
  devtool: 'source-map'
}

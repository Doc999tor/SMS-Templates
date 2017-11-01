const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const statConf = {
  assets: false,
  chunks: false,
  hash: false,
  version: false,
  errors: true,
  errorDetails: true,
  warnings: true
}
const alias = {
  'project-components': path.resolve('./components'),
  'project-services': path.resolve('./services')
}
module.exports = env => {
  let outputJS = './dist/bundle.js'
  let outputCSS = './dist/bundle.css'
  let devtool = 'source-map'
  if (env === 'production-p') {
    outputJS = './dist/bundle.min.js'
    outputCSS = './dist/bundle.min.css'
    devtool = false
  }
  return ({
    entry: './app/main.js',
    output: {
      filename: outputJS
    },
    devtool: devtool,
    module: {
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['es2015', {'modules': false}], 'stage-0', 'react']
              }
            }
          ]
        },
        {
          test: /\.styl$/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.css/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          }))
        },
        {
          test: /\.(img|png|svg)$/,
          use: 'url-loader'
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      stats: statConf,
      port: '3000'
    },
    plugins: [
      new ExtractTextPlugin(outputCSS)
    ],
    resolve: {
      alias: alias
    }
  })
}

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require(__dirname + '/package');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const IS_DEV = path.basename(require.main.filename) === 'webpack-dev-server.js';

module.exports = {
  output: {
    filename: 'main.[hash:6].js',
    publicPath: config.root ? config.root : '/'
  },

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: [path.join(__dirname, 'node_modules')]
  },

  devtool: IS_DEV ? 'source-map' : false,

  devServer: {
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api': ''}
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([IS_DEV ? '': 'dist'], {
      root: __dirname
    }),

    new HtmlWebpackPlugin({
      inject: false,
      title: 'Amelir',
      template: require('html-webpack-template'),
      appMountId: 'app',
      mobile: true,
      minify: IS_DEV ? {} : {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      }
    }),

    new VueLoaderPlugin(),
  ]
}
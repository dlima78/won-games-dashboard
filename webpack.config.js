const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/public/js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        getCustomTransformers: path.join(__dirname, './webpack.ts-transformers.js')
      }
    }]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    devMiddleware: {
      writeToDisk: true
    },
    compress: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

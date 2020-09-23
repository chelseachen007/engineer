const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
  project,
  dev: { alias, include, exclude },
  build,
} = require('./config.js')
const glob = require('glob')

const setMpa = () => {
  glob
  let entry = {}, HTMLPlugins = []
  //生成entry
  const entryFiles = glob.sync(path.join(__dirname, "../views/*/index.js"));

  entryFiles.map(item => {
    const entryFile = item
    const pageName = entryFile.match(/views\/(.*)\/index\.js/)[1]
    entry[pageName] = entryFile

    HTMLPlugins.push(
      new HTMLWebpackPlugin({
        template: path.join(__dirname, `../views/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName, "detail"],
      }))
  })
  return {
    entry, HTMLPlugins
  }
}
const { entry, HTMLPlugins } = setMpa()
const baseConfig = {
  context: project, // 入口、插件路径会基于context查找
  entry,
  // entry: {
  //   ...Entries,
  // },
  output: {
    path: build, // 打包路径
  },
  resolve: {
    alias, // 文件名简写
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'], // 文件查询扩展
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'font/[name]-[hash:8].[ext]',
          },
        },
        include,
        exclude,
      },
      {
        test: /\.(png|svg|jpg|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name]-[hash:8].[ext]',
          },
        },
        include,
        exclude,
      },
      {
        test: /\.(t|j)sx?$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: true
            },
          },
        ],
        include,
        exclude,
      },
    ],
  },
  externals: {
  },
  plugins: [
    ...HTMLPlugins,
    new CopyWebpackPlugin([
      { from: 'static', to: 'static' },
    ]),
  ],
}
module.exports = baseConfig

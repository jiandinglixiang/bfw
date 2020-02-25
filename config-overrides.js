const { override, overrideDevServer, addWebpackPlugin } = require(
  'customize-cra')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const path = require('path')
const paths = require('react-scripts/config/paths')
const fs = require('fs')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

process.env.PORT = 3033 // 端口号
paths.appBuild = resolveApp(`bfw_web_and_mobile_${process.env.REACT_APP_build_url || ''}`) // 修改名字

// console.log(process.env)

function addDevServer () {
  return function (config) {
    // console.log(config)
    // 代理
    config.proxy = {
      '/dev': {
        target: 'http://129.226.129.226:9501', // prod
        changeOrigin: true,
        pathRewrite: { '^/dev': '/' },
      },
      '/prod': {
        target: 'https://scoreapi.firebulls.net', // prod
        changeOrigin: true,
        pathRewrite: { '^/prod': '/' },
      },
    }
    return config
  }
}

function dropConsole () {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}

module.exports = {
  webpack: override(
    // fixBabelImports('import', {
    //   libraryName: 'antd-mobile',
    //   style: true,
    // }),
    addWebpackPlugin(
      new WebpackBuildNotifierPlugin({
        title: '',
        logo: path.resolve('./public/favicon.ico'),
        suppressSuccess: true,
      }),
      new UglifyJSPlugin()
    ),
    dropConsole(), // 生产环境去console.
  ),
  devServer: overrideDevServer(
    addDevServer(),
  )
}

const path = require('path') //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: './',
  outputDir: 'JIE-editor',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@@', resolve('./src/assets/bgImg/'))
  }
}

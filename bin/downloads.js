const fs = require('fs')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { processingSubproject } = require('./processingSubproject')
const removeFileDir = (path) => {
  let files = fs.readdirSync(path)
  for (let item of files) {
    let stats = fs.statSync(`${path}/${item}`)
    if (stats.isDirectory()) {
      removeFileDir(`${path}/${item}`)
    } else {
      fs.unlinkSync(`${path}/${item}`)
    }
  }
  fs.rmdirSync(path)
}

// const gitUrlMap = {
//   1: 'direct:git@git.aciga.com.cn:fronts/applocations/exfronts/aciga-middle-platform.git#dev',
//   2: 'direct:git@git.aciga.com.cn:fronts/applocations/infronts/aciga-mirco-front-sub-template.git',
//   3: 'direct:git@git.aciga.com.cn:fronts/applocations/infronts/ld-taro-vue3-template.git'
// }

const gitUrlMap = {
  1: 'direct:git@github.com:foolishwolfzy/vue3.git#main',
  2: 'direct:git@github.com:foolishwolfzy/zVueMini.git',
  3: 'direct:git@github.com:foolishwolfzy/OAuth.git'
}

module.exports = async function (ops, name, cb) {
  return new Promise(async (rs, rj) => {
    const { type } = ops
    const gitUrl = gitUrlMap[type]
    // 删除文件夹
    fs.existsSync(name) && removeFileDir(name)
  
    const ora = require('ora')
    const process = ora(`下载中...`)
    process.start()
    download(gitUrl, name, { clone: true }, (err) => {
      if (err) {
        console.log('下载应用模板出错了', err)
        return rj(false)
      }
      process.text = '下载完成'
      process.succeed()
      cb && cb()
      (type === 2) && processingSubproject(name)
      rs(true)
    })
    // { clone: true }
    // try {
    //   await download(gitUrl, name, { clone: true }, (err) => {
    //     if (err) {
    //       console.log('下载应用模板出错了', err)
    //       return rj(false)
    //     }
    //   })
    // } catch (error) {
    //   console.log('下载应用模板出错了', error)
    //   return rj(false)
    // }
    // process.text = '下载完成'
    // process.succeed()
    // cb && cb()
    // rs(true)
  })
  
  
}

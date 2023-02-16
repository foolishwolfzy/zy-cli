const fs = require('fs')
const path = require('path')
const { log, toHump } = require('./utils/util')
const processingSubproject = (name) => {
  const basePath = `${process.cwd()}/${name}/`
  const projectName = toHump(name)
  const fildList = ['/src/pubilc-path.js', '/src/router/index.js']
  // 处理子工程 package 文件
  fs.readFile(path.normalize(`${basePath}/package.json`), (err, f) => {
    if (err) log(err, 'red')
    // 处理子工程 package 文件
    let package = JSON.parse(f)
    package.name = projectName
    fs.writeFile(
      path.normalize(`${basePath}/package.json`),
      JSON.stringify(package, null, '\t'),
      (err, data) => {
        if (err) log(err, 'red')
      }
    )
  })
  fildList.forEach(item => {
    fs.readFile(path.normalize(`${basePath}${item}`), (err, f) => {
      if (err) log(err, 'red')
      f = f.toString().replace(/__projectName__/g, projectName)
      // 处理子工程 package 文件
      fs.writeFile(
        path.normalize(`${basePath}${item}`),
        f,
        (err, data) => {
          if (err) log(err, 'red')
        }
      )
    })
  })
  
}

module.exports = {
  processingSubproject
}

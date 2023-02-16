const chalk = require('chalk')

const log = (content, type) => console.log(chalk[type || 'yellow'](content))

const toHump = str => str.replace(/\-(\w)/g, (expStr, str1) => str1.toUpperCase())

module.exports = {
  log,
  toHump
}

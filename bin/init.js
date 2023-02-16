#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { program } = require('commander')
const { promisify } = require('util')
const { log } = require('./utils/util')
const downloads = require('./downloads')
const inquirer = require('inquirer')
const promisifyFiglet = promisify(require('figlet'))




const printLogo = async () =>{
  const data = await promisifyFiglet('zy-cli')
  log(data)
}


program.version('1.0.0')

program.option('-n --name <type>', 'output name')

program
  .command('init <app-name>')
  .description('创建vue项目')
  .action(async name => {
    log('准备创建项目')
    let answer = await inquirer.prompt([
      {
        name: 'type',
        type:'list',
        choices: [
          {
            name: 'vue3',
            value: 1
          },
          {
            name: 'vue2',
            value: 2
          },
          {
            name: 'OAuth鉴权模版',
            value: 3
          }
        ],
        message: '应用类型'
      }
    ])
    downloads(answer, name).then(res => {
      // processingSubproject(name)
    })
  })

program.parse(process.argv)
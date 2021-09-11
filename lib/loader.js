(function () {
  'use strict'

  const _ = require('lodash')
  const fs = require('fs')
  const path = require('path')
  const data = {}

  // read plugins root folder content
  const content = fs.readdirSync(path.join(__dirname, '../plugins'))

  // get all directories
  const folders = _.filter(content, function (name) {
    const fullname = path.join(__dirname, '../plugins/', name)
    return fs.statSync(fullname).isDirectory()
  })

  // load all files of subfolder and reference in data
  _.each(folders, function (name) {
    const folder = path.join(__dirname, '../plugins/', name)
    const plugins = fs.readdirSync(folder)
    const list = data[name] = data[name] || []

    _.each(plugins, function (file) {
      if (file.indexOf('.js') > -1) { list.push(require(folder + '/' + file)) }
    })
  })

  module.exports = data
}())

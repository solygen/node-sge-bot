(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    id: 'eintracht',
    name: 'twitter-eintracht',
    filter: function (list) {
      return _.filter(list, function (item) {
        const title = item.title.toLowerCase()
        if (/^([⏰])/.test(title)) return false
        if (title.indexOf('arnautis') > -1) return false
        if (title.indexOf('frauen') > -1) return false
        return true
      })
    }
  }
}())

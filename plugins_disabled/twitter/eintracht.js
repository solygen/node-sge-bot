(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    id: 'eintracht',
    name: 'twitter-eintracht',
    filter: function (list) {
      return _.filter(list, function (item) {
        const title = item.title.toLowerCase()
        // ignore ticker
        return !/^([⏰])/.test(title)
      })
    }
  }
}())

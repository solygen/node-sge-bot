(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    id: 'eintr8podcast',
    name: 'twitter-eintr8podcast',
    filter: function (list) {
      return _.filter(list, function (item) {
        const title = item.title.toLowerCase()
        return /\S*#ep\d\d\d\S*/.test(title)
      })
    }
  }
}())

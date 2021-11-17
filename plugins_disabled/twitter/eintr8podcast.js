(function () {
  'use strict'

  module.exports = {
    id: 'eintr8podcast',
    name: 'twitter-eintr8podcast',
    filter: function (item, index) {
      if (item.title.indexOf('Wir sind Live') < 0) return
      if (item.type !== 'tweet') return
      return index === 0
    }
  }
}())

(function () {
  'use strict'

  module.exports = {
    url: 'https://fussballverletzungen.com/tag/eintracht-frankfurt/feed/',
    name: 'fussballverletzungen',
    extract: function (data, cheerio, index) {
      index++
      const stream = this
      let item
      while ((item = stream.read())) {
        index = index + 1
        if (index > 2) return false
        data.push({
          title: index + '|' + item.title,
          content: item.description,
          source: 'fussballverletzungen',
          short: item.summary.slice(0, 140),
          url: item.link
        })
      }
    }
  }
}())

(function () {
  'use strict'

  module.exports = {
    url: 'https://www.faz.net/rss/aktuell/sport/rhein-main-sport/eintracht-frankfurt/',
    name: 'faz:rhein-main',
    extract: function (data, cheerio) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        if (item.title.indexOf('Frauen') > -1) return false
        data.push({
          title: item.title,
          content: item.description,
          source: 'faz',
          short: item.summary.slice(0, 140),
          url: item.link
        })
      }
    }
  }
}())

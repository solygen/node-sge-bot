(function () {
  'use strict'

  module.exports = {
    url: 'http://www.fnp.de/storage/rss/rss/eintracht/feed.xml',
    name: 'fnp',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        // TODO: umlauts
        if (item.title.indexOf('Tippspiel') === -1) {
          item.description = item.description || ''
          data.push({
            title: item.title,
            content: item.description,
            source: 'fnp',
            short: item.description.slice(0, 140),
            url: item.link
          })
        }
      }
    }
  }
}())

(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCu1FJLH2dp7dwKoCCGFkaMg',
    name: 'youtube:bildbundesliga',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        if (item.title.indexOf('Frankfurt') > -1 || item.title.indexOf('Eintracht') > -1) {
          // fix feed
          item.description = _.isNull(item.description) ? '' : item.description
          data.push({
            title: item.title,
            content: item.description,
            source: 'bild',
            short: item.description.slice(0, 140),
            url: item.link
          })
        }
      }
    }
  }
}())

(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UClCIWcZNvq15p0Y-E4ToGOw',
    name: 'youtube:sportschau',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        if (item.title.indexOf('Frankfurt') > -1) {
          // fix feed
          item.description = _.isNull(item.description) ? '' : item.description
          item.title = item.title.split('|')[0]
          data.push({
            title: item.title,
            content: item.description,
            source: 'sportschau',
            short: item.description.slice(0, 140),
            url: item.link
          })
        }
      }
    }
  }
}())

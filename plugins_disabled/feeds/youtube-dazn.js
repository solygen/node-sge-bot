(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UClBFnQJMlinWDCvfSXj60CA',
    name: 'youtube:dazn',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        if (item.title.indexOf('Frankfurt') > -1) {
          // fix feed
          item.description = _.isNull(item.description) ? '' : item.description
          data.push({
            title: item.title,
            content: item.description,
            source: 'dazn',
            short: item.description.slice(0, 140),
            url: item.link
          })
        }
      }
    }
  }
}())

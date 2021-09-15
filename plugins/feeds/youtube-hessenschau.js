(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCPhsnKyNcH3huafz_wNG_5A',
    name: 'youtube:hessenschau',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        if (item.title.indexOf('Eintracht') > -1) {
          // fix feed
          item.description = _.isNull(item.description) ? '' : item.description
          item.title = item.title.split('|')[0]
          item.title = item.title.split(' I ')[0]
          data.push({
            title: item.title,
            content: item.description,
            source: 'hessenschau',
            short: item.description.slice(0, 140),
            url: item.link
          })
        }
      }
    }
  }
}())

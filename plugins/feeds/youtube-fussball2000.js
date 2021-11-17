(function () {
  'use strict'

  const _ = require('lodash')

  module.exports = {
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCb-7rCWm12NFmRFer3QApig',
    name: 'fussball2000',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        // only latest one
        if (data.length > 0) return
        item.description = _.isNull(item.description) ? '' : item.description
        data.push({
          title: item.title.replace(' | Bundesliga Reaktion', ''),
          content: item.description,
          source: 'fussball2000',
          short: item.description.slice(0, 140),
          url: item.link
        })
      }
    }
  }
}())

(function () {
  'use strict'

  module.exports = {
    url: 'https://sgefussballanalyse.wordpress.com/feed/',
    name: 'fussballanalyse',
    extract: function (data) {
      const stream = this
      let item
      // add to data (collector)
      while ((item = stream.read())) {
        data.push({
          title: item.title,
          content: item.description,
          source: 'fussballanalyse',
          short: item.summary.slice(0, 140),
          url: item.link
        })
      }
    }
  }
}())

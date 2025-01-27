(function () {
  'use strict'

  module.exports = {
    url: 'https://www.blog-g.de/feed/',
    name: 'blog-g',
    extract: function (data) {
      const stream = this; let item
      // add to data (collector)
      while ((item = stream.read())) {
        data.push({
          title: item.title,
          content: item.description,
          source: 'blogg',
          short: item.summary.slice(0, 140),
          url: item.link
        })
      }
    }
  }
}())

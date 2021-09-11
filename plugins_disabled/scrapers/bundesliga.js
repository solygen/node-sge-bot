(function () {
  'use strict'

  module.exports = {
    url: 'https://www.bundesliga.com/de/bundesliga/clubs/eintracht-frankfurt/news',
    name: 'buli',
    selector: {
      'titles[]': '.news-content h3',
      'links[]': '.list-entry>a@href',
      'contents[]': '.news-content p'
    },
    extract: function (def, data) {
      const titles = data.titles
      const links = data.links
      const contents = data.contents
      const list = []

      titles.forEach(function (title, index) {
        list.push({
          title: title,
          content: contents[index],
          short: title.slice(0, 140),
          source: 'buli',
          url: 'http://www.bundesliga.de' + links[index]
        })
      })

      def.resolve(list)
    }
  }
}())

(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/eintracht-frankfurt/news/verein/24',
    name: 'tm',
    icon: '',
    selector: {
      article: '.alternativeNews , .weitereNews',
      title: '.headline',
      link: '.headline>a[href]|href'
    },
    filter: function (article, index) {
      if (index > 2) return false
      if (article.title.indexOf('wählen') >= 0) return
      if (article.title.indexOf('tippt') >= 0) return
      if (article.title.indexOf('Tipprunde') >= 0) return
      return true
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.transfermarkt.de' + article.link,
        author: article.author.replace('Von ', ''),
        source: this.name
      }
    }
  }
}())

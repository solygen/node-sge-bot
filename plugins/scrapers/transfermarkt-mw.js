(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/eintracht-frankfurt/marktwertanalyse/verein/24',
    name: 'tmmw',
    selector: {
      article: '.items > tbody > tr',
      title: '.inline-table img|title',
      link: 'tm-tooltip a|href',
      content: '.rechts.hauptlink',
      extra: '.rechts.hauptlink span|title'
    },
    filter: function (article, index) {
      article.extra = (article.extra || '').replace('Vorheriger Marktwert: ', '').replace('-', '')
      if (article.extra === article.content) return false
      return true
    },
    map: function (article, cherrio) {
      return {
        title: article.title + ': ' + article.content + (article.extra ? ` (${article.extra})` : ''),
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.transfermarkt.de' + (article.link.replace('/profil/', '/marktwertverlauf/')) + '#' + encodeURI(article.content),
        source: this.name
      }
    }
  }
}())

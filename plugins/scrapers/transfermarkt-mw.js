(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/eintracht-frankfurt/marktwertanalyse/verein/24',
    name: 'tmmw',
    selector: {
      article: '.items > tbody > tr',
      title: '.spielprofil_tooltip',
      link: '.spielprofil_tooltip|href',
      content: '.rechts.hauptlink'
    },
    filter: function (article, index) {
      return true
    },
    map: function (article, cherrio) {
      return {
        title: article.title + ': ' + article.content,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.transfermarkt.de' + (article.link.replace('/profil/', '/marktwertverlauf/')),
        source: this.name
      }
    }
  }
}())

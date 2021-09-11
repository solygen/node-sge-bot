(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/eintracht-frankfurt/geruechte/verein/24/plus/1',
    name: 'tmrumour',
    selector: {
      article: '.items > tbody > tr',
      title: 'td:nth-child(9) > a|title',
      subtitle: 'td:nth-child(9) > a',
      link: 'td:nth-child(9) > a|href',
      content: 'td:nth-child(11)'
    },
    filter: function (article, index) {
      return index <= 2
    },
    map: function (article) {
      return {
        title: article.title + ': ' + article.content.replace('Wechsel zu ', '').replace('Interesse von ', '').replace(' ', '') + ' (Quelle: ' + article.subtitle + ')',
        content: article.content,
        short: article.title.slice(0, 140),
        url: article.link,
        source: this.name
      }
    }
  }
}())

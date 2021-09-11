(function () {
  'use strict'

  module.exports = {
    url: 'https://www.wahretabelle.de/verein/eintr-frankfurt/11',
    name: 'wahretabelle',
    selector: {
      article: '.spielergebnis',
      title: 'td.ac:first-of-type',
      link: '.ac a|href'
    },
    filter: function (article, index) {
      return true
    },
    map: function (article) {
      const title = 'Auswertung: ' + article.title + ' Spieltag'
      return {
        title: title,
        short: title.slice(0, 140),
        url: 'https://www.wahretabelle.de' + article.link,
        source: this.name
      }
    }
  }
}())

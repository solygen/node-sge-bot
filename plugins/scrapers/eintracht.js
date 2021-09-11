(function () {
  'use strict'

  module.exports = {
    url: 'https://profis.eintracht.de/news',
    name: 'eintracht',
    selector: {
      article: '.ef-card-grid__item',
      title: '.ef-heading',
      content: '.ef-paragraph',
      link: '.ef-article-card|href',
      subtitle: '.ef-kicker'
    },
    filter: function (article, index) {
      if (index > 3) return false
      return true
    },
    map: function (article) {
      const title = article.title + ': ' + article.content
      return {
        title: title,
        content: article.content,
        short: title.slice(0, 140),
        url: 'https://profis.eintracht.de/' + article.link,
        source: this.name
      }
    }
  }
}())

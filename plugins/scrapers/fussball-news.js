(function () {
  'use strict'

  module.exports = {
    url: 'https://fussball.news/c/eintracht-frankfurt',
    name: 'fussballnews',
    selector: {
      article: 'a.card--default',
      title: '.card__title > span',
      link: 'a.card--default|href',
      subtitle: '.card__pre-title'
    },
    filter: function (article, index) {
      if (index > 7) return false
      return true
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: article.link,
        author: article.author.replace('Von ', '').replace(/\s/g, '').replace(',', ' ').replace('und', ' ').toLowerCase(),
        source: this.name
      }
    }
  }
}())

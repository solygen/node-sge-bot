(function () {
  'use strict'

  module.exports = {
    url: 'https://fussball.news/c/eintracht-frankfurt',
    name: 'fussballnews',
    selector: {
      article: 'a.card',
      title: '.card__title > span',
      link: 'a.card|href',
      subtitle: '.card__pre-title'
    },
    filter: function (article, index) {
      if (index > 1) return false
      return true
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.fr.de' + article.link,
        author: article.author.replace('Von ', '').replace(/\s/g, '').replace(',', ' ').replace('und', ' ').toLowerCase(),
        source: this.name
      }
    }
  }
}())

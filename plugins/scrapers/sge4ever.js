(function () {
  'use strict'

  module.exports = {
    url: 'https://www.sge4ever.de/',
    name: 'sge4ever',
    selector: {
      article: '.td-big-grid-wrapper .td-big-grid-post',
      title: '.td-module-title>a',
      link: '.td-module-title>a|href',
      author: '.td-post-author-name > a',
      extra: '.td-post-category'
    },
    filter: function (article, index) {
      if (article.extra.indexOf('Frauen') > -1) return false
      if (article.title.indexOf('Frauen') > -1) return false
      return index <= 3
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: article.link,
        author: article.author.replace(' ', '').replace('Redaktion', '').toLowerCase(),
        source: this.name
      }
    }
  }
}())

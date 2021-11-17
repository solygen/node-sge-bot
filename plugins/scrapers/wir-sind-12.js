(function () {
  'use strict'

  module.exports = {
    url: 'https://www.wirsind12.de/blog',
    name: 'wirsind12',
    selector: {
      article: '.blog-item',
      title: '.blog-title',
      content: '.blog-excerpt-wrapper > p',
      link: '.blog-more-link|href',
      author: '.blog-meta-primary .blog-author'
    },
    filter: function (article, index) {
      if (index >= 1) return false
      return true
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.wirsind12.de' + article.link,
        author: article.author.replace(/\s/g, '').toLowerCase(),
        source: this.name
      }
    }
  }
}())

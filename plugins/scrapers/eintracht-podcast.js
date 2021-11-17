(function () {
  'use strict'

  module.exports = {
    url: 'https://eintracht.podigee.io/',
    name: 'podcast-official',
    selector: {
      article: 'article',
      title: '.post-heading a',
      content: '.post-description > p:nth-child(1)',
      link: '.post-heading a|href'
    },
    filter: function (article, index) {
      return index === 0
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://eintracht.podigee.io' + article.link,
        source: this.name
      }
    }
  }
}())

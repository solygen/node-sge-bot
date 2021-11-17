(function () {
  'use strict'

  module.exports = {
    url: 'https://www.eintracht-podcast.de/tag/podcast-2',
    name: 'eintracht-podcast',
    selector: {
      article: 'article',
      title: '.entry-title a',
      content: '.entry-summary > p',
      link: '.entry-title a|href'
    },
    filter: function (article, index) {
      return index === 0
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: article.link,
        source: this.name
      }
    }
  }
}())

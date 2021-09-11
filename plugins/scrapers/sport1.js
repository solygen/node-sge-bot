(function () {
  'use strict'

  module.exports = {
    url: 'https://www.sport1.de/team/eintracht-frankfurt/opta_159',
    name: 'sport1',
    selector: {
      article: '.sc-bdvvaa.fPMcqm',
      title: 'span[font-family="Sport1-Bold"]',
      content: 'span[font-family="Sport1-Regular"]',
      link: 'a[data-testid^="ARTICLE_TEASER_"]|href'
    },
    filter: function (article, index) {
      if (index === 0 || !article.title) return false
      if (index > 2) return false
      return true
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.sport1.de' + article.link,
        source: this.name
      }
    }
  }
}())

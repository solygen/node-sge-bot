(function () {
  'use strict'

  module.exports = {
    url: 'https://www.fussball.news/deutschland/eintracht-frankfurt/',
    name: 'fussballnews',
    selector: {
      article: '.id-g  > .id-g4-c1',
      title: '.id-Teaser-el-content-headline-text',
      link: 'a.id-LinkOverlay-link|href',
      subtitle: '.id-Teaser-el-content-kicker-text'
    },
    filter: function (article, index) {
      if (index > 2) return false
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

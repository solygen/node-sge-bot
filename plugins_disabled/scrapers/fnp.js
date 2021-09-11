(function () {
  'use strict'

  module.exports = {
    url: 'https://www.fnp.de/eintracht-frankfurt',
    name: 'fnp',
    selector: {
      article: '.id-Teaser-el--hasimage:not(.id-Teaser-el--nativeBEEPtemplate)',
      title: '.id-Teaser-el-content-headline-text',
      content: '.id-Teaser-el-content-text-text',
      link: '.id-LinkOverlay-link',
      subtitle: '.id-Teaser-el-content-kicker-text',
      author: '.id-Teaser-el-content-author'
    },
    filter: function (article, index) {
      if (article.title.indexOf('Live-Ticker') > -1) return false
      if (index > 2) return false
      return true
    },
    map: function (article) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.fnp.de' + article.link,
        author: article.author.replace('Von ', ''),
        source: this.name
      }
    }
  }
}())

(function () {
  'use strict'

  module.exports = {
    url: 'https://www.fr.de/eintracht-frankfurt',
    name: 'fr',
    selector: {
      article: '.id-Teaser-el--hasimage:not(.id-Teaser-el--nativeBEEPtemplate)',
      title: '.id-Teaser-el-content-headline-text',
      content: '.id-Teaser-el-content-text-text',
      link: '.id-LinkOverlay-link|href',
      subtitle: '.id-Teaser-el-content-kicker-text',
      author: '.id-Teaser-el-content-author'
    },
    filter: function (article, index) {
      if (article.subtitle.indexOf('ballhorn') > -1) return false
      if (article.subtitle.indexOf('transfer-ticker') > -1) return false
      if (article.subtitle.indexOf('Frauen') > -1) return false
      if (article.title.indexOf('Live-Ticker') > -1) return false
      if (article.title.indexOf('Frauen') > -1) return false
      if (index > 2) return false
      return true
    },
    map: function (article) {
      const title = article.title.length <= 25
        ? article.subtitle + ': ' + article.title
        : article.title
      return {
        title: title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.fr.de' + article.link,
        author: article.author.replace('Von ', '').replace(/\s/g, '').replace(',', ' ').replace('und', ' ').toLowerCase(),
        source: this.name
      }
    }
  }
}())

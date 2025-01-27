(function () {
  'use strict'

  module.exports = {
    url: 'https://hessenschau.de/sport/fussball/eintracht-frankfurt/index.html',
    name: 'hr3',
    selector: {
      // ignore ticker block
      article: 'div.grid article:not(.bg-highlight-3)',
      title: 'header .font-title',
      subtitle: 'header .font-heading',
      content: 'div.text-base > span',
      link: 'header > a|href'
    },
    filter: function (article, index) {
      if (article.subtitle && article.subtitle.indexOf('FUSSBALL 2000') >= 0) return
      return index <= 2 && article.title.indexOf('+++') < 0
    },
    map: function (article) {
      const title = article.subtitle && article.title.indexOf(':') < 0
        ? article.subtitle + ': ' + article.title
        : article.title
      return {
        title: title,
        content: article.content,
        short: article.title.slice(0, 140),
        url: article.link,
        subtitle: article.subtitle,
        author: article.author.replace('Von ', '').replace(/\s/g, '').replace(',', ' ').replace('und', ' ').toLowerCase(),
        source: this.name
      }
    }
  }
}())

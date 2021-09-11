(function () {
  'use strict'

  module.exports = {
    url: 'https://hessenschau.de/sport/fussball/eintracht-frankfurt/index.html',
    name: 'hr3',
    selector: {
      article: 'article.c-teaser',
      title: '.text__headline',
      subtitle: '.c-teaser__topline.text__topline',
      content: '.c-teaser__shorttext',
      link: '.c-teaser__body > a|href',
      author: '.c-teaser__author'
    },
    filter: function (article, index) {
      return index <= 2 && article.title.indexOf('+++') < 0
    },
    map: function (article) {
      article.subtitle = article.subtitle.replace(' – der Eintracht-Videopodcast', '')
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

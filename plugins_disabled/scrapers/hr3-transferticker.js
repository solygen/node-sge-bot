(function () {
  'use strict'

  const BLACKLIST = [
    'lilien',
    'svww',
    'hatira',
    'schipplock',
    'sv98',
    'fritsch',
    'lilie',
    'sulu',
    'darmstadt',
    'fsv',
    'stöver',
    'bornheim',
    'herrmann',
    'darmstädter',
    'rehm',
    'wehen',
    'wiesbaden',
    'svww'
  ]

  module.exports = {
    url: 'https://www.hessenschau.de/sport/fussball/dienstag-ab-10-uhr-der-transferschluss-im-liveticker,transferschluss-liveticker-100.html',
    name: 'hr3transferticker',
    selector: {
      article: '.js-timeline .c-tickerItem',
      title: '.c-tickerItem__title',
      content: '.copytext__text',
      link: '.c-tickerItem__anchor|id'
    },
    filter: function (article, index) {
      let pass = true
      BLACKLIST.forEach(function (word) {
        pass = pass && article.title.toLowerCase().indexOf(word) === -1 && article.content.toLowerCase().indexOf(word) === -1
      })
      return index <= 2 && pass
    },
    map: function (article, index) {
      return {
        title: article.title,
        content: article.content,
        short: article.title.slice(0, 140),
        // link: id of anchor node
        url: this.url + '#' + article.link,
        subtitle: '',
        source: this.name
      }
    }
  }
}())

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
    'svww',
    'neue folge',
    'fussball 2000'
  ]

  module.exports = {
    url: 'https://www.hessenschau.de/sport/fussball/aktuelles-von-eintracht-frankfurt--darmstadt-98-news-im-bundesliga-ticker,bundesliga-ticker-104.html',
    name: 'hr3ticker',
    selector: {
      article: '.js-timeline .c-tickerItem',
      title: '.c-tickerItem__title',
      content: '.copytext__text',
      link: '.c-tickerItem__anchor|id',
      extra: '.c-posterTeaser a|href'
    },
    filter: function (article, index) {
      let pass = true
      BLACKLIST.forEach(function (word) {
        pass = pass && article.title.toLowerCase().indexOf(word) === -1 && article.content.toLowerCase().indexOf(word) === -1
      })
      // ignore teaser of hr3 article
      if (article.extra) return false
      return index <= 2 && pass
    },
    map: function (article, index) {
      article.title = article.title.replace('+++ ', '').replace(' +++', '')
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

(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/geruchtekuche/detail/forum/154/gk_wettbewerb_id/L1/gk_verein_id/24',
    name: 'tmrumour',
    selector: {
      article: '.threaduebersicht-threads:not(.sticky-threads) > article.thread',
      title: '.spielprofil_tooltip',
      content: '.wechsel-verein-name',
      extra: '.geruecht-zahl',
      link: '.wechsel-verein-name>a[href]|href'
    },
    filter: function (article, index) {
      return index <= 3
    },
    map: function (article) {
      let title = article.title + ': ' + article.content
      article.link = (article.link || '').replace(/(post_id\/.*)/, 'nurquellen/1')
      if (article.extra) title = title + ' (' + article.extra + '%)'
      return {
        title: title,
        content: article.content,
        short: title.slice(0, 140),
        url: 'https://www.transfermarkt.de' + article.link,
        author: '',
        source: this.name
      }
    }
  }
}())

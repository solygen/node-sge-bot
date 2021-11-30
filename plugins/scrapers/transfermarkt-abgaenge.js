(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/eintracht-frankfurt/geruechteabgaenge/verein/24/plus/1',
    name: 'tmrumour_leaving',
    selector: {
      article: '.items > tbody > tr',
      title: 'td:nth-child(9) > a|title',
      subtitle: 'td:nth-child(9) > a',
      link: 'td:nth-child(9) > a|href',
      content: 'td:nth-child(11)'
    },
    filter: function (article, index) {
      return index <= 2
    },
    map: function (article) {
      // page:         https://www.transfermarkt.de/juventus-turin-interessiert-an-filip-kostic/thread/forum/154/thread_id/1058046/post_id/2725815#2725815
      // redirects to: https://www.transfermarkt.de/juventus-turin-interessiert-an-filip-kostic/thread/forum/154/thread_id/1058046/page/9#anchor_2725815
      // target:       https://www.transfermarkt.de/juventus-turin-interessiert-an-filip-kostic/thread/forum/154/thread_id/1058046/nurquellen/1#anchor_2725815
      const hash = `anchor_${article.link.split('#')[1]}`
      article.link = (article.link || '').replace(/(post_id\/.*)/, 'nurquellen/1') + `#${hash}`
      return {
        title: article.title + ': ' + article.content.replace('Wechsel zu ', '').replace('Interesse von ', '').replace(' ', '') + ' (Quelle: ' + article.subtitle + ')',
        content: article.content,
        short: article.title.slice(0, 140),
        url: article.link,
        source: this.name
      }
    }
  }
}())

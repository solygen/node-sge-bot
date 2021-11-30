(function () {
  'use strict'

  module.exports = {
    url: 'https://www.transfermarkt.de/eintracht-frankfurt/geruechte/verein/24/plus/1',
    name: 'tmrumour_joining',
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
      // page:         https://www.transfermarkt.de/diego-demme-zu-eintracht-frankfurt-/thread/forum/154/thread_id/1058772/post_id/2727668#2727668
      // redirects to: https://www.transfermarkt.de/diego-demme-zu-eintracht-frankfurt-/thread/forum/154/thread_id/1058772/page/2#anchor_2727668
      // target:       https://www.transfermarkt.de/diego-demme-zu-eintracht-frankfurt-/thread/forum/154/thread_id/1058772/nurquellen/1#anchor_2727668
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

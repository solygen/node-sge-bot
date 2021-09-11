(function () {
  'use strict'

  module.exports = {
    url: 'https://www.whoscored.com/Teams/45/Fixtures/Germany-Eintracht-Frankfurt',
    name: 'whoscored',
    selector: {
      article: '.team-fixtures-summary > .divtable-body > .divtable-row',
      title: '.stacked-teams-display .team-link',
      link: 'a.match-report',
      content: 'a.horiz-match-link.result-1'
    },
    filter: function (article, index) {
      return !!article.link
    },
    map: function (article, cherrio) {
      article.title = article.title.replace('Eintracht Frankfurt', '')
      article.content = article.content.replace(' ', '')
      return {
        title: article.title + ' (' + article.content + ')',
        content: article.content,
        short: article.title.slice(0, 140),
        url: 'https://www.whoscored.com/' + article.link,
        source: this.name
      }
    }
  }
}())

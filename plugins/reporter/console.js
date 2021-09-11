(function () {
  'use strict'

  module.exports = {
    id: 'console',
    write: async function (data) {
      // output
      const content =
                // title
                data.title + '\u000a' +
                // hashtags + link
                '#sge' + ' ' + '#' + data.source + ' ' +
                // author
                (data.author ? data.author.split(' ').map((str) => { return '#' + str }).join(' ') + ' ' : '') +
                // url
                (data.shorturl || data.url) + '\u000a'
      console.log(content)
      console.log('================')
    }
  }
}())

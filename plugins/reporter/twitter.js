(function () {
  'use strict'

  const lib = require('../../lib/twitter')
  const bitly = require('../../lib/bitly')
  const debug = {
    twitter: require('debug')('twitter')
  }

  const post = function (data) {
    debug.twitter('TWITTER:4')

    // create link
    const content =
            // title
            data.title + '\u000a' +
            // hashtags + link
            '#sge' + ' ' + '#' + data.source + ' ' +
            // author
            (data.author ? data.author.split(' ').map((str) => { return '#' + str }).join(' ') + ' ' : '') +
            // url
            (data.shorturl || data.url) + '\u000a'

    // log
    debug.twitter('TWITTER: ' + data.title)

    // tweet
    lib.post(content)
  }

  module.exports = {
    id: 'twitter',
    write: async function (data) {
      if (data.id && data.type && data.type === 'tweet') {
        return lib.retweet(data.id)
          .then(function () {
            debug.twitter('TWITTER: retweeted ' + data.title)
          }, function (err) {
            debug.twitter('TWITTER: retweet:error ' + err.allErrors)
          })
      }

      // pipe url part through shortener
      data.shorturl = await bitly.shorten(data.url)
      post(data)
    }
  }
}())

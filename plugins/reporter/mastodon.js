'use strict'

const lib = require('../../lib/mastodon')
const debug = {
  mastodon: require('debug')('mastodon')
}

const post = function (data) {
  debug.mastodon('mastodon:4')

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
  debug.mastodon('MASTODON: ' + data.title)

  // tweet
  lib.post(content)
}

module.exports = {
  id: 'mastodon',
  write: async function (data) {
    if (data.id && data.type && data.type === 'tweet') {
      return lib.retweet(data.id)
        .then(function () {
          debug.mastodon('MASTODON: retweeted ' + data.title)
        }, function (err) {
          debug.mastodon('MASTODON: retweet:error ' + err.allErrors)
        })
    }

    // pipe url part through shortener
    data.shorturl = data.url
    post(data)
  }
}

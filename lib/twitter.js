(function () {
  'use strict'

  const Twit = require('twit')
  const deferred = require('deferred')
  let instance

  function getInstance () {
    // singleton
    if (instance) return instance
    instance = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })
    return instance
  }

  // callback to deferred
  function deferify (method, action, params) {
    const def = deferred()
    const process = function (err, data, response) {
      if (err) {
        def.reject(err, response)
      } else {
        def.resolve(data, response)
      }
    }

    getInstance()[method](action, params, process)
    return def.promise
  }

  module.exports = {
    post: function (status) {
      return deferify('post', 'statuses/update', { status: status })
    },

    // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    list: function (id) {
      return deferify('get', 'statuses/user_timeline', {
        screen_name: id,
        count: 10,
        exclude_replies: true,
        include_rts: false
      })
    },

    retweet: function (id) {
      return deferify('post', 'statuses/retweet/:id', { id: id })
    }
  }
}())

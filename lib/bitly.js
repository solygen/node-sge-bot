(function () {
  'use strict'

  const BitlyClient = require('bitly').BitlyClient
  const bitly = new BitlyClient(process.env.BITLY_ACCESS_TOKEN)

  module.exports = {

    shorten: async function (url) {
      try {
        const response = await bitly.shorten(url)
        return response.link || url
      } catch (err) {
        require('debug')('twitter')(err)
        return url
      }
    }

  }
}())

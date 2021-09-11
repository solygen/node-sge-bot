// #!/usr/bin/env node
// TODO: https://botwiki.org/tag/opensource

(function () {
  'use strict'

  require('dotenv').config()

  const FeedParser = require('feedparser')
  const deferred = require('deferred')
  const request = require('request')
  const _ = require('lodash')
  const cheerio = require('cheerio')
  const axios = require('axios')
  const now = Date.now()
  const util = require('../lib/util')
  const debug = {
    app: require('debug')('app'),
    scrape: require('debug')('scrape'),
    twitter: require('debug')('twitter'),
    flow: require('debug')('flow'),
    reporting: require('debug')('reporting')
  }

  // setTimeout((function() {
  //     debug.app('timeout');
  //     return process.exit(22);
  // }), 60 * 1000);

  function scrape (config) {
    // load source config and load data
    return axios.get(config.url).then((response) => {
      const $ = cheerio.load(response.data)
      return _.map($(config.selector.article), function (node, index) {
        const article = cheerio.load(node)
        const obj = {};
        ['title', 'subtitle', 'content', 'link', 'author', 'extra'].forEach(function (attr) {
          const parts = (config.selector[attr] || '').split('|')
          const selector = parts[0]
          const attribute = parts[1]
          const node = article(selector)
          obj[attr] = ((attribute ? node.attr(attribute) : node.text()) || '').trim()
        })
        return obj
      })
    }).then((data) => {
      return data.filter(config.filter, config).map(config.map, config)
    })
  }

  function handleError (e) {
    console.error('> ERROR: ' + e.config.name + ' is broken (' + e.message + ')')
  }

  function onlyNewsworthy (list) {
    debug.flow('config filtered to: ' + list.length)
    const filtered = _.filter(list, isNewsworthy)
    debug.flow('newsworthy filtered to: ' + filtered.length)
    return filtered
  }

  // check of source is recent
  function isNewsworthy (item) {
    const created = new Date(item.created)
    // invalid date
    if (!created) return true
    // last 3 hours
    return (now - created.getTime()) <= (1000 * 60 * 60 * 3 * 24)
  }

  // feed reader
  function getTweets (config) {
    const twitter = require('../lib/twitter')

    const fallback = function (data) {
      return util.isRelevant(data.title)
    }

    config.filter = config.filter || fallback

    return twitter.list(config.id)
      .then(
        function (list, response) {
          debug.flow('')
          debug.flow(config.name + ' returned ' + list.length)
          return _.map(list, function (data) {
            return {
              id: data.id_str,
              title: data.text,
              content: '',
              url: '',
              type: 'tweet',
              created: data.created_at,
              source: config.name,
              config: config.id
            }
          })
        },
        function (err, response) {
          console.log('> ERROR: ' + config.id + ' is broken (' + err.message + ')')
        }
      )
      .then(function (list) {
        return _.filter(list, config.filter || fallback)
      })
  }

  // feed reader
  function parseRSS (config) {
    const req = request(config.url)
    const feedparser = new FeedParser()
    const def = deferred()
    // data container for 'readable' handler
    const data = []

    // request
    req.on('response', function (res) {
      const stream = this
      if (res.statusCode !== 200) { return this.emit('error', new Error('Bad status code')) }
      stream.pipe(feedparser)
    })
    req.on('error', _.bind(def.reject, def))

    // feedparser (hint: readable called multiple times)
    feedparser.on('readable', _.bind(config.extract, feedparser, data, cheerio))
    // resolve/reject deferred
    feedparser.on('end', _.bind(def.resolve, def, data))
    feedparser.on('error', function (e) { def.reject({ message: e, config: config }) })

    return def.promise
  }

  // remove undefined, trailing whitespace
  // TODO: unicode / npm he?
  function clean (list) {
    _.each(list, function (item) {
      const keys = Object.keys(item)
      _.each(keys, function (key) {
        item[key] = (item[key] || '').trim()
      })
    })
    // report oldest first
    return list.reverse()
  }

  const bot = {

    // simple file based key value storage
    storage: require('../lib/storage').init(),

    // statistics
    statistics: require('../lib/statistics').init(),

    // settings
    settings: {
      cleanup: process.env.CLEANUP === 'true' || false,
      reporters: process.env.REPORTERS.split(' ')
    },

    // simple plugin system: load sources and reporters
    plugins: require('../lib/loader'),

    // call reporter plugins
    report: function (config, data) {
      debug.reporting(config.name + ' (' + data.length + ')')
      _.each(data, function (obj) {
        const recent = !bot.storage.get(obj.source, obj.title) && !bot.storage.get(obj.source, obj.url ? obj.url : obj.title)
        // update cache
        bot.storage.set(obj.source, obj.url ? obj.url : obj.title)
        if (recent) {
          bot.statistics.increment(obj.source)
          _.each(bot.plugins.reporter, function (rep) {
            // process only for enabled reporters
            if (bot.settings.reporters.indexOf(rep.id) < 0) return
            try {
              rep.write(obj)
            } catch (e) {
              console.log(obj)
              console.log(e)
            }
          })
        }
      })
    },

    // call feed and scraper plugins
    process: function () {
      debug.app('start')
      // feeds: async
      _.each(bot.plugins.feeds, function (config) {
        parseRSS(config)
          .then(clean, handleError)
          .then(bot.report.bind(this, config))
      })

      // scrapers: sync
      _.each(bot.plugins.scrapers, function (config) {
        // TODO: https://github.com/lapwinglabs/x-ray
        scrape(config)
          .then(clean)
          .then(bot.report.bind(this, config))
          .catch(function (error) {
            console.log(error.message + ': ' + (error.config || {}).url)
          })
      })

      // scrapers: tweets
      _.each(bot.plugins.twitter, function (config) {
        getTweets(config)
          .then(onlyNewsworthy)
          .then(bot.report.bind(this, config))
      })

      // clean up
      if (bot.settings.cleanup) {
        bot.storage.clean()
      }
    }
  }

  debug.app('SETTINGS:', bot.settings)
  debug.app('DEBUG:', process.env.DEBUG)

  // immediate execution when called via command line
  if (require.main === module) {
    bot.process()
  }

  // also usable as module
  module.exports = bot
}())

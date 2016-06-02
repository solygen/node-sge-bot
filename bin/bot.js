//#!/usr/bin/env node
// TODO: https://botwiki.org/tag/opensource

(function () {

    'use strict';

    var FeedParser = require('feedparser'),
        deferred = require('deferred'),
        request = require('request'),
        _ = require('lodash'),
        osmosis = require('osmosis'),
        now = Date.now(),
        debug = {
            app: require('debug')('app'),
            scrape: require('debug')('scrape'),
            reporting: require('debug')('reporting')
        };

    // alias
    function scrape(config) {
        // load source config and load data
        var def = deferred();
        osmosis
          .get(config.url)
          .set(config.selector)
          .data(_.partial(config.extract, def));

        return def.promise;
    }

    function handleError(e) {
        console.error('> ERROR: ' + e.config.name + ' is broken (' + e.message + ')');
    }

    function onlyNewsworthy (list) {
        //console.error(config.id, list.length);
        return _.filter(list, isNewsworthy)
    }

    // check of source is recent
    function isNewsworthy (item) {
        var created = new Date(item.created);
        // invalid date
        if (!created) return true;
        // last 3 hours
        // if ((now - created.getTime()) > (1000 * 60 * 60 * 3))
        //     console.error(item.config, item.title, item.created);
        return (now - created.getTime()) <= (1000 * 60 * 60 * 3)
    }

    // feed reader
    function getTweets(config) {
        var twitter = require('../lib/twitter');

        var fallback = function (data) {
            return data;
        };

        config.filter = config.filter || fallback;

        return twitter.list(config.id)
            .then(
                function (list, response) {
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
                        };
                    });
                },
                function (err, response) {
                    console.log(config.id);
                    console.log(err);
                }
            )
            .then(config.filter || fallback);
    }

    // feed reader
    function parseRSS(config) {

        var req = request(config.url),
            feedparser = new FeedParser(),
            def = deferred(),
            // data container for 'readable' handler
            data = [];

        // request
        req.on('response', function (res) {
            var stream = this;
            if (res.statusCode != 200)
                return this.emit('error', new Error('Bad status code'));
            stream.pipe(feedparser);
        });
        req.on('error', _.bind(def.reject, def));

        // feedparser (hint: readable called multiple times)
        feedparser.on('readable', _.bind(config.extract, feedparser, data));
        // resolve/reject deferred
        feedparser.on('end', _.bind(def.resolve, def, data));
        feedparser.on('error', function (e) { def.reject({ message: e, config: config }); });

        return def.promise;
    }

    // remove undefined, trailing whitespace
    // TODO: unicode / npm he?
    function clean (list) {
        _.each(list, function (item) {
            var keys = Object.keys(item);
            _.each(keys, function (key) {
                item[key] = (item[key] || '').trim();
            });
        });
        //report oldest first
        return list.reverse();
    }

    var bot = {

        // simple file based key value storage
        storage: require('../lib/storage').init(),

        // statistics
        statistics: require('../lib/statistics').init(),

        // settings
        settings: require('../lib/settings'),

        // simple plugin system: load sources and reporters
        plugins: require('../lib/loader'),

        // call reporter plugins
        report: function (config, data) {
            debug.reporting(config.name + ' (' + data.length + ')');
            _.each(data, function (obj) {
                var recent = !bot.storage.get(obj.source, obj.title);
                // update cache
                bot.storage.set(obj.source, obj.title);
                if (recent) {
                    bot.statistics.increment(obj.source);
                    _.each(bot.plugins.reporter, function (rep) {
                        // process only for enabled reporters
                        if (bot.settings.reporters.indexOf(rep.id) < 0) return;
                        try {
                            rep.write(obj);
                        } catch (e) {
                            console.log(obj);
                            console.log(e);
                        }
                    });
                }
            });
        },

        // call feed and scraper plugins
        process: function () {
            debug.app('start');
            // feeds: async
            _.each(bot.plugins.feeds, function (config) {
                parseRSS(config)
                .then(clean, handleError)
                .then(bot.report.bind(this, config));
            });

            // scrapers: sync
            _.each(bot.plugins.scrapers, function (config) {
                // TODO: https://github.com/lapwinglabs/x-ray
                scrape(config)
                .then(clean)
                .then(bot.report.bind(this, config));
            });

            // scrapers: tweets
            _.each(bot.plugins.twitter, function (config) {
                getTweets(config)
                .then(onlyNewsworthy)
                .then(bot.report.bind(this, config));

            });

            // clean up
            if (!!bot.settings.cleanup) {
                bot.storage.clean();
            }
        }
    };

    // immediate execution when called via command line
    if (require.main === module)
        bot.process();

    // also usable as module
    module.exports = bot;

}());

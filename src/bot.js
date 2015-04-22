//#!/usr/bin/env node
(function () {

    'use strict';

    var /*Horseman = require('node-horseman'),*/
        FeedParser = require('feedparser'),
        deferred = require('deferred'),
        request = require('request'),
        scraperjs = require('scraperjs'),
        _ = require('lodash'),
        debug = {
            app: require('debug')('app'),
            scrape: require('debug')('scrape'),
            reporting: require('debug')('reporting')
        };

    var log = console.log;

    // alias
    // function scrape(config) {
    //     // load source config and load data
    //     function load(config) {
    //         var horseman = new Horseman({
    //             timeout: 5000,
    //             loadImages: false,
    //             webSecurity: false
    //         });
    //         var data = horseman
    //                     .on('consoleMessage', function (msg) {
    //                         debug.scrape('   ', '!!consoleMessage');
    //                         debug.scrape('   ', msg);
    //                     })
    //                     .on('error', function () {
    //                         debug.scrape('   ', '!!error');
    //                         debug.scrape('   ', arguments);
    //                     })
    //                     .open(config.url)
    //                     .evaluate(config.extract);
    //         horseman.close();
    //         return data;
    //     }

    //     // return sources data
    //     try {
    //         return load(config).reverse();
    //     } catch (e) {
    //         debug.scrape(e);
    //     }
    // }

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
                            source: config.name
                        };
                    });
                },
                function (err, response) {
                    console.log(err);
                }
            ).then(config.filter || fallback);
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
        feedparser.on('error', _.bind(def.reject, def));

        return def.promise;
    }

    // remove undefined, trailing whitespace
    // TODO: unicode
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
                    _.each(bot.plugins.reporter, function (rep) {
                        try {
                            rep(obj);
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
                .then(clean)
                .then(bot.report.bind(this, config));
            });

            // scrapers: sync
            _.each(bot.plugins.scrapers, function (config) {
                // TODO: https://github.com/rc0x03/node-osmosis
                // scrape(config)
                // .then(clean)
                // .report(config, scrape(config));
            });

            // scrapers: tweets
            _.each(bot.plugins.twitter, function (config) {
                getTweets(config)
                .then(bot.report.bind(this, config));
            });

            // clean up
            // bot.storage.clean();
        }
    };

    // immediate execution when called via command line
    if (require.main === module)
        bot.process();

    // also usable as module
    module.exports = bot;

}());

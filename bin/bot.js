//#!/usr/bin/env node
(function () {

    'use strict';

    var FeedParser = require('feedparser'),
        deferred = require('deferred'),
        request = require('request'),
        _ = require('lodash'),
        osmosis = require('osmosis'),
        xray = require('x-ray'),
        debug = {
            app: require('debug')('app'),
            scrape: require('debug')('scrape'),
            reporting: require('debug')('reporting')
        };

    // alias
    function scrape(config) {
        // load source config and load data
        var def = deferred();
        // xray(config.url)
        // .select(config.selector)
        // .run(_.partial(config.extract, def));

        osmosis
        .get(config.url)
        .set(config.selector)
        .data(_.partial(config.extract, def));

        return def.promise;
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
                // TODO: https://github.com/lapwinglabs/x-ray
                scrape(config)
                .then(clean)
                .then(bot.report.bind(this, config));
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

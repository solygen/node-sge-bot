(function () {

    'use strict';

    var lib = require('../../lib/twitter'),
        bitly = require('../../lib/bitly'),
        colors = require('colors'),
        debug = {
            twitter: require('debug')('twitter')
        };

    var post = function (data, err, response) {
        var url, shorturl, content;

        // use bitly shortened url when available
        if (err) {
            console.log(JSON.stringify(err));
        } else {
            console.log(JSON.stringify(data));
            console.log(shorturl);
            shorturl = response.data.url;
        }
        url = shorturl || data.url;

        // create link
        content = // title
                  data.title + '\u000a' +
                  // hashtags + link
                  '#' + data.source + ' ' + url + '\u000a';

        // log
        debug.twitter(('TWITTER: ' + data.title).blue);

        // tweet
        lib.post(content);
    };

    module.exports = function (data) {
        // pipe url part through shortener
        if (data.id && data.type && data.type === 'tweet') {
            lib.retweet(data.id)
                .then(function () {
                    debug.twitter(('TWITTER: retweeted ' + data.title).blue);
                }, function (err) {
                    debug.twitter(('TWITTER: retweet:error ' + err.allErrors).red);
                });
        } else {
            bitly.shorten(data.url, post.bind(this, data));
        }
    };
}());

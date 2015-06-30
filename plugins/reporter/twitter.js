(function () {

    'use strict';

    var lib = require('../../lib/twitter'),
        bitly = require('../../lib/bitly'),
        debug = {
            twitter: require('debug')('twitter')
        };

    var post = function (data, err, response) {
        var url, shorturl, content;

        // use bitly shortened url when available
        if (err) {
            debug.twitter(JSON.stringify(err));
        } else {
            debug.twitter(JSON.stringify(data));
            debug.twitter(shorturl);
            shorturl = response.data.url;
        }
        url = shorturl || data.url;

        // create link
        content = // title
                  data.title + '\u000a' +
                  // hashtags + link
                  '#sge'  +  ' ' + '#' + data.source + ' '  + url + '\u000a';

        // log
        debug.twitter('TWITTER: ' + data.title);

        // tweet
        lib.post(content);
    };

    module.exports = {
        id: 'twitter',
        write: function (data) {
            // pipe url part through shortener
            if (data.id && data.type && data.type === 'tweet') {
                lib.retweet(data.id)
                    .then(function () {
                        debug.twitter('TWITTER: retweeted ' + data.title);
                    }, function (err) {
                        debug.twitter('TWITTER: retweet:error ' + err.allErrors);
                    });
            } else {
                bitly.shorten(data.url, post.bind(this, data));
            }
        }
    };
}());

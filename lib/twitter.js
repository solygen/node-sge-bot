(function () {

    'use strict';

    var Twit = require('twit'),
        fs = require('fs'),
        deferred = require('deferred'),
        instance;

    function getInstance () {
        // singleton
        if (!instance) {
            // load config/credentials
            var credentials = JSON.parse(fs.readFileSync(__dirname + '/../data/twitter.json')) || {};
            instance = new Twit(credentials);
        }
        return instance;
    }

    // callback to deferred
    function deferify (method, action, params) {
        var def = deferred(),
            process = function (err, data, response) {
                if (err) {
                    def.reject(err, response);
                } else {
                    def.resolve(data, response);
                }
            };

        getInstance()[method](action, params, process);
        return def.promise;
    }

    module.exports = {
        post: function (status) {
            return deferify('post', 'statuses/update', { status: status });
        },

        list: function (id) {
            return deferify('get', 'statuses/user_timeline', { screen_name: id, count: 5 });
        },

        retweet: function (id) {
            return deferify('post', 'statuses/retweet/:id', { id: id });
        }
    };
}());

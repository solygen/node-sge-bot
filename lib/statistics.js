//#!/usr/bin/env node
(function () {

    var fs = require('fs'),
        _ = require('lodash');

    module.exports = (function () {
        var storage = {},
            file = __dirname + '/../data/statistics.json';

        function read () {
            var content = fs.readFileSync(file, 'utf8');
            storage = JSON.parse(content);
        }

        function write () {
            fs.writeFileSync(file, JSON.stringify(storage, undefined, 4), 'utf8');
        }

        return {
            increment: function (name) {
                var day = (new Date()).toISOString().slice(0,7);

                storage[day] = (storage[day] || {});
                storage[day][name] = (storage[day][name] || 0);
                storage[day][name] = storage[day][name] + 1;
                write();
            },
            init: function () {
                read();
                return this;
            }
        };
    })();

}());

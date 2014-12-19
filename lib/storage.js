//#!/usr/bin/env node
(function () {

    var fs = require('fs'),
        _ = require('lodash');

    module.exports = (function () {
        var storage = {},
            file = __dirname + '/../data/storage.json';

        function read () {
            var content = fs.readFileSync(file, 'utf8');
            storage = JSON.parse(content);
        }

        function write () {
            fs.writeFileSync(file, JSON.stringify(storage, undefined, 4), 'utf8');
        }

        return {
            set: function (name, id) {
                storage[name] = (storage[name] || {});
                storage[name][id] = (new Date()).toISOString().slice(0,10);
                write();
            },
            get: function (name, id) {
                return (storage[name] || {})[id];
            },
            remove: function (name, id) {
                if (storage[name]) {
                    delete storage[name][id];
                    write();
                }
            },
            init: function () {
                read();
                return this;
            },
            clean: function () {
                // var day = (new Date()).toISOString().slice(0,10);
                // //loop all keys and remove all that key doesn't match
                // _.each(Object.keys(storage), function (name) {
                //     var chunk = storage[name];
                //         _.each(Object.keys(chunk), function (entry) {
                //             if (chunk[entry] !== day)
                //                 delete chunk[entry];
                //         });

                // });
                // write();
            }
        };
    })();

}());

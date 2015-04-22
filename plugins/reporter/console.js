(function () {

    'use strict';

    var _ = require('lodash'),
        colors = require('colors'),
        debug = {
            detail: require('debug')('console:detail')
        };

    module.exports = function (data) {
        // output
        debug.detail('  ' + (data.title.trim()).underline.green);
        debug.detail(data.content.trim());
        debug.detail((data.url));
        debug.detail('');
    };

}());

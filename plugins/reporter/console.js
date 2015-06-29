(function () {

    'use strict';

    var _ = require('lodash'),
        debug = {
            detail: require('debug')('console:detail')
        };

    module.exports = function (data) {
        // output
        console.log(data.title.trim());
        console.log(data.url.trim());
        //console.log(data.content.trim());
        console.log('================');
    };

}());

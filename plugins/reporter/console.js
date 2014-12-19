(function () {

    'use strict';

    var _ = require('lodash'),
        colors = require('colors');

    module.exports = function (data) {
        // output
        console.log();
        console.log((data.title.trim()).underline.green);
        console.log(data.content.trim());
        console.log((data.url).blue);
        console.log('');
        console.log();
    };

}());

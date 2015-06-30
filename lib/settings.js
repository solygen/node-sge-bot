(function () {

    'use strict';

    var jsonfile = require('jsonfile'),
        _ = require('lodash'),
        path = require('path'),
        file = path.join(__dirname, '../data/settings.json'),
        // get settings
        settings = _.extend({}, {
            cleanup: false,
            reporters: [
                console
            ]
        }, jsonfile.readFileSync(file));

    module.exports = settings;
}());

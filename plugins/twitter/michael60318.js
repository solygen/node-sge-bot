(function () {

    'use strict';

    var _ = require('lodash'),
        util = require('../../lib/util');

    module.exports =  {
        id: 'michael60318',
        name: 'twitter-michaelebert',
        filter: function (list) {
            return _.filter(list, function (item) {
                return util.isRelevant(title) && !/\S*kicker\.de\S*/.test(title);
            });
        }
    };

}());

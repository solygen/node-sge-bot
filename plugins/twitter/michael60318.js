(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        id: 'michael60318',
        name: 'twitter-michaelebert',
        filter: function (list) {
            return _.filter(list, function (item) {
                var title = item.title.toLowerCase();
                return (/#\S*sge/.test(title) || /#eintracht/.test(title) || (title.indexOf('@eintracht_news') > -1)) && !/#\S*kicker/.test(title);
            });
        }
    };

}());

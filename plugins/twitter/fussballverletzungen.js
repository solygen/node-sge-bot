(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        id: 'fbinjuries',
        name: 'twitter-fussballverletzungen',
        filter: function (list) {
            return _.filter(list, function (item) {
                var title = item.title.toLowerCase();
                return /#\S*sge/.test(title) || title.indexOf('@eintracht_news') > -1;
            });
        }
    };

}());

(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        id: 'FAZ_NET',
        name: 'twitter-faz',
        filter: function (list) {
            return _.filter(list, function (item) {
                var title = item.title.toLowerCase();
                return /#(\S{3}sge\s)|#(sge\S{3}\s)/.test(title) || title.indexOf('@eintracht_news') > -1;
            });
        }
    };

}());

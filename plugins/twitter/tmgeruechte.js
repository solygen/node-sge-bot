(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        id: 'TMgeruechte',
        name: 'twitter-tmgeruechte',
        filter: function (list) {
            return _.filter(list, function (item) {
                var title = item.title.toLowerCase();
                return /\S*#sge\S*/.test(title) || /\S*eintracht frankfurt\S*/.test(title);
            });
        }
    };

}());

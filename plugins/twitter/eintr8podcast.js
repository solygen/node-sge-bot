(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        id: 'eintr8podcast',
        name: 'twitter-eintr8podcast',
        filter: function (list) {
            return _.filter(list, function (item) {
                var title = item.title.toLowerCase();
                return /\S*#ep\d\d\d\S*/.test(title);
            });
        }
    };
}());

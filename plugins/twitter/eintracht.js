(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        id: 'eintracht',
        name: 'twitter-eintracht',
        filter: function (list) {
            // TODO: might filter #sgelive
            return list;
        }
    };

}());

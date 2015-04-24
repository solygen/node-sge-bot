(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        url: 'http://www.faz.net/rss/aktuell/rhein-main/sport/',
        name: 'faz:rhein-main',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                var title = item.title;
                if (title.indexOf('Eintracht Frankfurt:') === 0) {
                    data.push({
                        title: title,
                        content: item.description,
                        source: 'faz',
                        short: item.summary.slice(0,140),
                        url: item.link
                    });
                }
            }
        }
    };

}());

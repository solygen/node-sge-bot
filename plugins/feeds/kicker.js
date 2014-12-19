(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        url: 'http://rss.kicker.de/team/eintrachtfrankfurt',
        name: 'kicker',
        extract: function (data) {
            var stream = this, item;

            // add to data (collector)
            while ( (item = stream.read()) ) {
                // ingnore matchday news
                if (item.categories.length < 18) {
                    data.push({
                        title: item.title,
                        content: item.content,
                        source: 'kicker',
                        short: item.summary.slice(0,140),
                        url: item.link
                    });
                }
            }
        }
    };

}());

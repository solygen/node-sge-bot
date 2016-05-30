(function () {

    'use strict';

    var _ = require('lodash');

    module.exports =  {
        url: 'https://www.youtube.com/feeds/videos.xml?user=EintrachtMedia',
        name: 'youtube:ef',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                // fix feed
                item.description = _.isNull(item.description) ? '' : item.description;
                data.push({
                    title: item.title,
                    content: item.description,
                    source: 'eintracht',
                    short: item.description.slice(0,140),
                    url: item.link
                });
            }
        }
    };

}());

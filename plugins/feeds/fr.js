(function () {

    'use strict';

    module.exports =  {
        url: 'http://rss.feedsportal.com/c/429/f/646653/index.rss',
        name: 'fr',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                data.push({
                    title: item.title,
                    content: item.description.replace(/<(.*?)>/ig, ''),
                    source: 'fr',
                    short: item.summary.replace(/<(.*?)>/ig, '').slice(0,140),
                    url: item.link
                });
            }
        }
    };

}());

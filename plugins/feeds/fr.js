(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.fr-online.de/eintracht-frankfurt/1473446,1473446,view,asFeed.xml',
        //url: 'https://www.fr.de/sport/eintracht/?_XML=rss',
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

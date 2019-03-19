(function () {

    'use strict';

    module.exports =  {
        url: 'https://www.fr.de/sport/eintracht/?_XML=rss',
        name: 'fr',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                var pass = (item.link || '').indexOf('sport/eintracht') >= 0;

                if (pass) {
                    data.push({
                        title: item.title,
                        content: (item.description || '').replace(/<(.*?)>/ig, ''),
                        source: 'fr',
                        short: (item.description || '').replace(/<(.*?)>/ig, '').slice(0,140),
                        url: item.link
                    });
                }
            }
        }
    };

}());

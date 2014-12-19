(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.fnp.de/storage/rss/rss/eintracht/feed.xml',
        name: 'fnp',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                // TODO: umlauts

                if (item.title.indexOf('Tippspiel') === -1) {
                    //console.log(he.decode(item.description));
                    data.push({
                        title: item.title,
                        content: item.description,
                        source: 'fnp',
                        short: '',
                        url: item.link
                    });
                }
            }
        }
    };

}());

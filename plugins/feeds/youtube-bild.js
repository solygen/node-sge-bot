(function () {

    'use strict';

    module.exports =  {
        url: 'http://gdata.youtube.com/feeds/base/users/BildBundesliga/uploads',
        name: 'youtube:bildbundesliga',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                if (item.title.indexOf('Eintracht Frankfurt') > -1) {
                    data.push({
                        title: item.title,
                        content: item.description,
                        source: 'bild',
                        short: item.description.slice(0,140),
                        url: item.link
                    });
                }
            }
        }
    };

}());

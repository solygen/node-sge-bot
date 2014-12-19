(function () {

    'use strict';

    module.exports =  {
        url: 'http://gdata.youtube.com/feeds/base/users/EintrachtMedia/uploads',
        name: 'youtube:ef',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
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

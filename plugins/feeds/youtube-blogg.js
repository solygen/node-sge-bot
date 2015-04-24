(function () {

    'use strict';

    module.exports =  {
        url: 'http://gdata.youtube.com/feeds/base/users/bloggde/uploads',
        name: 'youtube:blog-g',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                data.push({
                    title: item.title,
                    content: item.description,
                    source: 'blogg',
                    short: item.description.slice(0,140),
                    url: item.link
                });
            }
        }
    };

}());

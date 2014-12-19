(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.blog-g.de/feed/',
        name: 'blog-g',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {
                data.push({
                    title: item.title,
                    content: item.description,
                    source: 'blogg',
                    short: item.summary.slice(0,140),
                    url: item.link
                });
            }
        }
    };

}());

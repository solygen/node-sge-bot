(function () {

    'use strict';

    module.exports =  {
        url: 'http://gdata.youtube.com/feeds/base/users/MrJoshuah96LP2/uploads',
        name: 'youtube:MrJoshuah96LP2',
        extract: function (data) {
            var stream = this, item;
            // add to data (collector)
            while ( (item = stream.read()) ) {

                data.push({
                    title: item.title,
                    content: item.description,
                    source: 'MrJoshuah96LP2',
                    short: item.description.slice(0,140),
                    url: item.link
                });
            }
        }
    };

}());

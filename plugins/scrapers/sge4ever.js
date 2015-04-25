(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.sge4ever.de/',
        name: 'sge4ever',
        icon: '',
        selector: {
            'titles[]': '.post>h2',
            'links[]': '.post>h2>a@href',
            'contents[]': '.post .entry>p'
        },
        hashtags: ['sge4ever'],
        extract: function (def, data) {
            var titles = data.titles,
                links = data.links,
                contents = data.contents,
                list = [];

            titles.forEach(function (title, index) {
                list.push({
                    title: title,
                    content: contents[index],
                    short: title.slice(0,140),
                    source: 'sge4ever',
                    url: links[index]
                });
            });

            def.resolve(list);
        }
    };

}());

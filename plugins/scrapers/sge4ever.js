(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.sge4ever.de/',
        name: 'sge4ever',
        icon: '',
        selector: {
            'titles[]': '.td-big-grid-wrapper .td-module-title>a',
            'links[]': '.td-big-grid-wrapper .td-module-title>a@href'
        },
        hashtags: ['sge4ever'],
        extract: function (def, data) {
            var titles = data.titles,
                links = data.links,
                contents = '',
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

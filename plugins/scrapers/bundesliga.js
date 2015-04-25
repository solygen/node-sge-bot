(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.bundesliga.de/de/clubs/eintracht-frankfurt/',
        name: 'buli',
        icon: '',
        selector: {
            'titles[]': '.news-content h3',
            'links[]': '.list-entry>a@href',
            'contents[]': '.news-content p'
        },
        hashtags: ['buli'],
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
                    source: 'buli',
                    url: 'http://www.bundesliga.de' + links[index]
                });
            });

            def.resolve(list);
        }
    };

}());

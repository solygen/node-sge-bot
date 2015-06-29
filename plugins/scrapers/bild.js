(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.bild.de/themen/organisationen/eintracht-frankfurt/sport-nachrichten-news-fotos-videos-19197448.bild.html/',
        name: 'bild',
        icon: '',
        selector: {
            'titles[]': '.tr .t10l .headline span',
            'links[]': '.tr .t10l>a@href',
            'contents[]': '.tr .t10l .entry-content'
        },
        hashtags: ['bild'],
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
                    source: 'bild',
                    url: 'http://www.bild.de' + links[index]
                });
            });

            def.resolve(list);
        }
    };

}());

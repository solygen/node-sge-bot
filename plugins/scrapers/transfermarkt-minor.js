(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.transfermarkt.de/eintracht-frankfurt/news/verein/24',
        name: 'tm',
        icon: '',
        selector: {
            'titles[]': '.news-sixpack-alt h2>a',
            'images[]': '.news-sixpack-alt .minifoto@src',
            'links[]': '.news-sixpack-alt>a@href',
            'contents[]': '.news-sixpack-alt h3'
        },
        hashtags: ['tm'],
        extract: function (def, data) {
            var titles = data.titles,
                links = data.links,
                images = data.images,
                contents = data.contents,
                list = [];

            images.forEach(function (image, index) {
                if (image.indexOf('/24.png') === -1) return;

                list.push({
                    title: titles[index],
                    content: contents[index],
                    short: titles[index].slice(0,140),
                    source: 'tm',
                    url: 'http://www.transfermarkt.de' + links[index]
                });
            });

            def.resolve(list);
        }
    };

}());

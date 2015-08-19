(function () {

    'use strict';

    module.exports =  {
        url: 'http://hessenschau.de/sport/fussball/eintracht-frankfurt/index.html   ',
        name: 'hr3',
        icon: '',
        selector: {
            'titles[]': 'article a.teaser__headlineLink .text__headline',
            'links[]': 'article a.teaser__headlineLink@href'
        },
        hashtags: ['hr3'],
        extract: function (def, data) {
            var titles = data.titles,
                links = data.links,
                contents = '',
                list = [];

            titles.forEach(function (title, index) {

                // ignore ticker
                if (index === 0 || index >= 5) return;

                list.push({
                    title: title,
                    content: contents[index],
                    short: title.slice(0,140),
                    source: 'hr3',
                    url: 'http://www.hr-online.de' + links[index]
                });
            });

            def.resolve(list);
        }
    };

}());

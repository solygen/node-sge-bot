(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.transfermarkt.de/eintracht-frankfurt/marktwertanalyse/verein/24',
        name: 'tmmw',
        icon: '',
        selector: {
            'titles[]': '.spielprofil_tooltip',
            'images[]': '.bilderrahmen@src',
            'links[]': '.spielprofil_tooltip@href',
            'contents[]': '.rechts.hauptlink',
            'trends[]': '.rechts.hauptlink>span@class'
        },
        hashtags: ['tm'],
        extract: function (def, data) {
            var titles = data.titles,
                links = data.links,
                images = data.images,
                contents = data.contents,
                trends = data.trends,
                list = [];

            titles.forEach(function (title, index) {
                list.push({
                    title: title + ': ' + contents[index],
                    content: contents[index],
                    short: title.slice(0,140),
                    source: 'tmmw',
                    url: 'http://www.transfermarkt.de' + (links[index].replace('/profil/', '/marktwertverlauf/'))
                });
            });

            def.resolve(list);
        }
    };

}());

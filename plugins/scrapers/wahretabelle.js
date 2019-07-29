(function () {

    'use strict';

    module.exports =  {
        url: 'https://www.wahretabelle.de/verein/eintr-frankfurt/11',
        name: 'wahretabelle',
        icon: '',
        selector: {
            'links[]': '.spielergebnis .ac a@href'
        },
        hashtags: ['wahretabelle'],
        extract: function (def, data) {
            var links = data.links,
                list = [];

            links.forEach(function (link, index) {
                list.push({
                    title: 'Auswertung: ' + (index + 1) + '. Spieltag',
                    content: '',
                    short: '',
                    source: 'wahretabelle',
                    url: 'https://www.wahretabelle.de' + link
                });
            });

            def.resolve(list);
        }
    };

}());

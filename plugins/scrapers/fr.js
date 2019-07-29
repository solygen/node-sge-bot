(function () {

    'use strict';

    module.exports =  {
        url: 'https://www.fr.de/eintracht-frankfurt/',
        name: 'fr',
        icon: '',
        selector: {
            'titles[]': '.id-SiteMain .id-Teaser-el-content .id-Teaser-el-content-headline-text',
            'links[]': '.id-SiteMain .id-LinkOverlay-link@href',
            'contents[]': '.id-SiteMain .id-Teaser-el-content .id-Teaser-el-content-text-text',
            'kicker[]': '.id-SiteMain .id-Teaser-el-content .id-Teaser-el-content-kicker-text'
            //'author[]': '.id-SiteMain .id-Teaser-el-content .id-Teaser-el-content-author span:nth-child(2)',
        },
        hashtags: ['fr'],
        extract: function (def, data) {
            var titles = data.titles,
                links = data.links,
                kickers = data.kicker,
                contents = '',
                list = [];

            titles.forEach(function (title, index) {
                var kicker = (kickers[index] || '').toLowerCase();
                if (kicker.indexOf('ballhorn') > -1) return;
                if (kicker.indexOf('transfer-ticker') > -1) return;
                list.push({
                    title: title,
                    content: contents[index],
                    short: title.slice(0,140),
                    source: 'fr',
                    url: 'https://www.fr.de' + links[index]
                });
            });

            def.resolve(list);
        }
    };

}());

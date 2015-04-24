(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.hr-online.de/website/rubriken/sport/index.jsp?rubrik=38120&key=standard_document_41431325',
        name: 'hr3',
        icon: '',
        selector: {
            'titles[]': '.teaser h2',
            'contents[]': '.teaser .absatzcontent.centered'
        },
        hashtags: ['hr3'],
        extract: function (def, data) {

            var titles = data.titles,
                contents = data.contents;

            //console.log(titles);
            var list = [],
                blacklist = [
                    'lilien',
                    'darmstadt',
                    'fsv',
                    'stöver',
                    'bornheim'
                ];

            titles.forEach(function (h2, index) {

                // normalize title
                var title = h2.replace('+++', '').replace('+++', '').trim(),
                    content = contents[index];

                // filter blacklist items
                var pass = !!title;
                blacklist.forEach(function (word) {
                    if (pass) {
                        pass = title.toLowerCase().indexOf(word) === -1 &&
                               content.toLowerCase().indexOf(word) === -1;

                    }
                });

                if (pass) {
                    list.push({
                        title: title,
                        content: content,
                        short: title.slice(0,140),
                        source: 'hr3',
                        url: 'http://www.hr-online.de/website/rubriken/sport/index.jsp?rubrik=38120&key=standard_document_41431325'
                    });
                }
            });

            def.resolve(list);
        }
    };

}());

(function () {

    'use strict';

    module.exports =  {
        url: 'http://hessenschau.de/sport/fussball/aktuelles-von-eintracht-sv98--fsv,bundesliga-ticker-100.html',
        name: 'hr3-ticker',
        icon: '',
        selector: {
            'titles[]': '.copytext__headline[itemprop="headline"]',
            'contents[]': '.copytext__text'
        },
        hashtags: ['hr3'],
        extract: function (def, data) {

            var titles = data.titles,
                contents = data.contents;

            //console.log(titles);
            var list = [],
                blacklist = [
                    'lilien',
                    'svww',
                    'hatira',
                    'schipplock',
                    'sv98',
                    'fritsch',
                    'lilie',
                    'sulu',
                    'darmstadt',
                    'fsv',
                    'stöver',
                    'bornheim',
                    'herrmann'
                ];


            titles = titles.filter(function (h2) {
                return h2.indexOf('+++') >= 0;
            });

            contents = contents.filter(function (h2) {
                return h2.length >= 50;
            });

            titles.forEach(function (h2, index) {

                // limit to 5 latest
                if (index >= 5) return;

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
                        source: 'hr3ticker',
                        url: 'http://hessenschau.de/sport/fussball/aktuelles-von-eintracht-sv98--fsv,bundesliga-ticker-100.html'
                    });
                    // use manual index to skip date headlines
                    index = index + 1;
                }
            });

            def.resolve(list);
        }
    };

}());

(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.transfermarkt.de/eintracht-frankfurt/news/verein/24',
        name: 'transfermarkt',
        icon: '',
        hashtags: ['transfermarkt'],
        extract: function () {
            var list = $('.news-content'),
                sections = [],
                blacklist = [
                    // remove spieltag summaries
                    'spieltag',
                    'pleite',
                    'erfolge',
                    'serie'
                ];

            $.each(list, function (index, section) {
                section = $(section);
                // normalize title
                var title = section.find('h2').text().trim(),
                    content = section.find('p').text().replace('weiterlesen', '').trim(),
                    link = 'http://www.transfermarkt.de' + section.find('p').find('a').attr('href');

                // filter blacklist items
                var pass = !!title;
                $.each(blacklist, function (index, word) {
                    if (pass) {
                        pass = title.toLowerCase().indexOf(word) === -1;
                    }
                });

                if (pass) {
                    sections.push({
                        title: title,
                        content: content,
                        short: content.slice(0,140),
                        url: link,
                        source: 'tm'
                    });
                }
            });

            return sections;
        }
    };
}());

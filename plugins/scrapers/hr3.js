(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.hr-online.de/website/rubriken/sport/index.jsp?rubrik=38120&key=standard_document_41431325',
        name: 'hr3',
        icon: '',
        hashtags: ['hr3'],
        extract: function ($) {
            var blacklist = [
                    'lilien',
                    'darmstadt',
                    'fsv',
                    'stöver',
                    'bornheim'
                ];

            // remove date headers from teaserboxes
            $('.slang_box_large').remove();

            var list = $('.teaserbox'),
                sections = [];

            $.each(list, function (index, section) {
                section = $(section);
                // normalize title
                var title = section.find('h2').text().replace('+++', '').replace('+++', '').trim(),
                    content = $(section.find('.absatzcontent.centered')[0]).text();

                // filter blacklist items
                var pass = !!title;
                $.each(blacklist, function (index, word) {
                    if (pass) {
                        pass = title.toLowerCase().indexOf(word) === -1 &&
                               content.toLowerCase().indexOf(word) === -1;
                    }
                });

                if (pass) {
                    sections.push({
                        title: title,
                        content: content,
                        short: title.slice(0,140),
                        source: 'hr3',
                        url: 'http://www.hr-online.de/website/rubriken/sport/index.jsp?rubrik=38120&key=standard_document_41431325'
                    });
                }
            });
            console.log(sections);
            return sections;
        }
    };

}());

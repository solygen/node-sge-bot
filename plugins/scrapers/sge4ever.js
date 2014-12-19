(function () {

    'use strict';

    module.exports =  {
        url: 'http://www.sge4ever.de/',
        name: 'sge4ever',
        icon: '',
        hashtags: ['sge4ever'],
        extract: function ($)  {

            console.log(arguments);
            var list = $('.post'),
                sections = [];

            $.each(list, function (index, section) {
                section = $(section);
                // normalize title
                var title = section.find('h2').text().trim(),
                    content = section.find('.entry p').text().trim();

                sections.push({
                    title: title,
                    content: content,
                    short: content.slice(0,140),
                    url: link,
                    source: 'sge4ever'
                });
            });

            return sections;
        }
    };
}());

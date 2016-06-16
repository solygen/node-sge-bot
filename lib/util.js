(function () {

    'use strict';

    var _ = require('lodash');

    function normalize(text) {
        return text.toLowerCase();
    }

    var self = {
        // #sge[xxx] or #[xxx]sge
        hasMatchHash: function (text) {
            text = normalize(text);
            return /#(\S{3}sge\s)|#(sge\s)/.test(text);
        },
        // #sge
        hasClubHash: function (text) {
            text = normalize(text);
            return /\s#sge(\s|\.)/.test(text) ||
                    /\s#eintracht(\s|\.)/.test(text);
        },
        // eintracht frankfurt
        hasClubName: function (text) {
            text = normalize(text);
            return /\S*eintracht frankfurt\S*/.test(text);
        },
        // @eintracht
        hasUserTag: function (text) {
            text = normalize(text);
            return text.indexOf('@eintracht_news') > -1 || text.indexOf('@eintracht') > -1;
        },
        // combined check
        isRelevant: function (text) {
            return self.hasMatchHash(text) ||
                   self.hasClubHash(text) ||
                   self.hasUserTag(text) ||
                   self.hasClubName(text);
        },

        // filter list
        relevant: function (list) {
            return _.filter(list, function (item) {
                return self.isRelevant(item.title);
            });
        }
    }

    module.exports = self;

}());

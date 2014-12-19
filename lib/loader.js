(function () {

    'use strict';

    var _ = require('lodash'),
        fs = require('fs'),
        data = {};

    // read plugins root folder content
    var content = fs.readdirSync('../plugins');

    // get all directories
    var folders = _.filter(content, function (name) {
        var fullname = '../plugins' +'/' + name;
        return fs.statSync(fullname).isDirectory();
    });

    // load all files of subfolder and reference in data
    _.each(folders, function (name) {
        var folder = '../plugins/' + name,
            plugins = fs.readdirSync(folder),
            list = data[name] = data[name] || [];

        _.each(plugins, function (file) {
            if (file.indexOf('.js') > -1)
                list.push(require(folder + '/' + file));
        });

    });

    module.exports = data;

}());

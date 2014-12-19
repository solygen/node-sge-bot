(function () {

    'use strict';

    var fs = require('fs'),
        credentials = JSON.parse(fs.readFileSync(__dirname + '/../data/bitly.json')) || {},
        Bitly = require('bitly'),
        bitly = new Bitly(credentials.access_token, credentials.access_token_key);

    module.exports = bitly;

}());

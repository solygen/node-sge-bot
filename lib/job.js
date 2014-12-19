//#!/usr/bin/env node
(function () {

    //http://www.apcoder.com/2013/10/03/twitter-bot-20-minutes-node-js/
    //http://scotch.io/tutorials/hosting/how-to-deploy-a-node-js-app-to-heroku?utm_source=nodeweekly&utm_medium=email

    'use strict';

    var schedule = require('node-schedule');

    var rule = new schedule.RecurrenceRule();
    rule.minute = 15;

    var bot = require('./bot');

    var j = schedule.scheduleJob(rule, function () {
        console.log('-----------------');
        bot.process();
    });

}());

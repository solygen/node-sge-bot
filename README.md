node-sge-bot
=========

``eintracht frankfurt news bot``

[![Dependency Status](https://david-dm.org/solygen/node-sge-bot.svg?style=flat)](https://david-dm.org/solygen/node-sge-bot)
##plugins

```
// data input
plugins/feeds
plugins/scrapers

// data output
plugins/reporter
```
## internal libs

```
// cronjob like execution
lib/job.js

// generic plugin loader
lib/loader.js

// keep track of already processed news items
lib/storage.js
```

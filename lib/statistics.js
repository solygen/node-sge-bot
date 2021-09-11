// #!/usr/bin/env node
(function () {
  const fs = require('fs')
  const path = require('path')

  module.exports = (function () {
    let storage = {}
    const file = path.join(__dirname, '/../data/statistics.json')

    function read () {
      const content = fs.readFileSync(file, 'utf8')
      storage = JSON.parse(content)
    }

    function write () {
      fs.writeFileSync(file, JSON.stringify(storage, undefined, 4), 'utf8')
    }

    return {
      increment: function (name) {
        const day = (new Date()).toISOString().slice(0, 7)

        storage[day] = (storage[day] || {})
        storage[day][name] = (storage[day][name] || 0)
        storage[day][name] = storage[day][name] + 1
        write()
      },
      init: function () {
        read()
        return this
      }
    }
  })()
}())

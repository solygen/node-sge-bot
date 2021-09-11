// #!/usr/bin/env node
(function () {
  const fs = require('fs')
  const _ = require('lodash')
  const path = require('path')

  module.exports = (function () {
    let storage = {}
    const file = path.join(__dirname, '/../data/storage.json')

    function read () {
      const content = fs.readFileSync(file, 'utf8')
      storage = JSON.parse(content)
    }

    function write () {
      fs.writeFileSync(file, JSON.stringify(storage, undefined, 4), 'utf8')
    }

    return {
      set: function (name, id) {
        storage[name] = (storage[name] || {})
        storage[name][id] = (new Date()).toISOString().slice(0, 10)
        write()
      },
      get: function (name, id) {
        return (storage[name] || {})[id]
      },
      remove: function (name, id) {
        if (storage[name]) {
          delete storage[name][id]
          write()
        }
      },
      init: function () {
        read()
        return this
      },
      clean: function () {
        const day = (new Date()).toISOString().slice(0, 10)
        // loop all keys and remove all that key doesn't match
        _.each(Object.keys(storage), function (name) {
          const chunk = storage[name]
          _.each(Object.keys(chunk), function (entry) {
            if (chunk[entry] !== day) { delete chunk[entry] }
          })
        })
        write()
      }
    }
  })()
}())

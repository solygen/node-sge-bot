const Masto = require('mastodon')
const deferred = require('deferred')

let instance = null

function getInstance () {
  // singleton
  if (instance) return instance
  instance = new Masto({
    access_token: process.env.MASTODON_TOKEN,
    // optional HTTP request timeout to apply to all requests.
    timeout_ms: 60 * 1000,
    // optional, defaults to https://mastodon.social/api/v1/
    api_url: 'https://mastodon.social/api/v1/'
  })
  return instance
}

// callback to deferred
function deferify (method, action, params) {
  const def = deferred()
  const process = function (err, data, response) {
    if (err) {
      def.reject(err, response)
    } else {
      def.resolve(data, response)
    }
  }

  getInstance()[method](action, params, process)
  return def.promise
}

module.exports = {
  post: async function (status = 'status') {
    return deferify('post', 'statuses', { status: status })
  },

  retweet: function (id) {
    return deferify('post', 'statuses/retweet/:id', { id: id })
  }
}

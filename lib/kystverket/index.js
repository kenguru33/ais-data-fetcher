const fetch = require('node-fetch')

const aisData = function (url) {
  return fetch(url)
    .then(response => {
      return response.json()
    })
}

module.exports = aisData

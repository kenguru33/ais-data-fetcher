const fetch = require('node-fetch')
/**
 *
 * @param url
 * @returns {Promise.<Object>}
 */
const aisData = function (url) {
  return fetch(url)
    .then(response => {
      return response.json()
    })
}

module.exports = aisData

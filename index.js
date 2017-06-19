const aisDataFetcher = require('./lib/kystverket/index')

setInterval(() => {
  aisDataFetcher(process.env.URL)
    .then(data => {
      console.log(data)
    })
}, 5000)

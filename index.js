const aisDataFetcher = require('./lib/kystverket/index')
if (!process.env.URl) throw new Error('Url must be specified')
console.log('starting  fetching from ' + process.env.URL)
setInterval(() => {
  aisDataFetcher(process.env.URL)
    .then(data => {
      console.log(data)
    })
}, 5000)

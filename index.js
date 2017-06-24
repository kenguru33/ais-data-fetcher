const aisDataFetcher = require('./lib/kystverket/index')
if (!process.env.URl) process.exit()
console.log('starting  fetching from ' + process.env.URL)
setInterval(() => {
  aisDataFetcher(process.env.URL)
    .then(data => {
      console.log(data)
    })
}, 5000)

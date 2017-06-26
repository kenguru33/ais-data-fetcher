const aisDataFetcher = require('./lib/kystverket/index')
if (!process.env.URL) {
  console.log('Url is empty')
  process.exit()
}
setInterval(() => {
  aisDataFetcher(process.env.URL)
    .then(data => {
      console.log(data)
    })
}, 5000)

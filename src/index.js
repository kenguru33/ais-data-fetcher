// just a comment!
const producer = require('./lib/queue/producer')
const aisDataFetcher = require('./lib/kystverket/index')
if (!process.env.URL) {
  console.log('Url is empty')
  process.exit()
}
setInterval(() => {
  aisDataFetcher(process.env.URL)
    .then(data => {
      console.log(data)
      producer()
    })
}, 5000)

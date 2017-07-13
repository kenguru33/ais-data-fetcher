const amqp = require('amqplib/callback_api')
let amqpConn = null

const start = function () {
  amqp.connect(process.env.MESSAGE_BROKER_URL + '?heartbeat=60', (err, conn) => {
    if (err) {
      console.error('[AMQP]', err.message)
      return setTimeout(start, 1000)
    }
    conn.on('error', err => {
      if (err.message !== 'Connection closing') {
        console.error('[AMQP] conn error', err.message)
      }
    })
    conn.on('close', () => {
      console.error('[AMQP] reconnecting')
      return setTimeout(start, 1000)
    })
    console.log('[AMQP] connected')
    amqpConn = conn
    whenConnected()
  })
}

const whenConnected = function () {

}
module.exports = start

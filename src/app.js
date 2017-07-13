// Access the callback-based API
const amqp = require('amqplib/callback_api')
let amqpConn = null

function start () {
  amqp.connect(process.env.MESSAGE_BROKER_URL + '?heartbeat=60', function (err, conn) {
    if (err) {
      console.error('[AMQP]', err.message)
      return setTimeout(start, 1000)
    }
    conn.on('error', function (err) {
      if (err.message !== 'Connection closing') {
        console.error('[AMQP] conn error', err.message)
      }
    })
    conn.on('close', function () {
      console.error('[AMQP] reconnecting')
      return setTimeout(start, 1000)
    })
    console.log('[AMQP] connected')
    amqpConn = conn
    whenConnected()
  })
}

function whenConnected () {
  startPublisher()
  // startWorker();
}

let pubChannel = null
const offlinePubQueue = []
function startPublisher () {
  amqpConn.createConfirmChannel(function (err, ch) {
    if (closeOnErr(err)) return
    ch.on('error', function (err) {
      console.error('[AMQP] channel error', err.message)
    })
    ch.on('close', function () {
      console.log('[AMQP] channel closed')
    })

    pubChannel = ch
    while (true) {
      const m = offlinePubQueue.shift()
      if (!m) break
      publish(m[0], m[1], m[2])
    }
  })
}

function publish (exchange, routingKey, content) {
  try {
    pubChannel.publish(exchange, routingKey, content, { persistent: true },
      function (err, ok) {
        if (err) {
          console.error('[AMQP] publish', err)
          offlinePubQueue.push([exchange, routingKey, content])
          pubChannel.connection.close()
        }
      })
  } catch (e) {
    console.error('[AMQP] publish', e.message)
    offlinePubQueue.push([exchange, routingKey, content])
  }
}

function closeOnErr (err) {
  if (!err) return false
  console.error('[AMQP] error', err)
  amqpConn.close()
  return true
}

setInterval(function () {
  console.log('publishing data on queue...')
  publish('', 'jobs', Buffer.from('work work work'))
}, 1000)

start()

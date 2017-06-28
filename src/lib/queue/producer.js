// goto rabbitmq to code examples
const amqp = require('amqplib')
let q = 'aisdata'
module.exports = function () {
  amqp.connect('amqp://message-bus')
        .then(conn => {
          return conn.createChannel()
        })
        .then(ch => {
          return ch.assertQueue(q)
                .then(() => {
                  return ch.sendToQueue(q, Buffer.from('something to do'))
                })
        })
        .catch(console.warn)
}

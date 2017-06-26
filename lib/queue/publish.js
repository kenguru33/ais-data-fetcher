// https://github.com/mqttjs/MQTT.js
// https://www.cloudamqp.com/docs/nodejs_mqtt.html
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://eclipse-mosquitto:1883')

client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // client.end()
})

const publish = function (msg) {
  console.log('publishing aisdata...')
  client.publish('presence', msg)
}


module.exports = publish

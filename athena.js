

var config = require('./settings');
var pjson = require('./package.json');

console.log("---- Athena ----");
console.log("Version: " + pjson.version);
console.log("Broker:  " + config.mqttBrokerHost);
console.log("Topic:   " + config.mqttBrokerTopic);
console.log("")

var mqtt = require('mqtt');

client = mqtt.createClient(config.mqttBrokerPort, config.mqttBrokerHost);

client.subscribe(config.mqttBrokerTopic);


client.on('message', function (topic, message) {
  var record = {};
  record.payload = message;
  record.topic = topic;
  record.time = new Date().getTime();
  console.log(record);
});

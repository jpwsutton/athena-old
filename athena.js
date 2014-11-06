

var config = require('./settings');
var pjson = require('./package.json');

var mqtt = require('mqtt');
var mongodb = require('mongodb');

console.log("---- Athena ----");
console.log("Version: " + pjson.version);
console.log("Broker:  " + config.mqttBrokerHost);
console.log("Topic:   " + config.mqttBrokerTopic);
console.log("----------------")

MqttClient = mqtt.createClient(config.mqttBrokerPort, config.mqttBrokerHost);
MqttClient.subscribe(config.mqttBrokerTopic);


MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://" + config.mongoHost + ":" + config.mongoPort + "/athena", function(err, db){
  if (!err){
    console.log("Connected to MongoDB");
    // Create the collections if they do not yet exist
    db.createCollection('topics', function(err, collection) {});
    db.createCollection('records', function(err, collection) {});

    var topicCollection = db.collection('topics');
    var recordsCollection = db.collection('records');

    MqttClient.on('message', function (topic, message) {
      var record = {};
      record.payload = JSON.parse(message);
      record.topic = topic;
      record.time = new Date().getTime();
      console.log();
      console.log("----------------------------------")
      console.log(record);
      verifyOrCreateTopic(topicCollection, record);
      console.log("----------------------------------")
    });
  }



});

function verifyOrCreateTopic(topicCollection, message){
  console.log("Checking topic: " + message.topic);

  topicCollection.findOne({topic:message.topic}, function(err, item) {
    if (item == null){
        console.log("Topic %s does not exist, creating.", message.topic);
        var topicRecord = {};
        topicRecord.topic = message.topic;
        if(message.payload._type){
          topicRecord.type = message.payload._type;
        }

        console.log("Creating topic: %j", topicRecord);

        topicCollection.insert(topicRecord, {w:1}, function(err, result) {
          if(err){
            console.log("Could not record topic: " + err);
          }
        });
    }

  });
}

function logMessage(message){
  if(config.verbose){
    console.log(message);
  }

}



var config = require('./settings.json');
var pjson = require('./package.json');

var mqtt = require('mqtt');
var mongodb = require('mongodb');

console.log("---- Athena ----");
console.log("Version: " + pjson.version);
console.log("Broker:  " + config.mqttBrokerHost + ":" + config.mqttBrokerPort);
console.log("Topic:   " + config.mqttBrokerTopic);
console.log("----------------")

MqttClient = mqtt.createClient(config.mqttBrokerPort, config.mqttBrokerHost);
MqttClient.subscribe(config.mqttBrokerTopic);


MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://" + config.mongoDbHost + ":" + config.mongoDbPort + "/athena", function(err, db){
  if (!err){
    logMessage("Connected to MongoDB");
    // Create the collections if they do not yet exist
    db.createCollection('topics', function(err, collection) {});
    db.createCollection('records', function(err, collection) {});

    var topicCollection = db.collection('topics');
    var recordsCollection = db.collection('records');

    MqttClient.on('message', function (topic, message) {
      var record = {};
      try {
        record.payload = JSON.parse(message);
      } catch (e) {
        record.payload = {content: message, _type : "unknown"};
      }
      record.topic = topic;
      record.time = new Date().getTime();
      logMessage();
      logMessage("----------------------------------")
      logMessage(record);
      verifyOrCreateTopic(topicCollection, record);
      recordsCollection.insert(record, {w:1}, function(err, result){});
      logMessage("----------------------------------")
    });
  }



});

/*
 *               verifyOrCreateTopic
 *
 * topicCollection -> MongoDb Collection for topics
 * message -> message object containing payload and topic
 *
 * This function queries the collection to see if this topic
 * exists in it. If it does not exist, it is inserted.
 *
*/
function verifyOrCreateTopic(topicCollection, message){
  topicCollection.findOne({topic:message.topic}, function(err, item) {
    if (item == null){
        logMessage("Topic " + message.topic + " does not exist, creating.");
        var topicRecord = {};
        topicRecord.topic = message.topic;
        if(message.payload._type){
          topicRecord.type = message.payload._type;
        }
        topicCollection.insert(topicRecord, {w:1}, function(err, result) {});
    }
  });
}



function logMessage(message){
  if(config.verbose){
    if(message == null){
      console.log("");
    } else {
      console.log(message);
    }
  }

}

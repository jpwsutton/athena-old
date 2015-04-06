var mongo = require('mongodb'),
    mqtt = require('mqtt'),
    config = require('./settings.json');


var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('athenadb', server, {safe: true});

var MqttClient = mqtt.createClient(config.mqttBrokerPort, config.mqttBrokerHost);
MqttClient.subscribe(config.mqttBrokerTopic);

db.open(function(err, db) {
  if(!err) {
    console.log("Subscriber Connected to 'athenadb' database");
    db.collection('topics', {safe:true}, function(err, collection) {
      if (err) {
        console.log("The 'topics' collection doesn't exist. ");
      }
    });
  } else {
    console.log("Subscriber: " + err);
  }
});


MqttClient.on('message', function(topic, message){
  var record = {};
  try {
    record.payload = JSON.parse(message);
  } catch(e) {
    record.payload = {content: message, _type: 'unknown'};
  }
  record.topic = topic;
  record.time = new Date().getTime();
  //logMessage(record);
  verifyOrCreateTopic(record);
  processIncomingMessage(record);
});


function verifyOrCreateTopic(record){
  db.collection('topics', function(err, collection){
    collection.findOne({topic:record.topic}, function(err, item){
      if (item == null){
        logMessage("Topic " + record.topic + " does not exist, creating.");
        var topicRecord = {};
        topicRecord.topic = record.topic;
        if(record.payload._type){
          topicRecord.type = record.payload._type;
        }
        collection.insert(topicRecord, {safe: true}, function(err, result){
          if(err){
            logError(err);
          } else {
            logMessage("Success! " + topicRecord.topic + " added to database");
          }
        });
      }
    });
  });
}

function processIncomingMessage(record){
    global.lastMessages[record.topic] = record;
  db.collection('records', function(err, collection){
    collection.insert(record, {safe:true}, function(err, result){
      if(err){
        logError(err);
      } else {
        //logMessage("Success! " + record + " added to database");
      }
    });
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

function logError(message){
  console.error("Error: " + message);
}

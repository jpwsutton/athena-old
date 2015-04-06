var express = require('express'),
    topics = require('./routes/topics.js'),
    records = require('./routes/records.js'),
    subscriber = require('./subscriber.js'),
    config = require('./settings.json'),
    pjson = require('./package.json');


console.log("---- Athena ----");
console.log("Version: " + pjson.version);
console.log("Broker:  " + config.mqttBrokerHost + ":" + config.mqttBrokerPort);
console.log("Topic:   " + config.mqttBrokerTopic);
console.log("----------------")


var app = express();
app.use(express.static(__dirname + '/webapp/app'));
app.use('/bower_components',  express.static(__dirname + '/webapp/bower_components'));

app.get('/topics', topics.findAll);
app.get('/records/:id', records.findById)

global.lastMessages = {};


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Athena listening at http://%s:%s', host, port)
});

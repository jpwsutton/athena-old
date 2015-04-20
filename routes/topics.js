var mongo = require('mongodb'),
  config = require('../settings.json');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var server = new Server(config.mongoDbHost, config.mongoDbPort, {
  auto_reconnect: true
});
db = new Db('athenadb', server, {
  safe: true
});

db.open(function(err, db) {
  if (!err) {
    console.log("Topic Router Connected to 'athenadb' database");
    db.collection('topics', {
      safe: true
    }, function(err, collection) {
      if (err) {
        console.log("The 'topics' collection doesn't exist. ");
      }
    });
  } else {
    console.log("Router: " + err);
  }
});

exports.findAll = function(req, res) {

  db.collection('topics', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });

};

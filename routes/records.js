var mongo = require('mongodb');


var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('athenadb', server, {safe: true});

db.open(function(err, db) {
  if(!err) {
    console.log("Records Router Connected to 'athenadb' database");
    db.collection('topics', {safe:true}, function(err, collection) {
      if (err) {
        console.log("The 'topics' collection doesn't exist. ");
      }
    });
  } else {
    console.log("Router: " + err);
  }
});


exports.findById = function(req, res) {

  var id = req.params.id;

  db.collection('topics', function(err, topicCollection) {
    topicCollection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      console.log("Retrieving Records for topic: " + item.topic);
      db.collection('records', function(err, recordsCollection) {
        if(err){
          console.error(err);
          res.send(err);
        } else {
          recordsCollection.find({topic:item.topic}).toArray(function(err, records){
            res.send(records);
          });
        }

      });
    });
  });
}

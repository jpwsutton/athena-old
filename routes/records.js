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

  /* Set start, end and interval.
   * By Default: 24 hours with
   * 15 minute averaged intervals.
   * Interval of 0 simply requests
   * Raw Data.
   */
  var start;
  var end;
  var interval;

  if(req.query.start){
      start = new Date(req.query.start);
  } else {
      start = new Date();
      start.setHours(0,0,0,0);
  }

  if(req.query.end){
      end = new Date(req.query.end);
  } else {
      end = new Date();
      end.setHours(24,0,0,0);
  }

  if(req.query.interval){
       interval = req.query.interval;
  } else {
      interval = 15;
  }



  /*
   *
   *
   */
  db.collection('topics', function(err, topicCollection) {
    topicCollection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      var funcStartTime = new Date().getTime();
      console.log("Retrieving Records for topic: " + item.topic);
      console.log("Start:    " + start);
      console.log("End:      " + end);
      console.log("Interval: " + interval)
      db.collection('records', function(err, recordsCollection) {
        if(err){
          console.error(err);
          res.send(err);
        } else {
          recordsCollection.find({topic:item.topic, time:{$gte: start.getTime(), $lt: end.getTime()}}).sort({time: 1})
                                .toArray(function(err, records){


              if(interval === 0){
                  res.send(records);
              } else {
                  // Average the records
                  var mInt = interval * 60000;
                  var avgRecords = [];
                  var timeCursor = start.getTime();
                  var working = true;

                  while(working){
                      var avgObj = {};
                      var endTime = timeCursor + mInt;
                      avgObj.start = timeCursor;
                      avgObj.end = endTime;
                      avgObj.records = [];

                      for(var i = 0; i < records.length; i++){
                          if((records[i].time > avgObj.start) && (records[i].time < avgObj.end)){
                              // record is in chunk
                              avgObj.records.push(records[i].payload.value);
                              records.splice(i, 1);
                          }
                      }
                      var avg = 0;
                      for( var x  = 0; x < avgObj.records.length; x++){
                          avg += avgObj.records[x];
                      }

                      var average = avg / avgObj.records.length;
                      avgObj.average = average;

                      avgRecords.push(avgObj);
                      if(timeCursor > end.getTime()){
                          working = false;
                          break;
                      }
                      timeCursor += mInt;
                  }
                  var timetorun = (new Date().getTime()) - funcStartTime;
                  console.log("Get recods took "+ timetorun + " milliseconds");

                  res.send(avgRecords);

              }
          });
        }

      });
    });
  });
}

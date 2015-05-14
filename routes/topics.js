var mongo = require('mongodb'),
	config = require('../settings.json');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure,
	ObjectID = mongo.ObjectID;

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

exports.findById = function(req, res) {
	var id = req.params.id;

	db.collection('topics', function(err, collection) {
		collection.findOne({
			'_id': new BSON.ObjectID(id)
		}, function(err, item) {
			console.log(item);
			res.send(item);
		});
	});
};

exports.saveTopic = function(req, res) {

	var id = req.params.id;
	console.log('Saving Topic: ' + id);
	console.log(req.body);
	var topic = req.body;
	topic._id = new ObjectID(topic._id);
	db.collection('topics', function(err, collection) {
		collection.save(topic, function(err, item) {
			res.json(item);
		});
	});



};

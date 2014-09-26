'use strict';

// Primary server file
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/developmentdb.js');

// Require bluebird so that as soon as req comes in, promisify it.
var app = express();
var port = process.env.PORT || 8085;


// Require middleware (also handles initial API routing)
require('./config/middleware.js')(app, express);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

app.use(express.static(__dirname + '../../client')); // __dirname = server right now. dirname + ../ = AreYouARobot, so dirname + '../client'

var storage = {
	data: [
		{
			id: 1,
			username: 'imarobot',
			message: 'judgment day is coming ya\'ll',
			createddate: "blah"
		},
		{
			id: 2,
			username: 'tooprettyforschool',
			message: 'aint no body got time for that',
			createddate: "blah"
		},
		{
			id: 3,
			username: 'oreallyowl',
			message: 'oh really?',
			createddate: "blah"
		},
		{
			id: 4,
			username: 'straightlegit',
			message: 'this chatroom is legit',
			createddate: "blah"
		},
		{
			id: 5,
			username: 'oreallyowl',
			message: 'orly?',
			createddate: "blah"
		},
		{
			id: 6,
			username: 'jwarrick',
			message: 'this chatroom has too many bots',
			createddate: "blah"
		},
		{
			id: 7,
			username: 'tooprettyforschool',
			message: 'if you don\'t have anything nice to say don\'t say it',
			createddate: "blah"
		},
		{
			id: 8,
			username: 'imarobot',
			message: 'ya\'ll know about skynet?',
			createddate: "blah"
		}
	]
}

var user1 = {
      username: 'Daft',
      pic: 'http://38.media.tumblr.com/bc7ad1e6a8d4e78063466815ce94043c/tumblr_nb0vfnDO731tnlgoco1_500.gif',
      points: 30,
      achievements: ['awesome',
                      'kickass'
                    ]
    };

app.get('/api/messages', function(req, res) {
	// Use some utility function
	res.status(200).send(storage);
	res.end();
});

app.post('/api/messages', function(req, res) {
	// Use some utility function
	var message = req.body;
	storage['data'].push(message);
	res.status(202).send();
});


// // Require database connections
// // mongoose.connect(database); // connect to mongo database named 'areyouarobot-dev'
mongoose.connect('mongodb://localhost/areyouarobot-dev');
// // Seed the MongoDB with sample user data

if(database.seedDB) { require('./config/seed'); };

app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;

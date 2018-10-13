var express = require('express');

var bodyParser = require('body-parser');
var validator = require('validator');
var url = require("url");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters

// var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
// var MongoClient = require('mongodb').MongoClient, format = require('util').format;
// var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
// 	db = databaseConnection;
// });

app.use(express.static(__dirname + '/public'));

// app.post('/rides', function(request, response) {
// 	response.header("Access-Control-Allow-Origin", "*");
//    	response.header("Access-Control-Allow-Headers", "X-Requested-With");
//  	response.setHeader('Content-Type', 'application/json');
// 	var obj = request.body;
// 	if (obj.hasOwnProperty('username') && obj.hasOwnProperty('lat')
// 		&& obj.hasOwnProperty('lng'))
// 	{
		
// 	} else
// 	{
// 		response.send(JSON.stringify({"error":"Whoops, something is wrong with your data!"}));
// 	}
// });


app.get('/', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');

   	response.sendFile("index.html", {root:__dirname});
			
});



app.listen(process.env.PORT || 3000);

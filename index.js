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

//yelp

'use strict';

const yelp = require('yelp-fusion');

// Yelp and Google Maps API key
const apiKey = 'SpJmEVEugu3-OUeP_w73yPHrghCRFvB31oy40Wvwz66wnXmc5I9l2iBbFLYo1Fkk6U9OqFJdxzWK2pnQH4-NVQ3_SwSI15O2TChnamybboAs0UvBqV18fIJHN0bBW3Yx';



// Yelp Fusion API Client
const client = yelp.client(apiKey);

let bet;
app.post('/yelp_bet', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');
	// console.log("h");
   	var obj = request.body;
   	
   	if (obj.hasOwnProperty('lat') && obj.hasOwnProperty('lng') && obj.hasOwnProperty('place'))
   	{
      var lat = obj.lat.toString();
      var lng = obj.lng.toString();
      var place = obj.place;
      var distance = 2.5 * 1000 * 1.6;
      
      	client.search({
	    term: place,
	    latitude: lat,
	    longitude: lng,
	    open_now: true,
	    radius : distance,
	    limit : 1
		}).then(response => {
			//sending response
			console.log("b");
		  result = response.jsonBody.businesses;
		  console.log(result);
		}).catch(e => {
		  console.log(e);
		});
      
    	response.send(result);
   	}
});

let result;
app.post('/yelp', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');
	// console.log("h");
   	var obj = request.body;
   	
   	if (obj.hasOwnProperty('lat') && obj.hasOwnProperty('lng') && obj.hasOwnProperty('category') && obj.hasOwnProperty('distance'))
   	{
      var lat = obj.lat.toString();
      var lng = obj.lng.toString();
      var cat = obj.category;
      var distance = parseInt(parseFloat(obj.distance) * 1000 * 1.609344);
      console.log("a");
      if (cat == 'restaurants')
      {
      	client.search({
	    term: 'restaurants',
	    latitude: lat,
	    longitude: lng,
	    open_now: true,
	    radius : distance,
	    limit : 50
		}).then(response => {
			//sending response
			console.log("b");
		  result = response.jsonBody.businesses;
		}).catch(e => {
		  console.log(e);
		});
      } else if (cat == 'bars')
      {
      	client.search({
	    term: 'bars',
	    latitude: lat,
	    longitude: lng,
	    open_now: true,
	    radius : distance,
	    limit : 50
		}).then(response => {
			//sending response
			console.log("c");
		  result = response.jsonBody.businesses;
		}).catch(e => {
		  console.log(e);
		});
      } else if (cat == 'shops')
      {
      	client.search({
	    term: 'shops',
	    latitude: lat,
	    longitude: lng,
	    open_now: true,
	    radius : distance,
	    limit : 50
		}).then(response => {
			//sending response
			console.log("d");
		  result = response.jsonBody.businesses;
		}).catch(e => {
		  console.log(e);
		});
      }
    	response.send(result);
   	}
   	// response.send(result);
			
});

app.get('/', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');

   	response.sendFile("index.html", {root:__dirname});
			
});

app.get('/bet', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');

   	response.sendFile("bet.html", {root:__dirname});		
});

app.get('/get_bet', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');

      response.sendFile("get_bet.html", {root:__dirname});      
});

app.get('/get_bet.js', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');

      response.sendFile("get_bet.js", {root:__dirname});      
});

app.get('/group', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("group.html", {root:__dirname});
});

app.get('/group.js', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("group.js", {root:__dirname});
});

app.get('/style_group.css', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("style_group.css", {root:__dirname});
});

app.get('/css/style.css', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/css');
   	response.sendFile("css/style.css", {root:__dirname});
});

app.get('/js/scripts', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("js/scripts.js", {root:__dirname});
});

app.get('/events', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("events.html", {root:__dirname});
});

app.get('/events.js', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("events.js", {root:__dirname});
});

app.get('/yelp', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("yelp.html", {root:__dirname});
});

app.get('/yelp.js', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("yelp.js", {root:__dirname});
});

app.get('/background.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("background.png", {root:__dirname});
});

app.get('/images/shops.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/shops.png", {root:__dirname});
});

app.get('/images/rest.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/rest.png", {root:__dirname});
});

app.get('/images/events.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/events.png", {root:__dirname});
});

app.get('/images/bars.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/bars.png", {root:__dirname});
});

app.get('/food.html', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("food.html", {root:__dirname});
});

app.get('/css/vibes.css', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("css/vibes.css", {root:__dirname});
});

app.get('/images/findvibes.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/findvibes.png", {root:__dirname});
});

app.get('/images/gotbet.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/gotbet.png", {root:__dirname});
});

app.get('/images/homebg.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/homebg.png", {root:__dirname});
});

app.get('/images/star.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/star.png", {root:__dirname});
});

app.get('/images/dollar.png', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	// response.set('Content-Type', 'text/html');
   	response.sendFile("images/dollar.png", {root:__dirname});
});



app.get('/images/bars.svg', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/bars.svg", {root:__dirname});
});
app.get('/images/dollar@2x.png', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/dollar@2x.png", {root:__dirname});
});app.get('/images/events.svg', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/events.svg", {root:__dirname});
});app.get('/images/findvibes.svg', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/findvibes.svg", {root:__dirname});
});app.get('/images/gotbet.svg', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/svg');
      response.sendFile("images/gotbet.svg", {root:__dirname});
});app.get('/images/rest.svg', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/rest.svg", {root:__dirname});
});app.get('/images/shops.svg', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/shops.svg", {root:__dirname});
});app.get('/images/star@2x.png', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/star@2x.png", {root:__dirname});
});app.get('/images/getbetbg.png', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      // response.set('Content-Type', 'text/html');
      response.sendFile("images/getbetbg.png", {root:__dirname});
});




app.listen(process.env.PORT || 3000);

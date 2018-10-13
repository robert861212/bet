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



app.post('/yelp', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');
	console.log("h");
   	var obj = request.body;
   	if (obj.hasOwnProperty('lat') && obj.hasOwnProperty('lng') && obj.hasOwnProperty('category') && obj.hasOwnProperty('distance'))
   	{
      var lat = obj.lat;
      var lng = obj.lng;
      var cat = obj.category;
      var distance = parseFloat(obj.distance);
      console.log("a");
      if (cat == 'restaurant')
      {
      	client.search({
    term: 'restaurants',
    price: 1,
    latitude: "42.4048",
    longitude: "-71.1161",
    open_now: true,
    radius : 8000,
    limit : 40
}).then(response => {
  const firstResult = response.jsonBody.businesses;
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
  //     	console.log("b");
  //     	client.search({
	 //    term: 'restaurants',
	 //    latitude: lat,
	 //    longitude: lng,
	 //    open_now: true,
	 //    radius : distance,
	 //    limit : 50
		// }).then(response => {
		// 	//sending response
		// 	console.log("c");
		//   response.send(response.jsonBody.businesses);
		// }).catch(e => {
		//   console.log(e);
		// });
      }
      
      

   	}
   	// response.sendFile("index.html", {root:__dirname});
			
});



// client.search({
//     term: 'restaurants',
//     price: 1,
//     latitude: "42.4048",
//     longitude: "-71.1161",
//     open_now: true,
//     radius : 8000,
//     limit : 40
// }).then(response => {
//   const firstResult = response.jsonBody.businesses;
//   const prettyJson = JSON.stringify(firstResult, null, 4);
//   console.log(prettyJson);
// }).catch(e => {
//   console.log(e);
// });

// client.search({
//     term: 'bars',
//     price: 1,
//     latitude: "42.4048",
//     longitude: "-71.1161",
//     open_now: true,
//     radius : 8000
// }).then(response => {
//     const secondResult = response.jsonBody.businesses;
//     const prettyJson = JSON.stringify(secondResult, null, 4);
//     console.log(prettyJson);
// }).catch(e => {
//     console.log(e);
// });

// client.search({
//     term: 'shops',
//     price: 1,
//     latitude: "42.4048",
//     longitude: "-71.1161",
//     open_now: true,
//     radius : 8000
// }).then(response => {
//     const thirdResult = response.jsonBody.businesses;
//     const prettyJson = JSON.stringify(thirdResult, null, 4);
//     console.log(prettyJson);
// }).catch(e => {
//     console.log(e);
// });












app.get('/', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');

   	response.sendFile("index.html", {root:__dirname});
			
});

app.get('/bet', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');

   	response.sendFile("bet.html", {root:__dirname});
			
});

app.get('/group', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');

   	response.sendFile("group.html", {root:__dirname});
			
});



app.listen(process.env.PORT || 3000);

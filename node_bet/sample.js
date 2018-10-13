'use strict';

const yelp = require('yelp-fusion');

// Yelp and Google Maps API key
const apiKey = 'SpJmEVEugu3-OUeP_w73yPHrghCRFvB31oy40Wvwz66wnXmc5I9l2iBbFLYo1Fkk6U9OqFJdxzWK2pnQH4-NVQ3_SwSI15O2TChnamybboAs0UvBqV18fIJHN0bBW3Yx';

// Yelp Fusion API Client
const client = yelp.client(apiKey);
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

client.search({
    term: 'bars',
    price: 1,
    latitude: "42.4048",
    longitude: "-71.1161",
    open_now: true,
    radius : 8000
}).then(response => {
    const secondResult = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(secondResult, null, 4);
    console.log(prettyJson);
}).catch(e => {
    console.log(e);
});

client.search({
    term: 'shops',
    price: 1,
    latitude: "42.4048",
    longitude: "-71.1161",
    open_now: true,
    radius : 8000
}).then(response => {
    const thirdResult = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(thirdResult, null, 4);
    console.log(prettyJson);
}).catch(e => {
    console.log(e);
});

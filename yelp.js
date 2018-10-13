document.getElementById("image").addEventListener("touchstart", startTouch, false);
document.getElementById("image").addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      // add action here
      console.log("swiped left");
    } else {
      // swiped right
      // add action here
      console.log("swiped right");
    }
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
    } else {
      // swiped down
      console.log("swiped down");
    }
  }

  initialX = null;
  initialY = null;

  e.preventDefault();
};

image = document.getElementById("image");
title = document.getElementById("title");
distance = document.getElementById("distance");
address = document.getElementById("address");
rating = document.getElementById("rating");
cost = document.getElementById("cost");
direction = document.getElementById("direction");
call = document.getElementById("call_someone");
nextButton = document.getElementById("next");
prevButton = document.getElementById("previous");
let lat_lng;
let yelpDict = [];
let shown_list = [];
let currentElement;
var request = new XMLHttpRequest();
request.open("POST", "https://betgv.herokuapp.com/yelp", true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//console.log("start");

function getCookie(cname) {
    var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
    var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'

    //Loop through the cookies and return the cooki value if it find the cookie name
    for(var i=0; i<cArr.length; i++) {
        var c = cArr[i].trim();
        //If the name is the cookie string at position 0, we found the cookie and return the cookie value
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }

    //If we get to this point, that means the cookie wasn't find in the look, we return an empty string.
    return "";
}

function randomize(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function initializeValues(cElement)
{

  title.innerHTML = cElement.name;
  distance.innerHTML = Math.floor(cElement.distance) + "miles away";
  address.innerHTML = cElement.location;
  call.href="tel:"+ (cElement.phone).replace(/\D/g,''); //stripping non numeric characters
  image.src = cElement.image_url;
  console.log(image.src);
  lat_lng = {lat: cElement.latitude, lng: cElement.longitude};

  var rating_len = Math.floor(cElement.rating);
  for (i = 0; i < rating_len; i++) {
    var img = document.createElement("img");
    img.style = "images/star.png";
    img.style = "display: inline;";
    rating.appendChild(img);
  }
  var price_len = cElement.length;
  for (i = 0; i < price_len; i++) {
    var img = document.createElement("img");
    img.src = "images/star.png";
    img.style = "display: inline;";
    rating.appendChild(img);
  }
  //callibrate the rating and cost with the stars
  //img scaling

}



request.onreadystatechange = function()
{
    if (request.readyState == 4 && request.status == 200)
    {
	var string = request.responseText;
	console.log(string);
	var object = JSON.parse(string);
        var objects_length = object.length;

        for (i = 0; i < objects_length; i++){
            yelpDict.push({
                name: object[i].name, //
                phone: object[i].phone,
                price: object[i].price,
                rating: object[i].rating,
                latitude: object[i].coordinates.latitude, //
                longitude: object[i].coordinates.longitude, //
                distance: object[i].distance, //
                image: object[i].image_url, //
                location: object[i].location.address1 //
            });
        }
        randomize(yelpDict);
        var element = yelpDict.pop()
        shown_list.push(element);
        initializeValues(element);
    }
}
parameter = "lat=" + getCookie("lat") + "&lng=" + getCookie("lng") + "&category="
    + getCookie("category") + "&distance=" + getCookie("distance") + ";";

request.send(parameter);
// console.log(parameter);

direction.addEventListener("click", ()=>
                      {
                        //load the google maps page passing in the latitude and longitude
                        window.location.replace("https://www.google.com/maps?q=" + lat_lng.lat+","+lat_lng.lng);
                      });


nextButton.addEventListener("click", ()=>
                      {
                          currentElement = yelpDict.pop();
                          shown_list.push(currentElement);
                          initializeValues(currentElement);
                      });

prevButton.addEventListener("click", () =>
                          {
                              element = shown_list.shift();
                              shown_list.push(currentElement);
                              currentElement = element;
                              initializeValues(currentElement);
                          });
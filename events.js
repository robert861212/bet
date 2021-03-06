    /*
    TO ADD: COOKIE AND GET THE LOCATION DYNAMICALLY. CURRENTLY HARDCODED TO AUSTRALIA
    */
    /*
    Get the location within using and fix location.within
    */
document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, false);
let lat_lng;
let vibeList = [];
var currentElement;
let shown_list = [];

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
      element = shown_list.shift();
                              shown_list.push(currentElement);
                              currentElement = element;
                              initializeValues(currentElement);
      console.log("swiped left");
    } else {
      // swiped right
       currentElement = vibeList.pop();
                          shown_list.push(currentElement);
                          initializeValues(currentElement);
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

image_html = document.getElementById("image");
title = document.getElementById("title");
distance = document.getElementById("distance");
address = document.getElementById("address");
description = document.getElementById("description");
direction = document.getElementById("direction");
call = document.getElementById("call_someone");
//nextButton = document.getElementById("next");
//prevButton = document.getElementById("previous");








   
    function getCookie(cname) {
             var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
             var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'
             //Loop through the cookies and return the cooki value if it find the cookie name
             for(var i=0; i<cArr.length; i++) {
                var c = cArr[i].trim();
                if (c.indexOf(name) == 0)
                     return c.substring(name.length, c.length);
              }
          }
    function shuffleArray(array) {
              for (var i = array.length - 1; i > 0; i--) {
                  var j = Math.floor(Math.random() * (i + 1));
                  var temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
              }
          }
    function initializeValues(element){
        title.innerHTML = element.name;
        distance.innerHTML = Math.floor(element.distance) + " miles away";
        address.innerHTML = element.location;
        image_html.innerHTML = "<img src='"+ element.picture + "' style='height: 100%; width: 100%; object-fit: contain' />";
        console.log(image_html.src);
        lat_lng = {lat: element.latitude, lng: element.longitude};
        description.innerHTML = element.description;
    
        }
 
   direction.addEventListener("click", ()=>
                      {
                        //load the google maps page passing in the latitude and longitude
                        window.location.replace("https://www.google.com/maps?q=" + lat_lng.lat+","+lat_lng.lng);
                      });


    function GetAddress() {
      
      
      var lat =  getCookie("lat"); //
        var lng =  getCookie("lng"); //151.209900
        var sliderValue = 500; //getCookie("distance");
        
        var all_events = {"async": true,
              "crossDomain": true,
              "url": "https://www.eventbriteapi.com/v3/events/search/?location.latitude="+lat+"&location.longitude="+lng+"&location.within="+sliderValue+"mi&token=3SI6R4C6ASYRYVKFMH57",
              "method": "GET",
              "headers": {}}
            $.ajax(all_events).done(function (dataList) {
              // console.log(dataList);
                console.log(dataList);
                 var objects_length = dataList.events.length;
                  console.log("The length is: ", objects_length);
                for (i = 0; i < objects_length; i++){
                      data = dataList.events[i];
                      toInsert = 
                      {
                          name: data.name.text,
                          location: data.start.timezone,
                          picture: data.logo.url,
                          description: data.description.html,
                          latitude: lat,
                          longitude: lng
                        };
                      vibeList.push(toInsert);
                }


            shuffleArray(vibeList);
            var element = vibeList.pop()
            console.log("This is the element "+ element);
            shown_list.push(element);
            initializeValues(element);

            });
            
            // initializeValues(element);
          }

    GetAddress();

   /*       
nextButton.addEventListener("click", ()=>
                      {
                          currentElement = vibeList.pop();
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
    */

    // console.log(getCookie("lat"));
    // console.log(getCookie("lng"));
    // console.log(getCookie("category"));
    // console.log(getCookie("distance"));

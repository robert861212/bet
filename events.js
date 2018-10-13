    /*
    TO ADD: COOKIE AND GET THE LOCATION DYNAMICALLY. CURRENTLY HARDCODED TO AUSTRALIA
    */
    /*
    Get the location within using and fix location.within
    */
    div = document.getElementById("show_vibe");
    next_button = document.getElementById("next");
    previous_button = document.getElementById("previous");
    shown_list = []
    vibeList = []
    var currentElement;

    GetAddress();
    function getCookie(cname) {
             var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
             var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'
             //Loop through the cookies and return the cooki value if it find the cookie name
             for(var i=0; i<cArr.length; i++) {
               var c = cArr[i].trim();
        //         //If the name is the cookie string at position 0, we found the cookie and return the cookie value
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
    function GetAddress() {
        returnList = [];
        var lat = -33.865143 //getCookie("lat");
        var lng = 151.209900 //getCookie("lng");
        var sliderValue = 500; //getCookie("distance");
        var all_events = {
              "async": true,
              "crossDomain": true,
              "url": "https://www.eventbriteapi.com/v3/events/search/?location.latitude="+lat+"&location.longitude="+lng+"&location.within="+sliderValue+"mi&token=3SI6R4C6ASYRYVKFMH57",
              "method": "GET",
              "headers": {}
            }

            $.ajax(all_events).done(function (dataList) {
              console.log(dataList);
                dataList.events.forEach( (data) => {vibeList.push(
                        {
                          name: data.name.text,
                          location: data.start.timezone,
                          picture: data.logo.url
                        }
                )});

              } );


    }

      shuffleArray(vibeList);

      next.addEventListener("click", ()=>
      {
        currentElement = vibeList.pop();
        shown_list.push(currentElement);



        /*
          Print the data based on the html layout by Jeff
        */
      });
      previous.addEventListener("click", () =>
      {

        element = shown_list.shift();
        shown_list.push(currentElement);
        currentElement = element;


      });


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

    // console.log(getCookie("lat"));
    // console.log(getCookie("lng"));
    // console.log(getCookie("category"));
    // console.log(getCookie("distance"));

    var all_events = {
          "async": true,
          "crossDomain": true,
          "url": "https://www.eventbriteapi.com/v3//events/search/?token=3SI6R4C6ASYRYVKFMH57&location.address=574BostonAve",
          "method": "GET",
          "headers": {}
        }
        function GetAddress() {
                  var lat = 42.352271;
                  var lng = -71.05524200000001;
                  var latlng = new google.maps.LatLng(lat, lng);
                  var geocoder = geocoder = new google.maps.Geocoder();
                  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                          if (results[1]) {
                            console.log(results[1].formatted_address);
                              alert("Location: " + results[1].formatted_address);
                              //Use the above result and store it in location address
                          }
                      }
                  });
              }
    //&location.within=10000km&location.longitude=42.39674&location.latitude=-71.121815",
    $.ajax(all_events).done(function (dataList) {
        console.log(dataList);

        dataList.events.forEach(
          function (data) {
            console.log(data);
          var content = "<h2>" + data.name.text + "</h2>" + data.description.html;
          $("#eventbrite").append(content);
        }

      );

      });

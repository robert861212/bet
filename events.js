// function get_request()
// {
//   var request = new XMLHttpRequest();
//   request.open("GET", “url”, true);  
//   request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   request.onreadystatechange = function()
//   {
//       if (request.readyState == 4 && request.status == 200)
//       {
      
//       }
//   }

//   request.send();
// }


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

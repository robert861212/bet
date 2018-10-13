

/*
TO ADD: COOKIE AND GET THE LOCATION DYNAMICALLY. CURRENTLY HARDCODED TO AUSTRALIA
*/
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

function GetAddress() {
    var lat = -33.865143 //getCookie("lat");
    var lng = 151.209900 //getCookie("lng");

    var all_events = {
          "async": true,
          "crossDomain": true,
          "url": "https://www.eventbriteapi.com/v3/events/search/?location.latitude="+lat+"&location.longitude="+lng+"&location.within=100km&token=3SI6R4C6ASYRYVKFMH57",
          "method": "GET",
          "headers": {}
        }

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

}
//&location.within=10000km&location.longitude=42.39674&location.latitude=-71.121815",

var myLat;
var myLng;
if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		document.cookie += "lat=" + myLat + ";lng=" + myLng; 
	    });
	}
else {
		alert("your browser does not support geolocation");
}

function rest_page()
{
	window.location.href = "https://betgv.herokuapp.com/yelp";
}

// function deleteAllCookies() {
//     var cookies = document.cookie.split(";");

//     for (var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i];
//         var eqPos = cookie.indexOf("=");
//         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     }
// }


// function getCookie(cname) {
//     var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
//     var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'
     
//     //Loop through the cookies and return the cooki value if it find the cookie name
//     for(var i=0; i<cArr.length; i++) {
//         var c = cArr[i].trim();
//         //If the name is the cookie string at position 0, we found the cookie and return the cookie value
//         if (c.indexOf(name) == 0) 
//             return c.substring(name.length, c.length);
//     }
     
//     //If we get to this point, that means the cookie wasn't find in the look, we return an empty string.
//     return "";
// }

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
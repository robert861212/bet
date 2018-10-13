
// var request = new XMLHttpRequest();
// 	request.open("POST", "https://betgv.herokuapp.com/yelp", true);  
// 	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	// console.log("start");
// 	request.onreadystatechange = function()
// 	{
// 		// console.log("half")
// 		if (request.readyState == 4 && request.status == 200)
// 		{
// 			var string = request.responseText;
// 			// var object = JSON.parse(string);
// 			console.log(string);
// 		}
// 	}
// 	parameter = "lat=" + getCookie("lat") + "&lng=" + getCookie("lng") + "&category=" + getCookie("category")
// 	+ "&distance=" + getCookie("distance") + ";";
// 	request.send(parameter);
// 	console.log(parameter);
// // function deleteAllCookies() {
// //     var cookies = document.cookie.split(";");

// //     for (var i = 0; i < cookies.length; i++) {
// //         var cookie = cookies[i];
// //         var eqPos = cookie.indexOf("=");
// //         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
// //         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
// //     }
// // }
// // console.log(getCookie("lat"));
// // console.log(getCookie("lng"));
// // console.log(getCookie("category"));
// // console.log(getCookie("distance"));


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


div = document.getElementById("show_yelp_event");
next_button = document.getElementById("next");
let yelpDict = [];
shown_list = [];
let currentElement;
previous_button = document.getElementById("previous");
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

request.onreadystatechange = function()
{
    if (request.readyState == 4 && request.status == 200)
    {
	var string = request.responseText;
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
        console.log(yelpDict);
    }
}
parameter = "lat=" + getCookie("lat") + "&lng=" + getCookie("lng") + "&category="
    + getCookie("category") + "&distance=" + getCookie("distance") + ";";

request.send(parameter);
console.log(parameter);

next.addEventListener("click", ()=>
                      {
                          currentElement = yelpDict.pop();
                          shown_list.push(currentElement);
                      });

previous.addEventListener("click", () =>
                          {
                              element = shown_list.shift();
                              shown_list.push(currentElement);
                              currentElement = element;
                          });
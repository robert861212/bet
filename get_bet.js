let rand_loc;
let rand_act;
function randomize(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function returnInput(){
  var location = ["sex shop", "universities", "parks", "museums", "thrift shops", "bakeries", "clothing stores", "boutiques", "stadiums", "theaters", "hotels"];

var action = ["Sing a song at", "Dab at", "Do a Fortnite Dance at", "Squat 20 times in", "Do fifty push-ups in",
              "Declare your love for Jumbo in", "Run around in a circle in", "Jog at a less than leisurely pace in", "Eat a gummy bear seductively in",
              "Perform the national anthem in", "Sing the Tufts spirit song in", "Do your best impression of Michael Scott at", "Take your next Tinder date to",
              "Walk at an extremely slow pace in"];
    randomize(location);
    randomize(action);
    rand_loc = location[0];
    rand_action = action[0];
}

var myLat;
var myLng;
returnInput();
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    myLat = position.coords.latitude;
    myLng = position.coords.longitude;

    // returnInput();

    var request = new XMLHttpRequest();
    request.open("POST", "https://betgv.herokuapp.com/yelp_bet", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
          var string = request.responseText;
          console.log(string);
          var object = JSON.parse(string);
          console.log(rand_action + " " + object[0].name);
          console.log(object[0].image_url);
          document.getElementById("content").innerHTML = rand_action + " " + object[0].name;
          document.getElementById("image").innerHTML = "<image src=" + object[0].image_url + ">" ;
        }
    }
    parameter = "lat=" + myLat + "&lng=" + myLng + "&place="
        + rand_loc + ";";
    console.log(parameter);
    request.send(parameter);











    });
  }
else {
    alert("your browser does not support geolocation");
}





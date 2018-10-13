
div = document.getElementById("show_vibe");
next_button = document.getElementById("next");
previous_button = document.getElementById("previous");
shown_list = []
vibeList = []
var currentElement;


$.getScript("events.js", function() {
  majorVibes = GetAddress();
   console.log(majorVibes);
   parseJson(majorVibes);
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function parseJson(majorVibes){
  var obj = JSON.parse(majorVibes);
  obj.forEach(
    (data) => {
      vibeList.append(
        {
          name: data.name,
          location: data.location,
          price: data.price,
          time_away: data.time,
          picture: data.picture,
          rating: data.Rating
          /*
          This is hardcoded but will be specific based on the json file
          Also need to play with the data to generate specific attribute
          */
        }
      )
    }
  );
  shuffleArray(vibeList);

  next.addEventListener("click", ()=>
  {
    currentElement = vibeList.pop();
    shown_list.unshift(element);

    /*
      Print the data based on the html layout by Jeff
    */
  });
  previous.addEventListener("click", () =>
  {

    element = shown_list.shift();
    shown_list.push(currentElement);
    currentElement = element;
    /*
      Print the data based on the html layout by Jeff
    */

  });
}

/*
Data Structure Representation:
{
  name:
  location_address:
  Price:
  Time/Distance away:
  Picture:
  Rating:
}
*/

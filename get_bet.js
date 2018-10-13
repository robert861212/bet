


function randomize(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function returnInput(){
    randomize(location);
    randomize(action);
    //console.log(location);
    //console.log(action);
}

// var location = {'sex shop', 'universities', 'parks', 'museums', 'thrift shops', 'bakeries', 'clothing stores', 'boutiques', 'stadiums', 'theaters', 'hotels'};

var action = {'Sing a song at', 'Dab at', 'Do a Fortnite Dance at', 'Squat 20 times in', 'Do fifty push-ups in',
              'Declare your love for Jumbo in', 'Run around in a circle in', 'Jog at a less than leisurely pace in', 'Eat a gummy bear seductively in',
              'Perform the national anthem in', 'Sing the Tufts spirit song in', 'Do your best impression of Michael Scott at', 'Take your next Tinder date to',
              'Walk at an extremely slow pace in'};

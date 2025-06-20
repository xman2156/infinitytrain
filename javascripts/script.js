var latestRelease = new Date("2021-04-15T00:00:00-05:00");
var oneDay = 24*60*60*1000;
var mode = 0; //DD:HH:MM:SS mode is default
var lastHiatusMention = null;

function switchMode(){
  if(mode == 0){
    //switch to DD:HH:MM:SS mode
    mode = 1;
    document.getElementById("moreorless").innerHTML = "to return to normal.";
  }
  else if(mode == 1){
    //DD:HH:MM:SS mode
    mode = 0;
    document.getElementById("moreorless").innerHTML = "to count less precisely instead.";
  };
};

function timer(updown, zeroTime, id){
  if (!zeroTime) {
    return null;
  }

  var timeNow = new Date();
  if (updown == "up"){
    var diffDays = (timeNow.getTime() - zeroTime.getTime()) / oneDay;
  }
  else if (updown == "down"){
    var diffDays = (zeroTime.getTime() - timeNow.getTime()) / oneDay;
  }

  var diffHours = (diffDays - Math.floor(diffDays)) * 24;
  var diffMinutes = (diffHours - Math.floor(diffHours)) * 60;
  var diffSeconds = (diffMinutes - Math.floor(diffMinutes)) * 60;

  //Removes all decimal places in each portion
  diffDays = Math.floor(diffDays);
  diffHours = Math.floor(diffHours);
  diffMinutes = Math.floor(diffMinutes);
  diffSeconds = Math.floor(diffSeconds);

  if (mode == 0){
    document.getElementById(id).innerHTML =  diffDays + "d : " + diffHours + "h : " + diffMinutes + "m : " + diffSeconds + "s";
    document.getElementById(id).style.fontSize = "100%";
  }
  else if (mode == 1){
    if (diffDays == 1){
      document.getElementById(id).innerHTML =  diffDays + " Day";
    }
    else if (diffDays == 0){
      document.getElementById(id).innerHTML =  diffHours + " Hours";
    }
    else {
      document.getElementById(id).innerHTML =  diffDays + " Days";
    }
    document.getElementById(id).style.fontSize = "100%";
  }
  else if (mode == 2){
    var totalTime = diffSeconds + (diffMinutes * 60) + (diffHours * 3600) + (diffDays * 86400);
    document.getElementById(id).innerHTML = totalTime.toLocaleString() + " Seconds";
  };
  if (updown == "down" && diffDays < 0){
    document.getElementById(id).innerHTML =  "Time's Up!";
  }
  return diffDays
};

//The Grand Array of Hiatuses
var hiatusList = [
  ['Last Episode','Next Episode','Preceding Release','Following Release','Hiatus Length','Note'],
  ['The Engine','The Black Market Car','Aug 9 2019','Jan 6 2020',150,''],
  ['The Number Car','The Musical Car','Jan 10 2020','Aug 13 2020',216,'Moved to HBO Max starting with Book 3'],
  ['The New Apex','The Twin Tapes','Aug 27 2020','Apr 15 2021',231,''],
  ['The Train to Nowhere','','Apr 15 2021','',,'The end of Infinity Train']
];

//makes an HTML table from the array
function createTable(array) {
  var diffDays = timer("up", latestRelease, "count");
  array[array.length - 1][4] = diffDays + " days and counting"; //comment out when not on hiatus
  for(var i = 0; i < array.length ; i++){
    var row = document.createElement('tr');
    row.setAttribute("id", "myTr" + i);
    document.getElementById("hiatus").appendChild(row);
    for(var j = 0; j < 6; j++){
      var cell = document.createElement('td');
      var content = document.createTextNode(array[i][j]);
      cell.appendChild(content);
      document.getElementById("myTr" + i).appendChild(cell);
    };
  };
};

//does the ticking
window.setInterval(function(){
  timer("up", latestRelease, "count");
}, 250);
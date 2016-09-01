$(function(){

//set Todays date
var today = new Date();
//get Full Year from Todays date
var curYear = today.getFullYear();
//set Next Year
var curHour = today.getHours();
//set Hour of the Day
    
    // GREETING FUNCTION
$('#bio_section').waypoint(function(){
    if (curHour < 12) {
        let msg= 'Good Morning, Angler!';
        let entryDiv = document.createElement('div');
        entryDiv.setAttribute('class', 'entryMsg fade-in');
        let textNode = document.createTextNode(msg);
        entryDiv.appendChild(textNode);
        document.getElementById('bio_section').appendChild(entryDiv);
    }
    else if (curHour >= 12 && curHour < 17) {
        let msg= 'Good Afternoon, Angler!';
        let entryDiv = document.createElement('div');
        entryDiv.setAttribute('class', 'entryMsg fade-in');
        let textNode = document.createTextNode(msg);
        entryDiv.appendChild(textNode);
        document.getElementById('bio_section').appendChild(entryDiv);
    }else {
        let msg= 'Good Evening, Angler!';
        let entryDiv = document.createElement('div');
        entryDiv.setAttribute('class', 'entryMsg fade-in');
        let textNode = document.createTextNode(msg);
        entryDiv.appendChild(textNode);
        document.getElementById('bio_section').appendChild(entryDiv);
    }
});
var nxtYear = curYear + 1;
//Create Object for Fishing Seasons w/ properties for Beginning Date, Ending Date, Beginning Next Year

function fishingSeason(name,b1, b2, e1, e2) {
  this.name = name;
  this.begin = new Date(curYear, b1, b2);
  this.end = new Date(curYear, e1, e2);
  this.beginNext = new Date(nxtYear, b1, b2);
};
// add common methods to prototype for fishing Season
fishingSeason.prototype = {
    seasonLength: function() {
      var d = Math.floor((this.begin - this.end) / 86400000);
      return Math.abs(d).toString();
    },
    daysUntilBeg: function() {
      if (today < this.begin) {
        return Math.floor((this.begin - today) / 86400000).toString();
      } else {
        return Math.floor((this.beginNext - today) / 86400000).toString();
      }
    },
    daysUntilEnd: function() {
      if (today >= this.begin && today < this.end) {
        return Math.floor((this.end - today) / 86400000).toString();
      }
    }
  }
  // create all the seasons using fishing season constructor
var fallChinook = new fishingSeason("fallChinook",7, 15, 10, 30);
var sprChinook = new fishingSeason("sprChinook",4, 1, 5, 30);
var sumChinook = new fishingSeason("sumChinook",6, 1, 7, 14);
var winSteelhead = new fishingSeason("winSteelhead",0, 1, 3, 7);
var bottomFish = new fishingSeason("bottomFish",6, 1, 7, 30);

var seasons = [fallChinook, sprChinook, sumChinook, winSteelhead, bottomFish];
// find current season(s)
var currentSeasons = [];
//find closed seasons
var closedSeasons = [];

    
 //fill arrays for currentSeasons and closedSeasons
    for (var i = 0; i < seasons.length; i++){
    if (seasons[i].daysUntilEnd() != undefined ) {
        currentSeasons.push(seasons[i]);
        } else {
      closedSeasons.push(seasons[i]);
      }
    }
    
     
    // create a function that loops through all the current seasons and gives their names as classes to be edited in css

    $(window).on("load", function(){
    for (var i = 0; i <= closedSeasons.length; i++){
        var x = closedSeasons[i].name;
        var el = document.getElementById(x)//find element thats id matches
        var daysTilNext = closedSeasons[i].daysUntilBeg();
        el.innerHTML = "<div class='CLOSED'>" + daysTilNext + "</div>" + "<span class='CLOSED'>Days til Peak Run</span>"; //write the number of days till next season
        var el1 = "." + x;
        $(el1).css("border-radius", "0");
    //set div with same name background color red
        }
    });
    
   
    for (var i = 0; i <= currentSeasons.length; i++){
        var x = currentSeasons[i].name;
        var el = document.getElementById(x)
        var daysLeft = currentSeasons[i].daysUntilEnd();
        if (daysLeft == 0) {
             el.innerHTML = "<div class='TODAY'>" + "Today" + "</div>" + " <span class='OPEN'> is the last Day of the Peak Run</span>";
        } else {
        el.innerHTML = "<div class='OPEN'>" + daysLeft + "</div>" + " <span class='OPEN'>Days left in the Peak Run</span>";
        }
        var el1 = "." + x;
        $(el1).css("border-radius", "90px").css("border-color", "#0e3251");
        
        }
    
        
    
   
    

    
});

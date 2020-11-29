// You take in an array of events
/*
This function takes in the current schedulee array with an extra element added to it
The array should hold X's if there is an event scheduled in the part of the array
that is static: meetings, classes, sleeping schedule, etc.
This function will return a schedule that satisfies the deadlines of the tasks given
While meetiong the user's configuration as well as possible (daily work hours,
    sleeeping on time, low work days, optionnal events)
Note that events pushed into this function should have a 10 minute beffer attached
*/

function schedule(calendar, events, usrPref) {
  // note that the calendar shows the blocks taken up by static events
  //events contains a random array of all events
  events = events.sort((a, b) => {
    dateToNum(a.getDate()) - dateToNum(b.getDate);
  }); //sorts events in ascending order of date
  //note for later, events here sorted so that in the future the cost of the sort is lowered
  //now ordered events are availabke and you start reading them in
  //split the evnts up into chunks as needed
  //You want to return a schdule starting te time when this functioj got invoke. Give
  //the user 15 minutres from now tio start work and set up everything

  //in your config set the buffer period. Default buffer period for events is 15 minutes
  //usroref.maxlength is the maximum amount of time worked and is usually initialized to 90
  //usr.avgLength is the average tiome of work before a break and is initialized to 50 minutes
  for (var i; i < events.length(); i++) {
    if (events[i].splitable() && events[i].getLength() > usrPref.maxlength) {
      var initialLength = events[i].getLength();
      var nPieces = 
    }
  }
}

function dateToNum(date) {
  // date here is a struct. We convert this to a number
  var time = date.minute;
  time += date.hour * 60;
  time += date.day * 24 * 60;
  time += date.year * 24 * 60 * 365;
  return time; //ret7urns time in minutes
}

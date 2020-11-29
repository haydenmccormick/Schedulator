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

function schedule(calendar, events) {
  // note that the calendar shows the blocks taken up by static events
  var sortEvents = events.sort();
}

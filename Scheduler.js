/*
I take in a:
  Calendar: 'Array' containing all static tasks in the timeline

// You take in an array of events
****Note you did not add a start date for dynamics
This function takes in the current schedulee array with an extra element added to it
The array should hold X's if there is an event scheduled in the part of the array
that is static: meetings, classes, sleeping schedule, etc.
This function will return a schedule that satisfies the deadlines of the tasks given
While meetiong the user's configuration as well as possible (daily work hours,
    sleeeping on time, low work days, optionnal events)
Note that events pushed into this function should have a 10 minute beffer attached
*/

/*you need to have a pointer to the even t that is curretly in session. This means that
each event will need a variable indicating whether it is currently in session. This is so that
the scheduler can schdule based off current time. This needs to be constantly updated in staticCalendar
the head pointer of staticCalendar shoul dbe at the current event in session. If the varisable in the
object says that it is not ciurrently in session then it is in between that and the veent after.
*/
function schedule(staticCalendar, events, usrPref, scheduledCalendar) {
  // note that the staticCalendar shows the blocks taken up by static events
  //events contains a random array of all events
  events = events.sort((a, b) => {
    a.getDeadline() - b.getDeadline();
  }); //sorts events in ascending order of date
  //note for later, events here sorted so that in the future the cost of the sort is lowered

  /*in your config set the buffer period. Default buffer period for events is 15 minutes
  usrPref.maxlength is the maximum amount of time worked and is usually initialized to 90
  usrPref.avgLength is the average time of work before a break and is initialized to 50 minutes*/
  for (var i = 0; i < events.length(); i++) {
    if (events[i].splitable() && events[i].getLength() > usrPref.maxlength) {
      var initialPeriod = events[i].getPeriod();
      var nPieces = floor(initialLength / usrPref.avgLength);
      var title = events[i].getTitle();
      var startTime = events[i].getStart();
      var split = events[i].splitable();
      events[i].getPeriod() = usrPref.maxlength;
      initialPeriod -= usrPref.maxlength;
      for (var j = 0; j < nPieces; j++) {
        var period =
          floor(initialPeriod / usrPref.avgLength) === 1
            ? initialPeriod
            : usrPref.avgLength;
        let piece = new Event(title, startTime, period, split);
        events.splice(i + j + 1, 0, piece);
      }
    }
  }
  //all events have now been split up into appropriate chunks

  var initCal = new Date();
  var ci = 0;
  while (ci + 1 < staticCalendar.length()) {
    if (
      (initCal.getTime() >= staticCalendar[ci].getStart() &&
        initCal.getTime() <= staticCalendar[ci].getEnd()) ||
      (initCal.getTime() <= staticCalendar[ci + 1].getStart() &&
        initCal.getTime() >= staticCalendar[ci].getEnd())
    ) {
      break;
    }
    ci++;
  }

  // ci===0 ?

  scheduledCalendar = slice(ci);
  //getting rid of old staticCalendar information now you point to a tasl last/currently in session
  var delay = usrPref.delaySize * 1000 * 60; //convert delay to ms (note you begin scheduel after delay mintes)
  for (var i = 0; i < events.length(); i++) {
    //add event by event
    var period = events[i].getPeriod();

    var eventTime = new Date(); //by default current real time in ms
    eventTime.setMinutes(15 * round((eventTime.getMinutes() + 1) / 15) - 1); //set eventTime to rounded nearest 15 minutes
    eventTime.setTime(eventTime.getTime() + delay); //avoid immediately scheduling

    if (staticCalendar === []) {
      events[i].setStart(eventTime.getTime()); //set start time to the given val
      events[i].setEnd(eventTime.getTime() + events[i].getPeriod());
      scheduledCalendar = staticCalendar.slice(0, 0, events[i]);
    } else if (staticCalendar.length() === 1) {
      if (
        eventTime.getTime() + events[i].getPeriod() >
        staticCalendar[0].getStart() - delay
      ) {
        events[i].setStart(staticCalendar[0].getEnd() + delay); //set start time to the given val
        events[i].setEnd(eventTime.getTime() + events[i].getPeriod());
        scheduledCalendar = staticCalendar.slice(1, 0, events[i]);
      } else {
        events[i].setStart(eventTime.getTime()); //set start time to the given val
        events[i].setEnd(eventTime.getTime() + events[i].getPeriod());
        scheduledCalendar = staticCalendar.slice(0, 0, events[i]);
      }
    } else {
      for (var j = 0; j + 1 < staticCalendar.length(); j++) {
        if (
          events[i].getPeriod() + 2 * delay <
          staticCalendar[j + 1].getStart() - staticCalendar[j].getEnd()
        ) {
          events[i].setStart(staticCalendar[j].getEnd() + delay); //set start time to the given val
          events[i].setEnd(eventTime.getTime() + events[i].getPeriod());
          scheduledCalendar = staticCalendar.slice(j + 1, 0, events[i]);
        }
      }
    }
  }

  var unmetDeadlines = events.filter((ev) => ev.getEnd() > ev.getDeadline());
  return unmetDeadlines;
  //return a list of all deadlines not met
}

//unnecessary as this is done using the get time method
// function dateToNum(date) {
//   // date here is a struct. We convert this to a number
//   var time = date.minute;
//   time += date.hour * 60;
//   time += date.day * 24 * 60;
//   time += date.year * 24 * 60 * 365;
//   return time; //ret7urns time in minutes
// }

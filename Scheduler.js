/*

*Note you did not add an earliest start date for dynamics
staticCalendar is a list of all static events in order
events is a list of all dynamic events to be done in the future (note that you are removing the completed elemenst from events)

*/
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const [tasks, setTasks] = useState("");
const [tasks2, setTasks2] = useState("");
function showTasks() {
    db.transaction(tx => {
	//tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
	tx.executeSql(
	    "select * from tasks",
	    [],
	    (_, { rows: { _array } }) => setTasks(_array)
	);
    });
    setTasks2(JSON.stringify(tasks));
}

class Event {
  constructor(title, start, end, period, deadline, splitable) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.period = period;
    this.deadline = deadline;
    this.splitable = splitable;
  }
}

class usrPref {
  constructor(avgLength, maxlength, delaySize) {
    this.avgLength = avgLength;
    this.maxlength = maxlength;
    this.delaySize = delaySize;
  }
}

// staticCalendar, events, scheduledCalendar are all arrays of Event

function schedule(staticCalendar, events, usrPref, scheduledCalendar) {
  // note that the staticCalendar shows the blocks taken up by static events
  //events contains a random array of all events
  events = events.sort((a, b) => {
    a.getDeadline() - b.getDeadline();
  }); //sorts events in ascending order of date
  //note for later, events here sorted so that in the future the cost of the sort is lowered
  var tail = new Event(null, Number.MAX_SAFE_INT, MAX_SAFE_INT, null, null);
  staticCalendar.splice(events.length(), 0, tail);
  events.splice(events.length(), 0, tail);
  /*in your config set the buffer period. Default buffer period for events is 15 minutes
  usrPref.maxlength is the maximum amount of time worked and is usually initialized to 90
  usrPref.avgLength is the average time of work before a break and is initialized to 50 minutes*/
  for (var i = 0; i < events.length() - 1; i++) {
    if (events[i].splitable() && events[i].getLength() > usrPref.maxlength) {
      var initialPeriod = events[i].getPeriod();
      var nPieces = floor(initialLength / usrPref.avgLength);
      var title = events[i].getTitle();
      var startTime = events[i].getStart();
      var deadline = events[i].getDeadline();
      var split = events[i].splitable();
      events[i].setPeriod() = usrPref.avglength;
      initialPeriod -= usrPref.avglength; //make an initial piece of avg size
      for (var j = 1; j < nPieces; j++, i++) {
	var period =
	  floor(initialPeriod / usrPref.avgLength) === 1 //set period to avg size until you get to the last chunk and take the whole thing
	    ? initialPeriod
	    : usrPref.avgLength;
	initialPeriod -= period;
	let piece = new Event(
	  title,
	  startTime,
	  startTime + period,
	  period,
	  deadline,
	  split
	);
	events.splice(i + j, 0, piece);
      }
    }
  }
  //all events have now been split up into appropriate chunks

  var delay = usrPref.delaySize * 1000 * 60; //convert delay to ms (note you begin scheduel after delay mintes)
  var init = new Date();
  var currTime = init.getTime();

  //-------------------------------------------------------------
  if (staticCalendar.length() === 1 && events !== []) {
    events[0].setStart() = currTime + delay;
    events[0].setEnd() = events[0].getStart() + events[0].getPeriod();
    scheduledCalendar = events.slice(0, 0, events[0]);
    for (var i = 1; i < events.length() - 1; i++) {
      events[i].getStart() = events[i - 1] + delay;
      events[i].getEnd() = events[i].getStart() + events[i].getPeriod();
      scheduledCalendar = events.slice(i, 0, events[i]);
    }
  } //if static is empty, add things in events recursively after setting start and end times
  //-------------------------------------------------------------
  else if (staticCalendar.length() > 1) {
    var statCounter = 0;
    var timer;
    while (staticCalendar[statCounter].getStart() < currTime) {
      statCounter++;
    }
    statCounter--; //point back at last thing that started before current time

    if (staticCalendar.length() === 1) {
      timer = currTime;
      statCounter = -1; //if theres just the tail, point backwards acting like theres something there and BE CAREFUL TO ACCESS THIS
    } else timer = max(staticCalendar[statCounter].getEnd(), currTime);

    var eventCounter = 0;
    while (
      eventCounter < events.length() - 1 &&
      staticCalendar[statCounter + 1].getStart() - timer >
	events[eventCounter].getPeriod() + 2 * delay
    ) {
      var event = new Event(
	events[eventCounter].title,
	timer + delay,
	timer + delay + events[eventCounter].getPeriod(),
	events[eventCounter].period,
	events[eventCounter].deadline,
	events[eventCounter].splitable
      );
      scheduledCalendar.splice(eventCounter, 0, event);
      eventCounter++;
      timer += event.getEnd();
    } //added every possible dynamic event to schedule before first static

    while (
      statCounter < staticCalendar.length() - 1 &&
      eventCounter < events.length() - 1
    ) {
      while (
	eventCounter < events.length() - 1 &&
	staticCalendar[statCounter + 1].getStart() - timer >
	  events[eventCounter].getPeriod() + 2 * delay
      ) {
	var event = new Event(
	  event[eventCounter].title,
	  timer + delay,
	  timer + delay + event[eventCounter].getPeriod(),
	  event[eventCounter].period,
	  event[eventCounter].deadline,
	  event[eventCounter].splitable
	);
	scheduledCalendar.splice(scheduledCalendar.length(), 0, event);
	eventCounter++;
	timer += event.getEnd();
      }

      var event = new Event(
	staticCalendar[statCounter].title,
	staticCalendar[statCounter].start,
	staticCalendar[statCounter].end,
	staticCalendar[statCounter].period,
	staticCalendar[statCounter].deadline,
	staticCalendar[statCounter].splitable
      );
      scheduledCalendar.splice(
	scheduledCalendar.length(),
	0,
	staticCalendar[statCounter]
      );
    }
  }

  var unmetDeadlines = events.filter((ev) => ev.getEnd() > ev.getDeadline());
  return unmetDeadlines;
  //return a list of all deadlines not met
}

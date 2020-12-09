/*Note you did not add an earliest start date for dynamics
staticCalendar is a list of all static events in order
events is a list of all dynamic events to be done in the future (note that you are removing the completed elemenst from events)*/
import * as SQLite from "expo-sqlite";
import { useState } from "react";

const db = SQLite.openDatabase("db.db");

function updateDynamicTaskTimes(title, start, end) {
  //updates task keyed by the title with a start and end time
  db.transaction((tx) => {
    tx.executeSql(
      "update dynamicTasks set start = ?, end = ?, dontShow = ? where title = ?",
      [start, end, dontShow, title]
    );
  });
}

//fix bug
function updateSplitPiece(title, newTitle, period) {
  db.transaction((tx) => {
    tx.executeSql(
      "update dynamicTasks set title = ? period = ? where title=?",
      [newTitle, period, title]
    );
  });
}

function addSplitPiece(piece) {
  var dateString = new Date(Date.now());
  dateString = dateString.setTime();
  db.transaction((tx) => {
    tx.executeSql(
      "insert into scheduledDynamicTasks(taskname,startTime,endTime,period,deadline,split) value(?,?,?,?,?,?)",
      [
        piece.title,
        piece.start,
        piece.end,
        piece.period,
        piece.deadline,
        piece.splitable,
      ]
    );
  });
}

export default function schedule() {
  // note that the staticCalendar shows the blocks taken up by static events
  //events contains a random array of all events
  var usrPref = { avgLength: 50, maxLength: 90, delaySize: 15 };

  const [staticCalendarJSON, setStaticTasksValue] = useState("");
  const [dynamicTasksValueJSON, setDynamicTasksValue] = useState("");

  db.transaction((tx) => {
    //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
    tx.executeSql(
      "select * from tasks order by endTime",
      [],
      (_, { rows: { _array } }) => setStaticTasksValue(_array)
    );
    tx.executeSql(
      "select * from dynamicTasks order by deadline",
      [],
      (_, { rows: { _array } }) => setDynamicTasksValue(_array)
    );
  });

  //sorts events in ascending order of date
  //note for later, events here sorted so that in the future the cost of the sort is lowered
  let tail = { start: Number.MAX_SAFE_INTEGER, end: Number.MAX_SAFE_INTEGER };

  let staticCalendar = [];
  let events = [];

  for (var i in staticCalendarJSON) staticCalendar.splice(0, 0, JSON.parse(i));
  for (var i in dynamicTasksValueJSON) events.splice(0, 0, JSON.parse(i));

  events.splice(events.length, 0, tail);
  staticCalendar.splice(staticCalendar.length, 0, tail);

  for (var i = 0; i < events.length - 1; i++) {
    if (events[i].splitable && events[i].period > usrPref.maxLength) {
      /* console.log(events[i].title + " used to be:") */ /* console.log(events[i]) */ var initialPeriod =
        events[i].period;
      var nPieces = Math.ceil(initialPeriod / usrPref.avgLength);
      var title = events[i].title;
      var startTime = 0;
      var deadline = events[i].deadline;
      var split = events[i].splitable;
      events[i].title = events[i].title + " (Part 1)";
      events[i].period = usrPref.avgLength;
      initialPeriod -= usrPref.avgLength;
      updateSplitPiece(title, events[i].title, usrPref.avgLength);
      /* console.log("There should be "+nPieces +" pieces");
      console.log("Piece 1");
      console.log(events[i]); */
      for (var j = 1; j < nPieces; j++) {
        /*  console.log("Piece " + (j + 1)); */
        var period =
          initialPeriod > usrPref.avgLength ? usrPref.avgLength : initialPeriod;
        /* console.log("Time left: "+initialPeriod);
        console.log("Time decremented: "+period); */
        initialPeriod -= period;
        var piece = {
          title: title + " (Part " + String(j + 1) + ")",
          start: startTime,
          end: startTime + period,
          period: period,
          deadline: deadline,
          splitable: split,
        };
        events.splice(i + j, 0, piece);
        addSplitPiece(piece);
        /* console.log("Event just added:");
        console.log(events[i + j]); */
      }
      i += nPieces - 1;
    }
  }
  /* console.log(events); */
  //all events have now been split up into appropriate chunks

  var delay = usrPref.delaySize; //convert delay to ms (note you begin scheduel after delay mintes)
  var currTime = Date.now();
  var statCounter = 0;
  var eventCounter = 0;
  var timer;
  while (staticCalendar[statCounter].start < currTime) {
    statCounter++;
  }
  statCounter--; //point back at last thing that started before current time
  //be careful to access statCounter=-1
  statCounter === -1
    ? (timer = currTime)
    : (timer = Math.max(staticCalendar[statCounter].end, currTime));
  //timer is valid start time for anything so we see if curr
  //time is inside of a static event, we update timer to end
  //of that event.

  while (
    statCounter < staticCalendar.length - 1 &&
    eventCounter < events.length - 1
  ) {
    // console.log("Note current time is " + timer);
    // console.log("Filling between:");
    // console.log(staticCalendar[statCounter]);
    // console.log("And:");
    // console.log(staticCalendar[statCounter + 1]);
    while (
      eventCounter < events.length - 1 &&
      staticCalendar[statCounter + 1].start - timer >
        events[eventCounter].period + 2 * delay
    ) {
      // console.log("Fill between criteria satisfied");
      // console.log("Putting in event:");
      events[eventCounter].start = timer + delay;
      events[eventCounter].end = timer + delay + events[eventCounter].period;
      // console.log(events[eventCounter]);
      updateDynamicTaskTimes(
        events[eventCounter].title,
        timer + delay,
        timer + delay + events[eventCounter].period
      );
      timer = events[eventCounter].end;
      eventCounter++;
    }
    statCounter++;
    timer = staticCalendar[statCounter].end;
  }

  var unmetDeadlines = events.filter((ev) => ev.end > ev.deadline);
  return unmetDeadlines;
  // return a list of all deadlines not met
}

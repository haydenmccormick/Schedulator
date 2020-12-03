/*Note you did not add an earliest start date for dynamics
staticCalendar is a list of all static events in order
events is a list of all dynamic events to be done in the future (note that you are removing the completed elemenst from events)*/
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

function updateDynamicTaskTimes(title, start, end) {
  //updates task keyed by the title with a start and end time
  db.transaction((tx) => {
    tx.executeSql("update dynamicTasks set start = ? end = ? where title = ?", [
      start,
      end,
      title,
    ]);
  });
}

function updateSplitPiece(title, newTitle, period) {
  db.transaction((tx) => {
    tx.executeSql("insert into dynamicTasks(period) value(?)", [period]);
  });
}

function addSplitPiece(piece) {
  var dateString = new Date();
  dateString = dateString.setTime();
  db.transaction((tx) => {
    tx.executeSql(
      "insert into dynamicTasks(taskname,date,endTime,period,split) value(?,?,?,?,?,?)",
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
// var Event = {
//   title: "title",
//   start: "start",
//   end: "end",
//   period: "period",
//   deadline: "deadline", //this is set to int max for statics and can act as a key for static and dynamic values
//   splitable: "splitable",
// };

// var usrPref = {
//   avgLength: avgLength,
//   maxlength: maxlength,
//   delaySize: delaySize,
// };

// staticCalendar, events, scheduledCalendar are all arrays of Event

function schedule(usrPref, scheduledCalendar) {
  // note that the staticCalendar shows the blocks taken up by static events
  //events contains a random array of all events
  const [staticCalendar, setStaticTasksValue] = useState("");
  const [events, setDynamicTasksValue] = useState("");

  db.transaction((tx) => {
    //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
    tx.executeSql("select * from tasks", [], (_, { rows: { _array } }) =>
      setStaticTasksValue(_array)
    );
    tx.executeSql("select * from dynamicTasks", [], (_, { rows: { _array } }) =>
      setDynamicTasksValue(_array)
    );
  });

  events = events.sort((a, b) => {
    a.deadline - b.deadline;
  }); //sorts events in ascending order of date
  //note for later, events here sorted so that in the future the cost of the sort is lowered
  var tail = { start: Number.MAX_SAFE_INT, end: Number.MAX_SAFE_INT };
  staticCalendar.splice(events.length(), 0, tail);
  events.splice(events.length(), 0, tail);
  for (var i = 0; i < events.length() - 1; i++) {
    if (events[i].splitable && events[i].period > usrPref.maxlength) {
      var initialPeriod = events[i].period;
      var nPieces = floor(initialLength / usrPref.avgLength);
      var title = events[i].title;
      var startTime = events[i].start;
      var deadline = events[i].deadline;
      var split = events[i].splitable;
      events[i].period = usrPref.avglength;
      initialPeriod -= usrPref.avglength; //make an initial piece of avg size
      updateSplitPiece(title, title + " (1)", usrPref.avgLength);
      for (var j = 1; j < nPieces; j++, i++) {
        var period =
          floor(initialPeriod / usrPref.avgLength) === 1 //set period to avg size until you get to the last chunk and take the whole thing
            ? initialPeriod
            : usrPref.avgLength;
        initialPeriod -= period;
        var piece = {
          title: title + " (" + String(j + 1) + ")", //change title so you can index
          start: startTime,
          end: startTime + period,
          period: period,
          deadline: deadline,
          splitable: split,
        };
        events.splice(i + j, 0, piece);
        addSplitPiece(piece);
      }
    }
  }
  //all events have now been split up into appropriate chunks

  var delay = usrPref.delaySize * 1000 * 60; //convert delay to ms (note you begin scheduel after delay mintes)
  var init = new Date();
  var currTime = init.getTime();
  var statCounter = 0;
  var eventCounter = 0;
  var timer;
  while (staticCalendar[statCounter].start < currTime) {
    statCounter++;
  }
  statCounter--; //point back at last thing that started before current time
  //be careful to access statCounter=-1
  staticCalendar.length() === 1
    ? (timer = currTime)
    : (timer = max(staticCalendar[statCounter].end, currTime));
  //timer is valid start time for anything so we see if curr
  //time is inside of a static event, we update timer to end
  //of that event.

  while (
    statCounter < staticCalendar.length() - 1 &&
    eventCounter < events.length() - 1
  ) {
    while (
      eventCounter < events.length() - 1 &&
      staticCalendar[statCounter + 1].start - timer > //index statCounter+1 must exist because of prve condition so dont worry
        events[eventCounter].period + 2 * delay
    ) {
      var event = {
        title: event[eventCounter].title,
        start: timer + delay,
        end: timer + delay + event[eventCounter].period,
        period: event[eventCounter].period,
        deadline: event[eventCounter].deadline,
        splitable: event[eventCounter].splitable,
      };
      scheduledCalendar.splice(scheduledCalendar.length(), 0, event);
      updateDynamicTaskTimes(
        events[eventCounter].title,
        timer + delay,
        timer + delay + events[eventCounter].period
      );
      eventCounter++;
      timer = event.end;
    }

    var event = {
      title: staticCalendar[statCounter].title,
      start: taticCalendar[statCounter].start,
      end: staticCalendar[statCounter].end,
      period: staticCalendar[statCounter].period,
      deadline: staticCalendar[statCounter].deadline,
      splitable: staticCalendar[statCounter].splitable,
    };
    scheduledCalendar.splice(scheduledCalendar.length(), 0, event);
    //above can be removed as you only want to set database start and end time and returning scheduledCale is useless
    statCounter++;
  }

  var unmetDeadlines = events.filter((ev) => ev.end > ev.deadline);
  return unmetDeadlines;
  //return a list of all deadlines not met
}

//returns the staticArray for of the database
// function getStaticArrayFromDB() {
//   var staticCalendar = [];
//   db.transaction((tx) => {
//     tx.executSql("select * from tasks", {}, (results) => {
//       for (var i = 0; i < results.rows.length; i++) {
//         var startConcat =
//           results.rows.item(i).date +
//           " " +
//           results.rows.item(i).startTime +
//           ":00";
//         var endConcat =
//           results.rows.item(i).date +
//           " " +
//           results.rows.item(i).endTime +
//           ":00";
//         var start = Date.parse(startConcat);
//         var end = Date.parse(endConcat);
//         var event = new Event(
//           results.rows.item(i).taskname,
//           start,
//           end,
//           start - end,
//           end,
//           false
//         );
//         staticCalendar.splice(staticCalendar.length(), 0, event);
//       }
//     });
//   });
//   return staticCalendar;
// }

// function getDynamicArrayFromDB() {
//   var dynamicCalendar = [];
//   db.transaction((tx) => {
//     tx.executSql("select * from dynamictasks", {}, (results) => {
//       for (var i = 0; i < results.rows.length; i++) {
//         var deadlineConcat =
//           results.rows.item(i).date +
//           " " +
//           results.rows.item(i).endTime +
//           ":00";
//         var deadline = Date.parse(deadlineConcat);
//         var event = new Event(
//           results.rows.item(i).taskname,
//           0,
//           0,
//           results.rows.item(i).period,
//           deadline,
//           results.rows.item(i).split
//         );
//         dynamicCalendar.splice(dynamicCalendar.length(), 0, event);
//       }
//     });
//   });
//   return dynamicCalendar;
// }

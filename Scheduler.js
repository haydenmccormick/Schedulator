/*Note you did not add an earliest start date for dynamics
staticCalendar is a list of all static events in order
events is a list of all dynamic events to be done in the future (note that you are removing the completed elemenst from events)*/

const addr = "http://192.168.1.199:8000/";


async function pushServer(command) {
  var body = new FormData();
  body.append('text', command);
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', addr);
  xhr.send(body);
}

// function updateDynamicTaskTimes(title, start, end) {
//   // console.log(title);
//   // console.log(start);
//   // console.log(end);
//   // console.log("Updating!");
//   //console.log(start);
//   let command = "update dynamicTasks set startTime = '" + start + "', endTime = '" + end + "', dontShow = '" + "False" + "' where taskName = '" + title + "'";
//   //updates task keyed by the title with a start and end time
//   pushServer(command);
// }

// //fix bug
// function updateSplitPiece(title, newTitle, period) {
//   let command = "update dynamicTasks set taskName = '" + newTitle + "', period = '" + period + "' where taskName = '" + title + "'";
//   pushServer(command);
// }

// function addSplitPiece(piece) {
//   console.log(piece.start);
//   let dateString = new Date(piece.start).toISOString().split('T')[0];
//   let values = "('" + piece.taskName + "','" + piece.startTime + "','" + piece.deadline + "','" + piece.splittable + "','" + piece.period + "','" + dateString + "','" + 'True' + "','" + piece.startTime + "','" + piece.end + "')";
//   // console.log(values);
//   pushServer("insert into dynamicTasks(taskname,date,deadline,split,period,dateString,finished,startTime,endTime) values" + values);
// }


export default function schedule(tasks, dynamic) {
  var usrPref = { avgLength: 50 * 60 * 1000, maxLength: 90 * 60 * 1000, delaySize: 15 * 60 * 1000 };

  var staticCalendar = tasks;
  var events = dynamic;
  // console.log(staticCalendar);
  for (var i = 0; i < staticCalendar.length; i++) {
    staticCalendar[i].startTime = parseInt(staticCalendar[i].startTime);
    staticCalendar[i].endTime = parseInt(staticCalendar[i].endTime);
    staticCalendar[i].period = parseInt(staticCalendar[i].period);
  }

  for (var i = 0; i < events.length; i++) {
    events[i].startTime = parseInt(events[i].startTime);
    events[i].endTime = parseInt(events[i].endTime);
    events[i].period = parseInt(events[i].period);
  }
  // console.log(events[0].deadline)
  // console.log("Events preprecessing: ");
  // console.log(events)

  let tail = { start: Number.MAX_SAFE_INTEGER, end: Number.MAX_SAFE_INTEGER };
  events.splice(events.length, 0, tail);
  staticCalendar.splice(staticCalendar.length, 0, tail);

  for (var i = 0; i < events.length - 1; i++) {
    if (events[i].split && events[i].period > usrPref.maxLength) {

      /* console.log(events[i].taskName + " used to be:") */;
      /* console.log(events[i]) */;

      var initialPeriod = events[i].period;
      var nPieces = Math.ceil(initialPeriod / usrPref.avgLength);
      var title = events[i].taskname;
      var startTime = 0;
      var deadline = events[i].deadline;
      var split = events[i].split;
      events[i].taskname = events[i].taskname + " (Part 1)";
      events[i].period = usrPref.avgLength;
      initialPeriod -= usrPref.avgLength;
      //updateSplitPiece(title, events[i].taskName, events[i].period)
      /* console.log("There should be " + nPieces + " pieces") */;
      /* console.log("Piece 1") */;
      /* console.log(events[i]) */;
      for (var j = 1; j < nPieces; j++) {

        /* console.log("Piece " + (j + 1)); */

        var period =
          (initialPeriod > usrPref.avgLength) ?
            usrPref.avgLength :
            initialPeriod;
        /* console.log("Time left: " + initialPeriod);
        console.log("Time decremented: " + period); */
        initialPeriod -= period;
        let dateStart = new Date(Date.parse(events[i].startTime).getTime() - Date.parse(events[i].startTime).getTimezoneOffset() * 60000);
        let dateString = dateStart.toISOString().split('T')[0];
        var piece = {
          taskName: title + " (Part " + String(j + 1) + ")",
          start: startTime,
          end: startTime + period,
          period: period,
          deadline: deadline,
          splitable: split,
          //dateString: dateString,
        };
        events.splice(i + j, 0, piece);
        //addSplitPiece(piece);
        /* console.log("Event just added:");
        console.log(events[i + j]); */
      }
      i += nPieces - 1;
    }
  }
  /* console.log(events); */

  var delay = usrPref.delaySize;
  var currTime = Date.now();
  var statCounter = 0;
  var eventCounter = 0;
  var timer;
  while (staticCalendar[statCounter].startTime < currTime) {
    statCounter++;
  }
  statCounter--; //point back at last thing that started before current time
  //be careful to access statCounter=-1

  statCounter === -1 ?
    (timer = currTime) :
    (timer = Math.max(staticCalendar[statCounter].endTime, currTime));
  //timer is valid start time for anything so we see if curr
  //time is inside of a static event, we update timer to end
  //of that event.

  /*   console.log(staticCalendar[statCounter]);
    console.log("Time starter is set to " + timer); */


  while (
    statCounter < staticCalendar.length - 1 &&
    eventCounter < events.length - 1
  ) {
    /* console.log("Note current time is "+timer);
    console.log("Filling between:");
    console.log(staticCalendar[statCounter]);
    console.log("And:");
    console.log(staticCalendar[statCounter+1]); */
    while (
      eventCounter < events.length - 1 &&
      staticCalendar[statCounter + 1].startTime - timer >
      events[eventCounter].period + 2 * delay
    ) {
      /* console.log("Fill between criteria satisfied");
      console.log("Putting in event:"); */
      events[eventCounter].startTime = timer + delay;
      events[eventCounter].endTime = timer + delay + events[eventCounter].period;
      /* console.log(events[eventCounter]); */
      //updateDynamicTaskTimes(events[eventCounter].taskName, events[eventCounter].start, events[eventCounter].end)
      timer = events[eventCounter].endTime;
      eventCounter++;
    }
    statCounter++;
    timer = staticCalendar[statCounter].endTime;
  }


  // var unmetDeadlines = events.filter((ev) => ev.end > ev.deadline);
  return events;
}




/*
export default function schedule(tasks, dynamic) {
  // console.log("Static Tasks: ~~~~~~~~~~~");
  // console.log(tasks);
  // console.log("Dynamic Tasks: ~~~~~~~~~~");
  // console.log(dynamic);
  // note that the staticCalendar shows the blocks taken up by static events
  //events contains a random array of all events
  var usrPref = { avgLength: 50 * 60 * 1000, maxLength: 90 * 60 * 1000, delaySize: 15 * 60 * 1000 };

  //var staticCalendarJSON;
  //var dynamicTasksValueJSON;

  // function setStaticTasksValue(val) {
  //   staticCalendarJSON = val;
  // }

  // function setDynamicTasksValue(val) {
  //   dynamicTasksValueJSON = val;
  // }

  // db.transaction((tx) => {
  //   //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
  //   tx.executeSql(
  //     "select * from tasks order by endTime",
  //     [],
  //     (_, { rows: { _array } }) => setStaticTasksValue(_array)
  //   );
  //   tx.executeSql(
  //     "select * from dynamicTasks order by deadline",
  //     [],
  //     (_, { rows: { _array } }) => setDynamicTasksValue(_array)
  //   );
  // });


  // console.log(staticCalendarJSON);
  // //sorts events in ascending order of date
  // //note for later, events here sorted so that in the future the cost of the sort is lowered
  // let tail = { start: Number.MAX_SAFE_INTEGER, end: Number.MAX_SAFE_INTEGER };

  // let staticCalendar = [];
  // let events = [];

  // for (var i in staticCalendarJSON) staticCalendar.splice(0, 0, JSON.parse(i));
  // for (var i in dynamicTasksValueJSON) events.splice(0, 0, JSON.parse(i));

  // events.splice(events.length, 0, tail);
  // staticCalendar.splice(staticCalendar.length, 0, tail);

  let staticCalendar = tasks;
  let events = dynamic;

  let tail = { start: Number.MAX_SAFE_INTEGER, end: Number.MAX_SAFE_INTEGER };
  events.splice(events.length, 0, tail);
  staticCalendar.splice(staticCalendar.length, 0, tail);

  // console.log("Start --------------------------------------------------------------------------------------------------------");
  //console.log(events);

  for (var i = 0; i < events.length - 1; i++) {
    if (events[i].finished != 'true') {
      // console.log(+events[i].period > +usrPref.maxLength);
      if (events[i].split && +events[i].period > +usrPref.maxLength) {
        // console.log(events[i].taskname + " used to be:");
        // console.log(events[i]);
        var initialPeriod =
          events[i].period;
        var nPieces = Math.ceil(initialPeriod / usrPref.avgLength);
        var title = events[i].taskname;
        var startTime = Date.now();
        var deadline = events[i].deadline;
        var split = events[i].split;
        events[i].taskname = events[i].taskname + " (Part 1)";
        events[i].period = usrPref.avgLength;
        initialPeriod -= usrPref.avgLength;
        updateSplitPiece(title, events[i].taskname, usrPref.avgLength);
        // console.log("There should be " + nPieces + " pieces");
        // console.log("Piece 1");
        // console.log(events[i]);
        for (var j = 1; j < nPieces; j++) {
          // console.log("Piece " + (j + 1));
          var period =
            initialPeriod > usrPref.avgLength ? usrPref.avgLength : initialPeriod;
          // console.log("Time left: " + initialPeriod);
          // console.log("Time decremented: " + period);
          initialPeriod -= period;
          var piece = {
            title: title + " (Part " + String(j + 1) + ")",
            start: startTime,
            end: startTime + period,
            period: period,
            deadline: deadline,
            splitable: split,
          };
          // console.log(piece);
          events.splice(i + j, 0, piece);
          addSplitPiece(piece);
          // console.log("Event just added:");
          // console.log(events[i + j]);
        }
        i += nPieces - 1;
      }
    }
  }
  // console.log(events);
  //all events have now been split up into appropriate chunks

  var delay = usrPref.delaySize; //convert delay to ms (note you begin schedule after delay minutes)
  var currTime = Date.now();
  var statCounter = 0;
  var eventCounter = 0;
  var timer;
  while (staticCalendar[statCounter].startTime < currTime) {
    statCounter++;
  }
  statCounter--; //point back at last thing that started before current time
  //be careful to access statCounter=-1
  statCounter === -1
    ? (timer = currTime)
    : (timer = Math.max(staticCalendar[statCounter].endTime, currTime));
  //timer is valid start time for anything so we see if curr
  //time is inside of a static event, we update timer to end
  //of that event.
  while (
    statCounter < staticCalendar.length - 1 &&
    eventCounter < events.length - 1
  ) {
    // console.log("Statcounter is " + statCounter);
    // console.log("Note current time is " + timer);
    // console.log("Filling between:");
    // console.log(staticCalendar[statCounter]);
    // console.log("And:");
    // console.log(staticCalendar[statCounter + 1]);

    while (
      eventCounter < events.length - 1 &&
      +staticCalendar[statCounter + 1].startTime - timer >
      +events[eventCounter].period + 2 * delay &&
      events[eventCounter].finished != 'true'
    ) {
      // console.log("Fill between criteria satisfied");
      // console.log("Putting in event:");
      events[eventCounter].startTime = timer + delay;
      events[eventCounter].endTime = timer + delay + events[eventCounter].period;
      //console.log(events[eventCounter]);
      console.log("Timer = " + timer);
      console.log("Delay = " + delay);
      updateDynamicTaskTimes(
        events[eventCounter].taskName,
        timer + delay,
        timer + delay + events[eventCounter].period
      );
      timer = events[eventCounter].endTime;
      eventCounter++;
    }
    statCounter++;
    timer = staticCalendar[statCounter].endTime;
  }

  // console.log("End --------------------------------------------------------------------------------------------------------")
  // console.log(events);

  //var unmetDeadlines = events.filter((ev) => ev.end > ev.deadline);
  return 1;
  // return a list of all deadlines not met
}
*/
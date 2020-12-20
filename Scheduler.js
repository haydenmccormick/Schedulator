/*Note you did not add an earliest start date for dynamics
staticCalendar is a list of all static events in order
events is a list of all dynamic events to be done in the future (note that you are removing the completed elemenst from events)*/

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
  var usrPref = {
    avgLength: 50 * 60 * 1000,
    maxLength: 90 * 60 * 1000,
    delaySize: 15 * 60 * 1000,
    sleepStart: TimeRanges,
    sleepEnd: TimeRanges,
  };

  var staticCalendar = [...tasks];
  var events = JSON.parse(JSON.stringify(dynamic)); // Deep copy so dynamic task list is unchanged

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

  let tail = {
    startTime: Number.MAX_SAFE_INTEGER,
    endTime: Number.MAX_SAFE_INTEGER,
  };
  events.splice(events.length, 0, tail);
  staticCalendar.splice(staticCalendar.length, 0, tail);

  for (var i = 0; i < events.length - 1; i++) {
    if (events[i].split && events[i].period > usrPref.maxLength) {
      var initialPeriod = events[i].period;
      var nPieces = Math.ceil(initialPeriod / usrPref.avgLength);
      var title = events[i].taskname;
      var startTime = 0;
      var deadline = events[i].deadline;
      var split = events[i].split;
      events[i].taskname = events[i].taskname + " (Part 1)";
      events[i].period = usrPref.avgLength;
      initialPeriod -= usrPref.avgLength;
      // console.log("Event split pieces:");
      // console.log(events[i]);
      for (var j = 1; j < nPieces; j++) {
        var period =
          initialPeriod > usrPref.avgLength ? usrPref.avgLength : initialPeriod;
        initialPeriod -= period;
        var piece = {
          taskname: title + " (Part " + String(j + 1) + ")",
          startTime: startTime,
          endTime: startTime + period,
          period: period,
          deadline: deadline,
          splitable: split,
        };
        events.splice(i + j, 0, piece);
        // console.log(piece);
      }

      i += nPieces - 1;
    }
  }

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

  statCounter === -1
    ? (timer = currTime)
    : (timer = Math.max(staticCalendar[statCounter].endTime, currTime));
  //timer is valid start time for anything so we see if curr
  //time is inside of a static event, we update timer to end
  //of that event.
  // console.log(events);
  while (
    statCounter < staticCalendar.length - 1 &&
    eventCounter < events.length - 1
  ) {
    while (
      eventCounter < events.length - 1 &&
      staticCalendar[statCounter + 1].startTime - timer >
        events[eventCounter].period + 2 * delay
    ) {
      // console.log("Events before editing:");
      // console.log(events[eventCounter]);
      events[eventCounter].startTime = timer + delay;
      events[eventCounter].endTime =
        timer + delay + events[eventCounter].period;
      events[eventCounter].dateString = new Date(events[eventCounter].startTime)
        .toISOString()
        .split("T")[0];
      timer = events[eventCounter].endTime;
      // console.log("Scheduled Event");
      // console.log(events[eventCounter]);
      eventCounter++;
    }
    statCounter++;
    timer = staticCalendar[statCounter].endTime;
  }
  return events;
}

export default function schedule(tasks, dynamic, usrPrefUnformated) {
  var usrPref = {
    avgLength: 50 * 60 * 1000,
    maxLength: 90 * 60 * 1000,
    delaySize: 15 * 60 * 1000,
    sleep: 1000 * 60 * 60 * 23, //11 pm UTC 1970
    wakeUp: 1000 * 60 * 60 * 10, //7 am UTC 1970
  };
  //sample usrPref
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

  var oneDay = 24 * 60 * 60 * 1000;

  var startOfToday = new Date(Date.now());
  startOfToday.setMilliseconds(0);
  startOfToday.setSeconds(0);
  startOfToday.setMinutes(0);
  startOfToday.setHours(0);

  var sleepOffset =
    usrPref.sleep > usrPref.wakeUp ? usrPref.sleep - oneDay : usrPref.sleep;
  //making sure sleep offset is less than wakeUp (11 pm is before 7 am)
  var sleepBlock = {
    taskname: "Sleep Block",
    startTime: startOfToday.getTime() + sleepOffset,
    endTime: startOfToday.getTime() + usrPref.wakeUp,
  };

  for (var i = 0; i < 5; i++) {
    var sleepBlockCpy = {
      taskname: "Sleep Block",
      startTime: sleepBlock.startTime,
      endTime: sleepBlock.endTime,
    };
    var sTime = new Date(sleepBlockCpy.startTime);
    // console.log(sTime.toLocaleTimeString());
    staticCalendar.push(sleepBlockCpy);
    sleepBlock.startTime += oneDay;
    sleepBlock.endTime += oneDay;
  }

  staticCalendar.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

  // console.log("First 5 Events");
  // for (var i = 0; i < 5; i++) {
  //   console.log(staticCalendar[i]);
  // }
  // console.log(staticCalendar);
  //resorting staticEvents due to sleep Schedule

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
  // console.log(staticCalendar);
  while (staticCalendar[statCounter].endTime < currTime) {
    //changed end to start
    // console.log(statCounter);
    // console.log(staticCalendar[statCounter]);
    statCounter++;
  }

  currTime >= staticCalendar[statCounter].startTime
    ? (timer = staticCalendar[statCounter].endTime)
    : (timer = currTime);

  // statCounter--; //point back at last thing that started before current time
  // statCounter === -1
  //   ? (timer = currTime)
  //   : (timer = Math.max(staticCalendar[statCounter].endTime, currTime));
  //timer is valid start time for anything so we see if curr
  //time is inside of a static event, we update timer to end
  //of that event.
  // console.log(events);
  // console.log(staticCalendar);
  while (
    statCounter < staticCalendar.length - 1 &&
    eventCounter < events.length - 1
  ) {
    console.log(staticCalendar[statCounter]);
    console.log("Timer before");
    var tempTime = new Date(timer);
    var tempTime2 = new Date(staticCalendar[statCounter + 1].startTime);
    console.log(tempTime.toLocaleTimeString());
    console.log("static event after this time");
    console.log(staticCalendar[statCounter + 1]);
    console.log(tempTime2.toLocaleTimeString());

    while (
      eventCounter < events.length - 1 &&
      staticCalendar[statCounter + 1].startTime - timer >
        events[eventCounter].period + 2 * delay
    ) {
      console.log("\nAdding event\n");
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
    if (staticCalendar[statCounter].startTime > timer) {
      timer = staticCalendar[statCounter].endTime;
    }
  }
  return events;
}

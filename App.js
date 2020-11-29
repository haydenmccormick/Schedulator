import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { CheckBox, StyleSheet, Text, View, TextInput, Switch, Button, SafeAreaView, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars'
import { DateInput } from 'react-native-date-input';
import DatePicker from 'react-native-datepicker';
import NumberPlease from "react-native-number-please";
import Picker from 'rc-picker';
import TimePicker from 'react-native-simple-time-picker';
import TimeInterval from 'react-native-clock-interval';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

//import {openDatabase} from 'react-native-sqlite-storage';

FileSystem.downloadAsync(
			      Expo.Asset.fromModule(require('./db.db')).uri,
			      `${FileSystem.documentDirectory}SQLite/db.db`
			      );
const db = SQLite.openDatabase("db.db");


// Main render method
export default function App() {
    const d = new Date();
    const month = d.getMonth() + 1;
    const string =  d.getFullYear() + '-' + month + '-' + d.getDate();
    const [selected, setSelected] = useState(string);
    const onDayPress = (day) => {
	setSelected(day.dateString);
	alert(day.dateString);
    };
    return (
	<ScrollView>
	    <View style={styles.container}>
	    <View style={styles.calendararea}>
	    <Text style={styles.title}>Basic Calendar</Text>
	    <Calendar
	onDayPress={onDayPress}
	markedDates={{
	    [selected]: {
		selected: true,
		disableTouchEvent: true,
		selectedColor: 'lightblue',
		selectedTextColor: 'black',
	    },
	}}
	/>
	    </View>
	    <View style={styles.inputarea}>
	    <Text style={styles.subtitle}>Add a task</Text>
	    <Form />
	    <Text style={styles.subtitle}>Add a dynamic task</Text>
	    <Dynamic />
	    </View>
	    <StatusBar style="auto" />
	    </View>
	     </ScrollView>
    );
}

/*
function Event(props) {
  return (
    <View>
      <Text>{props.nunberOfGuests}</Text>
      <Text>{props.isGoing}</Text>
    </View>
  );
}
*/

// Form for adding events
function Form(props) {
    //Remember to clear form
    const [input,setInput] = useState("");
    const [count,setCount] = useState("");
    const [Hours,setHours] = useState("");
    const [Minutes,setMinutes] = useState("");
    const [Hours2,setHours2] = useState("");
    const [Minutes2,setMinutes2] = useState("");
    function fixMinutes(minutes) {
	if (String(minutes).length == 1) {
	    return '0' + minutes;
	}
	else return minutes;
    }
    function check() {
	if (input == "" || count == "" || Hours == "" || Minutes == "" || Hours2 == "" || Minutes2 == "") {
	    return 0;
	}
	return 1;
    }
    function notFilled() {
	alert("Fill in all the fields to add the task");
    }
    function submit() {
	let values = "('" + input + "'" + ",'" + count + "','" + Hours + ":" + Minutes + "','" + Hours2 + ':' + Minutes2 + "')";
	//Add stuff to database
	//insert into tasks(taskname,date,startTime,endTime) values ('e','f','g','h'')
	db.transaction(tx => {
	    tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values,[]);
	    tx.executeSql(
			  "select * from tasks",
			  [],
			  (_, { rows: { _array } }) => alert(JSON.stringify(_array))
			  );
	});

	//alert("Adding task");
    }
    let button;
    if (check()) {
	button = <Button onPress={() => {submit();
					 setInput("");setCount("");
					 setHours("");setMinutes("");
					 setHours2("");setMinutes2("");
					}} title="Submit" />;
    }
    else {
	button = <Button onPress={() => {notFilled()}} title="Submit" />;
    }
    return(
	    <View>
	    <Text>Enter task name</Text>
	    <View>
	    <TextInput style={styles.input} name="taskname" type="text" value={input} onChangeText={(text) => setInput(text)} />
	    </View>
	    <Text>Enter date</Text>
	    <View>
	    <DatePicker placeholder={count} onDateChange={(date) => setCount(date)} />
	    </View>
	    <Text>Enter start time</Text>
	    <Text>{Hours}:{Minutes}</Text>
	    <View>
	    <TimePicker selectedHours={Hours} selectedMinutes={Minutes}
	onChange={(hours, minutes) => {setHours(hours);setMinutes(fixMinutes(minutes))}} />
	    </View>
	    <Text>Enter end time</Text>
	    <Text>{Hours2}:{Minutes2}</Text>
	    <View>
	    <TimePicker selectedHours={Hours2} selectedMinutes={Minutes2}
	onChange={(hours, minutes) => {setHours2(hours);setMinutes2(fixMinutes(minutes))}} />
	    </View>
	    {button}
	    </View>
    );
}

function Dynamic(props) {
    //Remember to clear form
    //insert into dynamicTasks(taskname,date,endTime,period,split) values ('a','b','c','d','e');
    const [input,setInput] = useState("");
    const [count,setCount] = useState("");
    const [Hours,setHours] = useState("");
    const [Minutes,setMinutes] = useState("");
    const [Hours2,setHours2] = useState("");
    const [Minutes2,setMinutes2] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(true);
    function fixMinutes(minutes) {
	if (String(minutes).length == 1) {
	    return '0' + minutes;
	}
	else return minutes;
    }
    function check() {
	if (input == "" || count == "" || Hours == "" || Minutes == "" || Hours2 == "" || Minutes2 == "") {
	    return 0;
	}
	return 1;
    }
    function notFilled() {
	alert("Fill in all the fields to add the task");
    }
    function submit() {
	let values = "('" + input + "'" + ",'" + count + "','" + Hours + ":" + Minutes + "','" + Hours2 + ':' +
	    Minutes2 + "','" + toggleCheckBox  + "')";
	//Add stuff to database
	//insert into tasks(taskname,date,startTime,endTime) values ('e','f','g','h'')
	db.transaction(tx => {
	    //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values,[]);
	    tx.executeSql(
			  "select * from dynamicTasks",
			  [],
			  (_, { rows: { _array } }) => alert(JSON.stringify(_array))
			  );
	});
	alert(values);
    }
    let button;
    if (check()) {
	button = <Button onPress={() => {submit();
					 setInput("");setCount("");
					 setHours("");setMinutes("");
					 setHours2("");setMinutes2("");
					}} title="Submit" />;
    }
    else {
	button = <Button onPress={() => {notFilled()}} title="Submit" />;
    }
    return(
	    <View>
	    <Text>Enter task name</Text>
	    <View>
	    <TextInput style={styles.input} name="taskname" type="text" value={input} onChangeText={(text) => setInput(text)} />
	    </View>
	    <Text>Enter date</Text>
	    <View>
	    <DatePicker placeholder={count} onDateChange={(date) => setCount(date)} />
	    </View>
	    <Text>Enter deadline time</Text>
	    <Text>{Hours}:{Minutes}</Text>
	    <View>
	    <TimePicker selectedHours={Hours} selectedMinutes={Minutes}
	onChange={(hours, minutes) => {setHours(hours);setMinutes(fixMinutes(minutes))}} />
	    </View>
	    <Text>Enter the amount of time it taskes to get done</Text>
	    <Text>{Hours2}:{Minutes2}</Text>
	    <View>
	    <TimePicker selectedHours={Hours2} selectedMinutes={Minutes2}
	onChange={(hours, minutes) => {setHours2(hours);setMinutes2(fixMinutes(minutes))}} />
	    </View>
	    <Text>Splitable</Text>
	    <CheckBox disabled={false} value={toggleCheckBox}
	onValueChange={(newValue) => setToggleCheckBox(newValue)} />
	    {button}
	</View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  calendararea: {
    flex: 1.5,
    justifyContent: 'flex-end',
    marginBottom: 15,
    width: "80%",
  },
  inputarea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  going: {
    alignItems: 'center',
    marginVertical: 15,
  },
  input: {
    textAlign: 'center',
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: 'skyblue',
    borderWidth: 2,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    paddingBottom: 15,
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 15,
    borderBottomWidth: 1.5,
  },
});

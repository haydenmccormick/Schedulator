import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import { Calendar } from 'react-native-calendars'
import { DateInput } from 'react-native-date-input';

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
	    </View>
	    <StatusBar style="auto" />
	    </View>
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
    let state = {taskname: null, date: null, startTime: null, endTime: null};
    function handleInputChange(event) {
	const target = event.target;
	const name = target.name;
	const value = target.value;
	switch (name) {
	case "taskname":
	    state.taskname = value;
	    break;
	case "date":
	    state.date = value;
	    break;
	case "startTime":
	    state.startTime = value;
	    break;
	case "endTime":
	    state.endTime = value;
	    break;
	case "submit":
	    if (state.taskname != undefined && state.taskname != "" && state.taskname != null &&
		state.date != undefined && state.date != "" && state.date != null &&
		state.startTime != undefined && state.startTime != "" && state.startTime != null &&
		state.endTime != undefined && state.endTime != "" && state.endTime != null
	       ) {
		alert("Task has been created");
		state.taskname = null;
		state.date = null;
		state.startTime = null;
		state.endTime = null;
		//Add stuff to database here
		target.type = "reset";
	    }
	    else {
		alert("You must fill all the forms before creating a task");
		target.type = "button";
	    }
	}

    }
    return (
	    <View>
	    <input placeholder="Name of task" name="taskname" type="text" onChange={handleInputChange}/>
	    <input name="date" type="date" onChange={handleInputChange}/>
	    <input name="startTime" type="time" onChange={handleInputChange}/>
	    <input name="endTime" type="time" onChange={handleInputChange}/>
	    <input type="button" name="submit" value="Add task" onClick={handleInputChange}/>
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

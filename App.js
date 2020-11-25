import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const disabledDates = ["tomorrow"];

function tileDisabled({ date, view }) {
  // Disable tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of disabled dates
    return disabledDates.find(dDate => isSameDay(dDate, date));
  }
}
export default function App() {
    const [value, setValue] = useState(new Date());
    function onChange(nextValue) {
	setValue(nextValue);
	//alert(nextValue);
	//const enteredName = prompt('Please enter your name');
    }
    return (
	    <View style={styles.container}>
	    <h1>Basic Calendar</h1>
	    <Calendar onChange={onChange} value={value} />
	    <h2>Add a Task</h2>
	    <> <StaticTasks /> </>
	    <h2>Events</h2>
	    <Text>Open up App.js to start working on your app!</Text>
	    <StatusBar style="auto" />
	    </View>
    );
}

class StaticTasks extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    taskname: null,
	    date: null,
	    startTime: null,
	    endTime: null
	};

	this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
	const target = event.target;
	const name = target.name;
	const value = target.value;
	switch (name) {
	case "taskname":
	    this.taskname = value;
	    break;
	case "date":
	    this.date = value;
	    break;
	case "startTime":
	    this.startTime = value;
	    break;
	case "endTime":
	    this.endTime = value;
	    break;
	case "submit":
	    alert("Should add the stuff to database");
	    //target.value = 1;
	    //Should also clear the form and give an error if any of the values are null
	}
    }

    render() {
	return (
		<form>
		<label>
		Task Name:
		<input
	    name="taskname"
		type="text"
	    onChange={this.handleInputChange}
		/>
		</label>
		<br />
		Date:
		<label>
		<input
	    name="date"
	    type="date"
	    onChange={this.handleInputChange}
		/>
		</label>
		<br />
		<label>
		Start Time:
		<input
	    name="startTime"
	    type="time"
	    onChange={this.handleInputChange}
	    />
		</label>
		<br />
		<label>
		End Time:
		<input
	    name="endTime"
	    type="time"
	    onChange={this.handleInputChange}
	    />
		</label>
		<br />
		<label>
		<input
	    name="submit"
	    type="button"
	    value="Add static task"
	    onClick={this.handleInputChange}
	    />
		</label>
		</form>
	);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

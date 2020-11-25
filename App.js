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
	    taskname: null
	};

	this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
	const target = event.target;
	const type = target.type;
	const value = target.name;
	alert(target.value);
    }

    render() {
	return (
		<form>
		<label>
		Task Name:
		<input
		type="text"
		value={this.state.taskname}
		onChange={this.handleInputChange} />
		</label>
		<br />
		Date:
		<label>
		<input type="date" />
		</label>
		<br />
		<label>
		Start Time:
		<input type="time" />
		</label>
		<br />
		<label>
		End Time:
		<input type="time" />
		</label>
		<br />
		<label>
		<input type="submit" value="Add static task" />
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

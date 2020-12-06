import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Agenda } from 'react-native-calendars'
import { Form, Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

function DayView(props) {

	const d = new Date();
	const month = d.getMonth() + 1;
	const string = d.getFullYear() + '-' + month + '-' + d.getDate();
	const [selected, setSelected] = useState(string);
	const onDayPress = (day) => {
		setSelected(day.dateString);
	};
	const tasks = props.tasks;
	const dates = props.dates;

	/***** Executed on "Add" button press, renders an EventForm *****/
	const [addingEvent, setAddingEvent] = useState(false);
	const addEventPressHandler = () => {
		props.findTasks();
		setAddingEvent(!addingEvent);
	};

	// Only render a form if the user is adding an event
	const render_form = (addingEvent ?
		<View style={styles.formwrapper}>
			{/* So the user can click outside of form box to cancel*/}
			<TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} activeOpacity={1} />
			<View style={styles.formcontainer}>
				<Form retFunc={addEventPressHandler} pushServer={props.pushServer} />
			</View>
		</View>
		: null)

	// Displayed when no events are planned for a given day
	const emptyday = (
		<View style={styles.eventcontainer}>
			<Text style={styles.emptytext}>
				There's nothing here. Add an event to liven things up!
			</Text>
		</View>
	)

	// Render event on agenda (different if Dynamic or Static)
	function event(item) {
		let renderbar;
		let message = "";
		let timedisplay;
		let start = (new Date(item.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
		let end = (new Date(item.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
		if (item.type == 'dynamic') {
			message = " due"
			renderbar = styles.dynamicevent;
			timedisplay = <Text style={styles.eventdatetext}>{end}</Text>
		}
		else {
			renderbar = styles.staticevent;
			timedisplay = <Text style={styles.eventdatetext}>
				{start} - {end}
			</Text>
		}
		return (
			<View style={styles.eventcontainer}>
				<View style={renderbar} />
				<View style={styles.eventdate}>
					<Text style={styles.eventname}>
						{item.name}{message}
					</Text>
					{timedisplay}
				</View>
			</View>
		)
	}

	// TODO: render an indication of where in the day the user is

	return (
		<View style={styles.container}>
			<Agenda style={styles.container}
				onDayPress={onDayPress}
				markedDates={dates}
				renderEmptyData={() => { return emptyday; }}
				renderItem={(item) => { return event(item); }}
				items={tasks}
			/>
			<View style={styles.buttonwrapper}>
				<TouchableOpacity onPress={addEventPressHandler}>
					<Image
						source={require('./assets/event-button.png')}
						style={styles.button}
					/>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
			{render_form}
		</View>
	);
}

module.exports = {
	DayView: DayView,
}
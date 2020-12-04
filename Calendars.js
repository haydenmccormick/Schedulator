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
	const [dates, setDates] = useState([{}]);
	const onDayPress = (day) => {
		setSelected(day.dateString);
	};
	const tasks = props.tasks;
	// Generates an array of eventdates and passes it to dates

	function findDates() {
		const tempDates = {};
		db.transaction(tx => {
			//tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
			tx.executeSql(
				"select * from tasks",
				[],
				(tx, results) => {
					for (let i = 0; i < results.rows.length; i++) {
						tempDates[results.rows.item(i).date] = { marked: true };
					}
				}
			);
			tx.executeSql(
				"select * from dynamictasks",
				[],
				(tx, results) => {
					for (let i = 0; i < results.rows.length; i++) {
						tempDates[results.rows.item(i).date] = { marked: true };
					}
					setDates(tempDates);
				}
			);
		});
	}

	// Generates an array of events and passes it to tasks


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
			<TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} />
			<View style={styles.formcontainer}>
				<Form retFunc={addEventPressHandler} />
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
		if (item.type == 'dynamic') {
			message = " due"
			renderbar = styles.dynamicevent;
			timedisplay = <Text style={styles.eventdatetext}>{item.endTime}</Text>
		}
		else {
			renderbar = styles.staticevent;
			timedisplay = <Text style={styles.eventdatetext}>{item.startTime} - {item.endTime}</Text>
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

	// TODO: This is slow. Is there a more efficient way to do it?
	function getItems() {
		findDates();
		return tasks;
	}

	// TODO: render an indication of where in the day the user is

	return (
		<View style={styles.container}>
			<Agenda style={styles.container}
				onDayPress={onDayPress}
				markedDates={dates}
				renderEmptyData={() => { return emptyday; }}
				renderItem={(item) => { return event(item); }}
				items={getItems()}
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
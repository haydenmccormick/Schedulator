import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native';
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
		props.findTasks();
	};


	/***** Executed on "Add" button press, renders an EventForm *****/
	const [addingEvent, setAddingEvent] = useState(false);
	const [scheduled, setScheduled] = useState({});
	const addEventPressHandler = () => {
		props.findTasks();
		setAddingEvent(!addingEvent);
	};

	const tasks = props.tasks;

	// Only render a form if the user is adding an event
	const render_form = (addingEvent ?
		<View style={styles.formwrapper}>
			{/* So the user can click outside of form box to cancel*/}
			<TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} activeOpacity={1} />
			<View style={styles.formcontainer}>
				<Form retFunc={addEventPressHandler} pushServer={props.pushServer} username={props.username} />
			</View>
		</View>
		: null)

	// Displayed when no events are planned for a given day
	const emptyday = (
		<TouchableOpacity style={styles.emptycontainer} onPress={() => { props.findTasks(); }} activeOpacity={1}>
			<Text style={styles.emptytext}>
				There's nothing here. Add an event to liven things up!{'\n'}
				(or press here to reload)
			</Text>
		</TouchableOpacity>
	)

	function deleteItem(itemName, itemType) {
		let table;
		if (itemType == 'static')
			table = 'tasks';
		else
			table = 'dynamicTasks';
		let deleteStatement = "delete from " + table + " where taskname = '" + itemName + "'";
		props.pushServer(deleteStatement);
	}

	function handleDelete(itemName, itemType) {
		Alert.alert("Are you sure you want to delete " + itemName + "?",
			"This can't be undone.", [
			{ text: "Yes", onPress: () => { deleteItem(itemName, itemType) } },
			{ text: "Cancel" },
		]);
	}

	// Render event on agenda (different depending on type)
	function event(item) {
		let renderbar;
		let message = "";
		let timedisplay;
		let endDisplay;
		let start = (new Date(parseInt(item.startTime)).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
		let end = (new Date(parseInt(item.endTime)).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
		if (item.type == 'dynamic') {
			message = " due"
			renderbar = styles.dynamicevent;
			timedisplay = <Text style={styles.eventdatetext}>{end}</Text>
		}
		else if (item.type == 'static') {
			renderbar = styles.staticevent;
			timedisplay = <Text style={styles.eventdatetext}>
				{start} - {end}
			</Text>
		}
		else {
			renderbar = styles.scheduledevent;
			timedisplay = <Text style={styles.eventdatetext}>
				{start} - {end}
			</Text>
		}
		let ret = (item.type == 'scheduled' ?
			<View style={styles.scheduledeventcontainer}>
				<View style={renderbar} />
				<View style={styles.eventdate}>
					<Text style={styles.scheduledeventname}>
						{item.name}{message}
					</Text>
					{timedisplay}
				</View>
			</View>
			:
			<View style={styles.eventcontainer}>
				<View style={renderbar} />
				<View style={styles.deletearea}>
					<Text style={item.type == 'static' ? styles.staticdelete : styles.delete}
						onPress={() => { handleDelete(item.name, item.type) }}>x</Text>
				</View>
				<View style={styles.eventdate}>
					<Text style={styles.eventname}>
						{item.name}{message}
					</Text>
					{timedisplay}
				</View>
			</View>
		)
		return ret;
	}

	return (
		<View style={styles.agendacontainer}>
			<Agenda style={{ marginTop: 10 }}
				onDayPress={onDayPress}
				markedDates={props.dates}
				renderEmptyData={() => { return emptyday; }}
				renderItem={(item) => { return event(item); }}
				items={tasks}
				onRefresh={() => { props.findTasks(); }}
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

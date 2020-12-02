import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { Agenda } from 'react-native-calendars'
import { Form, Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';
import { useFonts, Roboto_100Thin, Roboto_300Light } from '@expo-google-fonts/roboto';
import { AppLoading } from 'expo';

const db = SQLite.openDatabase("db.db");

function DayView() {

	const d = new Date();
	const month = d.getMonth() + 1;
	const string = d.getFullYear() + '-' + month + '-' + d.getDate();
	const [selected, setSelected] = useState(string);
	const [taskEntries, setTaskEntries] = useState([{}]);
	const [dates, setDates] = useState([{}]);
	const onDayPress = (day) => {
		setSelected(day.dateString);
	};

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
					setDates(tempDates);
				}
			);
		});
	}

	// Generates an array of events and passes it to tasks

	function findTasks() {
		const tempTasks = {};
		db.transaction(tx => {
			//tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
			tx.executeSql(
				"select * from tasks",
				[],
				(tx, results) => {
					for (let i = 0; i < results.rows.length; i++) {
						newTask = {
							name: results.rows.item(i).taskname,
							startTime: results.rows.item(i).startTime,
							endTime: results.rows.item(i).endTime
						};
						console.log(newTask);
						if (tempTasks[results.rows.item(i).date]) {
							tempTasks[results.rows.item(i).date].push(newTask);
						}
						else {
							tempTasks[results.rows.item(i).date] = [newTask];
						}
					}
				}
			);
			tx.executeSql(
				"select * from dynamictasks",
				[],
				(tx, results) => {
					for (let i = 0; i < results.rows.length; i++) {
						newTask = {
							name: results.rows.item(i).taskname,
							startTime: "Dynamic",
							endTime: results.rows.item(i).endTime
						};
						console.log(newTask);
						if (tempTasks[results.rows.item(i).date]) {
							tempTasks[results.rows.item(i).date].push(newTask);
						}
						else {
							tempTasks[results.rows.item(i).date] = [newTask];
						}
					}
					setTaskEntries(tempTasks);
				}
			);
		});
	}


	/***** Executed on "Add" button press, renders an EventForm *****/
	const [addingEvent, setAddingEvent] = useState(false);
	const addEventPressHandler = () => {
		findDates();
		findTasks();
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

	// Load in expo google fonts
	let [fontsLoaded] = useFonts({
		Roboto_100Thin,
		Roboto_300Light
	});
	// If it's not loaded in time, make the user wait
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	// Displayed when no events are planned for a given day
	const emptyday = (
		<View style={styles.eventcontainer}>
			<Text style={styles.emptytext}>
				There's nothing here. Add an event to liven things up!
			</Text>
		</View>
	)

	function event(item) {
		let renderbar;
		if (item.startTime == 'Dynamic')
			renderbar = styles.dynamicevent;
		else
			renderbar = styles.staticevent;
		return (
			<View style={styles.eventcontainer}>
				<View style={renderbar} />
				<View style={styles.eventdate}>
					<Text style={styles.eventname}>
						{item.name}
					</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Agenda style={styles.container}
				onDayPress={onDayPress}
				markedDates={dates}
				renderEmptyData={() => { return emptyday; }}
				renderItem={(item) => { return event(item); }}
				items={taskEntries}
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
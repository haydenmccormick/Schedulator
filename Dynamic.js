import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, ImageBackground } from 'react-native';
import { Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

export default function TaskList(props) {
	const [tasks, setTasks] = useState("");
	function showTasks() {
		const tempDates = {};
		db.transaction(tx => {
			tx.executeSql(
				"SELECT * FROM dynamicTasks ORDER BY deadline",
				[],
				(_, { rows: { _array } }) => setTasks(_array)
			);
		});
	}

	/***** Executed on "Add" button press, renders an EventForm *****/
	const [addingEvent, setAddingEvent] = useState(false);
	const addEventPressHandler = () => {
		showTasks();
		props.findTasks();
		setAddingEvent(!addingEvent);
	};

	// Only render a form if the user is adding an event
	const render_form = (addingEvent ?
		<View style={styles.formwrapper}>
			{/* So the user can click outside of form box to cancel*/}
			<TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} />
			<View style={styles.formcontainer}>
				<Dynamic retFunc={addEventPressHandler} />
			</View>
		</View>
		: null)

	// list of tasks displayed to user
	let listview;
	const Item = ({ name, dueDate }) => (
		<View style={styles.eventlistcontainer}>
			<Text style={styles.eventlisttext}>{name}</Text>
			<Text style={styles.eventlisttext2}>Due {dueDate}</Text>
		</View>
	);

	const renderItem = ({ item }) => (
		<Item name={item.taskname} dueDate={item.date} />
	);

	if (tasks != "") {
		//horizontalScroll={true} columnWidth={50} height={150}
		listview = <FlatList
			data={tasks}
			renderItem={renderItem}
		/>
	}
	else {
		listview =
			<View style={styles.emptyeventlistcontainer}>
				<Text style={styles.emptyeventlisttext}>When you add a task, it will be displayed here</Text>
			</View>
	}
	return (
		<View style={styles.container} >
			<View style={styles.listheader}>
				<Text style={styles.listheadertext}>Tasks</Text>
			</View>
			{listview}
			<View style={styles.buttonwrapper}>
				<TouchableOpacity onPress={addEventPressHandler}>
					<Image
						source={require('./assets/task-button.png')}
						style={styles.button}
					/>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
			{render_form}
		</View>
	);
}

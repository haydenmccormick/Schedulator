import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Alert } from 'react-native';
import { Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';
import deleteDynamicTasks from './DeleteForm.js';

const db = SQLite.openDatabase("db.db");
const addr = "http://192.168.86.27:8000/";

export default function TaskList(props) {
	const tasks = props.tasks;
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
				<Dynamic retFunc={addEventPressHandler} />
			</View>
		</View>
		: null)

	function deleteItem(itemName) {
		db.transaction(tx => {
			tx.executeSql("delete from dynamicTasks where taskname ='" + itemName + "'", []);
		});
		var body = new FormData();
		//body.append('file_attachment',`${FileSystem.documentDirectory}SQLite/db.db`);
		body.append('text', "delete from dynamicTasks where taskname ='" + itemName + "'");
		//body.append('file_attachment',FileSystem.readAsStringAsync("db.db"));
		var xhr = new XMLHttpRequest();
	    xhr.open('PUT',addr);
		xhr.send(body);
		props.findTasks();
	}

	function handleDelete(itemName) {
		Alert.alert("Are you sure you want to delete " + itemName + "?",
			"This can't be undone.", [
			{ text: "Yes", onPress: () => { deleteItem(itemName) } },
			{ text: "Cancel" },
		]);
	}

	// list of tasks displayed to user
	let listview;
	const Item = ({ name, dueDate, dueTime }) => (
		<View style={styles.eventlistcontainer}>
			<View style={styles.deletearea}>
				<Text style={styles.delete} onPress={() => { handleDelete(name) }}>X</Text>
			</View>
			<View>
				<Text style={styles.eventlisttext}>{name}</Text>
				<Text style={styles.eventlisttext2}>Due {dueDate} at {dueTime}</Text>
			</View>
		</View>
	);

	const renderItem = ({ item }) => (
		<Item name={item.taskname} dueDate={new Date(item.deadline).toDateString()}
			dueTime={new Date(item.deadline).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} />
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

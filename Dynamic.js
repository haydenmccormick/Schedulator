import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Alert, RefreshControl } from 'react-native';
import { Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';
import deleteDynamicTasks from './DeleteForm.js';

const db = SQLite.openDatabase("db.db");

export default function TaskList(props) {
	const tasks = props.tasks;
	/***** Executed on "Add" button press, renders an EventForm *****/
	const [addingEvent, setAddingEvent] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

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
				<Dynamic retFunc={addEventPressHandler} pushServer={props.pushServer} />
			</View>
		</View>
		: null)

    function deleteItem(itemName) {
	//alert(props.getUsername);
		let deleteStatement = "delete from dynamicTasks where taskname = '" + itemName + "'";
		props.pushServer(deleteStatement);
		// db.transaction(tx => {
		//	tx.executeSql(deleteStatement, []);
		//	props.pushServer(deleteStatement);
		//	props.findTasks();
		// });
	}

    function handleDelete(itemName) {
	//alert(props.username);
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
			<View style={styles.checkarea}>
				<Text style={styles.check}>✓</Text>
			</View>
			<View style={styles.deletearea}>
				<Text style={styles.delete} onPress={() => { handleDelete(name) }}>x</Text>
			</View>
			<View>
				<Text style={styles.eventlisttext}>{name}</Text>
				<Text style={styles.eventlisttext2}>Due {dueDate} at {dueTime}</Text>
			</View>
		</View>
	);

	const renderItem = ({ item }) => (
		<Item name={item.taskname} dueDate={new Date(parseInt(item.deadline)).toDateString()}
			dueTime={new Date(parseInt(item.deadline)).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} />
	);

    function handleRefresh() {
	//alert(props.username);
		setRefreshing(true);
		props.findTasks();
		setRefreshing(false);
	}

	if (tasks != "") {
		//horizontalScroll={true} columnWidth={50} height={150}
		listview = <FlatList
			data={tasks}
			renderItem={renderItem}
			keyExtractor={item => item.taskname + item.deadline}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
		/>
	}
	else {
		listview =
			<TouchableOpacity style={styles.emptyeventlistcontainer} onPress={handleRefresh} activeOpacity={1}>
				<Text style={styles.emptyeventlisttext}>No tasks just yet. Tap the '+' button to add one, and tap here to refresh!</Text>
			</TouchableOpacity>
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

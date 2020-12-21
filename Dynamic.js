import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Alert, RefreshControl, Button, TextInput, ScrollView } from 'react-native';
import { Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';
import schedule from './Scheduler.js';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const db = SQLite.openDatabase("db.db");

export default function TaskList(props) {
	const tasks = props.tasks;
	/***** Executed on "Add" button press, renders an EventForm *****/
	const [addingEvent, setAddingEvent] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [settings, setSettings] = useState(false);

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
				<Dynamic retFunc={addEventPressHandler} pushServer={props.pushServer} username={props.username} />
			</View>
		</View>
		: null)

	function deleteItem(itemName) {
		let deleteStatement = "delete from dynamicTasks where taskname = '" + itemName + "'";
		props.pushServer(deleteStatement);
	}

	function handleDelete(itemName) {
		Alert.alert("Are you sure you want to delete " + itemName + "?",
			"This can't be undone.", [
			{ text: "Yes", onPress: () => { deleteItem(itemName) } },
			{ text: "Cancel" },
		]);
	}

	function finishTask(name) {
		let pushString = "update dynamicTasks set finished = 'true' where taskName = '" + name + "'";
		props.pushServer(pushString);
	}

	// list of tasks displayed to user
	let listview;
	const Item = ({ name, dueDate, dueTime, finished }) => (
		<View style={finished == 'false' ? styles.eventlistcontainer : styles.finishedcontainer}>
			<TouchableOpacity style={styles.checkarea} onPress={() => { finishTask(name) }}>
				<Text style={styles.check}>✓</Text>
			</TouchableOpacity>
			{finished == 'false' &&
				<View style={styles.deletearea}>
					<Text style={styles.delete} onPress={() => { handleDelete(name) }}>x</Text>
				</View>
			}
			<View style={styles.eventlistelement}>
				<Text style={styles.eventlisttext}>{name}</Text>
				<Text style={styles.eventlisttext2}>Due {dueDate} at {dueTime}</Text>
			</View>
		</View>
	);

	const renderItem = ({ item }) => (
		<Item name={item.taskname} dueDate={new Date(parseInt(item.deadline)).toDateString()}
			dueTime={new Date(parseInt(item.deadline)).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
			finished={item.finished} />
	);

	function handleRefresh() {
		//alert(props.username);
		setRefreshing(true);
		props.findTasks();
		setRefreshing(false);
	}

	function calculateSchedule() {
		props.pushServer("delete from scheduledTasks");
		let sched = schedule(props.static, props.tasks);
		var valueList = [];
		for (let i in sched) {
			let values = "('" + sched[i].dateString + "','" + sched[i].taskname + "','" + sched[i].startTime + "','" + sched[i].endTime + "','" + props.username + "')";
			valueList.push(values);
		}
		let insert = "insert into scheduledTasks(dateString,taskname,startTime,endTime,username) values ";
		props.pushServer(insert + valueList);
	}

	function activateSettings() {
		setSettings(true);
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
			<TouchableOpacity style={styles.emptyeventlistcontainer} onPress={handleRefresh}>
				<Text style={styles.emptyeventlisttext}>No tasks just yet. Tap the '+' button to add one, and tap here to refresh!</Text>
			</TouchableOpacity>
	}

	// Render settings or task list, depending on state
	const taskReturn = (settings ?
		<Settings setLoggedIn={props.setLoggedIn} setCorrect={props.setCorrect} pushServer={props.pushServer}
			setSettings={setSettings} />
		:
		<View style={styles.container} >
			<View style={styles.listheader}>
				<Text style={styles.listheadertext}>Tasks</Text>
				<TouchableOpacity style={styles.settings} onPress={() => activateSettings()}>
					<Image style={styles.settings} source={require('./assets/settings.png')} />
				</TouchableOpacity>
			</View>
			{listview}
			<View style={styles.buttonwrapper}>
				<TouchableOpacity onPress={() => { calculateSchedule() }}>
					<Image
						source={require('./assets/calculate-button.png')}
						style={styles.button}
					/>
				</TouchableOpacity>
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

	return taskReturn;
}

function Settings(props) {
	const tempDate = new Date(0);
	const [between, setBetween] = useState();
	const [maxLength, setMaxLength] = useState();
	const [avgLength, setAvgLength] = useState();
	const [sleepStart, setSleepStart] = useState(tempDate);
	const [sleepEnd, setSleepEnd] = useState(tempDate);
	const [settingTime, setSettingTime] = useState(false);
	const [SE, setSE] = useState(0);

	function logOut() {
		AsyncStorage.clear();
		props.setSettings(false);
		props.setLoggedIn(0);
		props.setCorrect(0);
	}

	function submit() {
		let update = "update users set sleep = '" + sleepStart.getTime() + "', wakeUp = '" + sleepEnd.getTime();
		update = update + "', avgLength = '" + avgLength + "', maxLength = '" + maxLength + "', delaySize = '" + between + "' where username = '" + props.username + "'";
		props.pushServer(update);
		props.setSettings(false);
	}

	function timePressHandler(val) {
		if (val == 1)
			setSE("sleepStart");
		else if (val == 2)
			setSE("sleepEnd");
		setSettingTime(!settingTime);
	}

	const onChange = (event, selectedDate) => {
		if (SE == "sleepStart")
			setSleepStart(selectedDate);
		else
			setSleepEnd(selectedDate);
	};

	var render_time = (settingTime ?
		<View>
			<DateTimePicker mode='time' style={styles.datepicker} value={SE == "sleepStart" ? sleepStart : sleepEnd}
				onChange={onChange}
				timeZoneOffsetInMinutes={0} display="inline" />
		</View>
		:
		null
	)

	return (
		<View style={styles.container}>
			<View >
				<View style={styles.settingsheader}>
					<Text style={styles.settingsheadertext}>Settings</Text>
					<TouchableOpacity onPress={logOut} style={styles.logout}>
						<Image source={require('./assets/logout.png')} style={styles.logout} />
					</TouchableOpacity>
				</View>
				<View style={styles.settingsarea}>
					<View style={styles.settingsentry}>
						<Text style={styles.settingstext} >Time to schedule between events</Text>
						<TextInput placeholder="Enter Minutes" style={styles.settingsinputtext} value={between}
							onChangeText={(text) => setBetween(text)} />
					</View>
					<View style={styles.settingsentry}>
						<Text style={styles.settingstext} >Average scheduled event length</Text>
						<TextInput placeholder="Enter Hours" style={styles.settingsinputtext} value={avgLength}
							onChangeText={(text) => setAvgLength(text)} />
					</View>
					<View style={styles.settingsentry}>
						<Text style={styles.settingstext} >Maximum scheduled event length</Text>
						<TextInput placeholder="Enter Hours" style={styles.settingsinputtext} value={maxLength}
							onChangeText={(text) => setMaxLength(text)} />
					</View>
					<View style={styles.sleepingentry}>
						<Text style={styles.settingstext} >Sleeping hours</Text>
						<View style={styles.settingsdates}>
							<TouchableOpacity onPress={() => timePressHandler(1)}>
								<Text style={styles.formtext} >
									{sleepStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}
								</Text>
							</TouchableOpacity>
							<Text style={styles.formtext}>     -     </Text>
							<TouchableOpacity onPress={() => timePressHandler(2)}>
								<Text style={styles.formtext} onPress={() => timePressHandler(2)} >
									{sleepEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					{render_time}
					<TouchableOpacity style={styles.loginsubmit} title="Submit" onPress={() => { submit() }}>
						<Text style={styles.loginsubmittext}>Update Settings</Text>
					</TouchableOpacity>
					<Button color='gray' title="Cancel" onPress={() => { props.setSettings(false) }} />
				</View>
			</View>
		</View>);
}

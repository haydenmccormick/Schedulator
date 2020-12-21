import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as FileSystem from 'expo-file-system';
import { DayView } from './Calendars.js';
import DynamicTaskList from './Dynamic.js';
import * as SQLite from 'expo-sqlite';
import { Image, LogBox } from 'react-native';
import styles from './assets/Styles.js';
import { useFonts, Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_900Black } from '@expo-google-fonts/roboto';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface'
import { AppLoading } from 'expo';
import Login from './Login.js';
import AsyncStorage from '@react-native-community/async-storage';

const addr = "http://localhost:8000/";

const Tab = createBottomTabNavigator();

FileSystem.downloadAsync(
	Expo.Asset.fromModule(require('./server/db.db')).uri,
	`${FileSystem.documentDirectory}SQLite/db.db`
);


const db = SQLite.openDatabase("db.db");

//tab bar style options
function options() {
	tabBarOptions: { showIcon: true }
	tabBarIcon: (() => {
		return (<Image
			style={{ width: 50, height: 50 }}
			source={{ url: "https://facebook.github.io/react/img/logo_og.png" }} />);
	}
	)
}

export default function App() {

	// In {Date: [{event1}, {event2}]} format for display on Agenda
	const [taskEntries, setTaskEntries] = useState([{}]);
	const [dateEntries, setDateEntries] = useState({});

	// In [{event1}, {event2}] format for scheduler/task list
	const [dynamicTasks, setDynamicTasks] = useState({});
	const [taskList, setTaskList] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [username, setUsername] = useState("");
	const [correct, setCorrect] = useState(0);
	const [loggedIn, setLoggedIn] = useState(0);
	const [userInfo, setUserInfo] = useState({});

	LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
	LogBox.ignoreAllLogs();//Ignore all log notifications


	// Load tasks to agenda on app startup
	if (!loaded) {
		if (loggedIn == 0) {
			AsyncStorage.getItem('loggedIn').then((value) => {
				if (value) {
					console.log(value);
					setUsername(value);
					setCorrect(2);
				}
			}
			);
			setLoggedIn(-1);
		}
		// initializeTasks();
		if (correct == 2) {
			findTasks();
			setLoaded(true);
		}
	}
	// Load in expo google fonts
	let [fontsLoaded] = useFonts({
		Roboto_100Thin,
		Roboto_300Light,
		Roboto_400Regular,
		Roboto_900Black,
		AbrilFatface_400Regular
	});
	// If it's not loaded in time, make the user wait
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	function getTaskInfo(tasks) {
		const tempTasks = {};
		const tempDates = {};
		const tempList = [];
		var parsed = tasks;
		for (var i in parsed) {
			//alert(JSON.stringify(parsed[i]));
			if (parsed[i].username == username) {
				console.log(parsed[i]);
				if (parsed[i].type == 'static')
					tempList.push(parsed[i]);
				newTask = {
					name: parsed[i].taskname,
					date: parsed[i].dateString,
					startTime: parsed[i].startTime,
					endTime: parsed[i].endTime,
					type: parsed[i].type
				};
				newDate = { marked: true };
				if (tempTasks[parsed[i].dateString]) {
					tempTasks[parsed[i].dateString].push(newTask);
				}
				else {
					tempTasks[parsed[i].dateString] = [newTask];
					tempDates[parsed[i].dateString] = newDate;
				}
			}
		}
		setTaskEntries(tempTasks);
		setDateEntries(tempDates);
		setTaskList(tempList);
	}

	function getDynamicInfo(tasks) {
		const tempDynamic = [];
		for (var i in tasks) {
			if (tasks[i].username == username)
				tempDynamic.push(tasks[i]);
		}
		setDynamicTasks(tempDynamic);
	}

	async function pushServer(command) {
		var body = new FormData();
		body.append('text', command);
		var xhr = new XMLHttpRequest();
		xhr.open('PUT', addr);
		xhr.send(body);
		findTasks();
	}

	async function findTasks() {
		getTaskInfo(require('./server/all.json'));
		getDynamicInfo(require('./server/dynamicTasks.json'));
		getUserInfo(require('./server/users.json'));
	}

	function getUserInfo(info) {
		var tempUser = {};
		for (var i in info) {
			if (info[i].username == username) {
				tempUser = info[i];
			}
		}
		setUserInfo(tempUser);
	}

	// State functions passed down to children

	function gettaskEntries() {
		return taskEntries;
	}
	function getDynamicTaskEntries() {
		return dynamicTasks;
	}
	function setCorrectState(val) {
		setCorrect(val);
	}
	function setUsernameState(val) {
		setUsername(val);
	}
	function setLoggedInState(val) {
		setLoggedIn(val);
	}
	if (correct != 2) {
		return <Login correct={correct} setCorrect={setCorrectState} pushServer={pushServer} setUsername={setUsernameState} findTasks={findTasks} />
	}
	else {
		return (
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={options}
				>
					<Tab.Screen name="Agenda" children={() => <DayView findTasks={findTasks} tasks={gettaskEntries()}
						pushServer={pushServer} username={username} />}
						options={{
							tabBarIcon: ({ color }) => (
								<Image
									style={styles.icon}
									source={require('./assets/Tab_Icons/agenda-on.png')} />
							),
						}}
					/>
					<Tab.Screen name="Tasks" children={() => <DynamicTaskList findTasks={findTasks} tasks={getDynamicTaskEntries()}
						username={username} pushServer={pushServer} static={taskList} setCorrect={setCorrectState} setLoggedIn={setLoggedInState}
						userInfo={userInfo} />}
						options={{
							tabBarIcon: ({ color }) => (
								<Image
									style={styles.icon}
									source={require('./assets/Tab_Icons/tasks-on.png')} />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}

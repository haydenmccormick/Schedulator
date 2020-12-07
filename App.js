import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as FileSystem from 'expo-file-system';
import { DayView } from './Calendars.js';
import DynamicTaskList from './Dynamic.js';
import * as SQLite from 'expo-sqlite';
import { Image } from 'react-native';
import styles from './assets/Styles.js';
import { useFonts, Roboto_100Thin, Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface'
import { AppLoading } from 'expo';
import loadLocalResource from 'react-native-local-resource'
//import RNBackgroundDownloader from 'react-native-background-downloader';

const addr = "http://192.168.86.45:8000/";

const Tab = createBottomTabNavigator();

FileSystem.downloadAsync(
	Expo.Asset.fromModule(require('./server/db.db')).uri,
	`${FileSystem.documentDirectory}SQLite/db.db`
);


const db = SQLite.openDatabase("db.db");

//tab bar style options
function options() {
	console
	tabBarOptions: { showIcon: true }
	tabBarIcon: (() => {
		return (<Image
			style={{ width: 50, height: 50 }}
			source={{ url: "https://facebook.github.io/react/img/logo_og.png" }} />);
	}
	)
}

export default function App() {

	const [taskEntries, setTaskEntries] = useState([{}]);
	const [dateEntries, setDateEntries] = useState({});
	const [dynamicTasks, setDynamicTasks] = useState({});
	const [loaded, setLoaded] = useState(false);

	// Load tasks to agenda on app startup
	if (!loaded) {
		findTasks();
		setLoaded(true);
	}
	// Load in expo google fonts
	let [fontsLoaded] = useFonts({
		Roboto_100Thin,
		Roboto_300Light,
		Roboto_400Regular,
		AbrilFatface_400Regular
	});
	// If it's not loaded in time, make the user wait
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	function getTaskInfo(tasks) {
		const tempTasks = {};
		const tempDates = {};
		const tempDynamic = [];
		var parsed = JSON.parse(tasks);
		for (var i in parsed) {
			if (parsed[i].type == 'dynamic') {
				tempDynamic.push(parsed[i]);
			}
			newTask = {
				name: parsed[i].taskname,
				date: parsed[i].dateString,
				startTime: parsed[i].startTime,
				endTime: parsed[i].endTime,
				type: parsed[i].type
			};
			newDate = { marked: true };
			console.log(newTask);
			if (tempTasks[parsed[i].dateString]) {
				tempTasks[parsed[i].dateString].push(newTask);
			}
			else {
				tempTasks[parsed[i].dateString] = [newTask];
				tempDates[parsed[i].dateString] = newDate;
			}
		}
		setTaskEntries(tempTasks);
		setDateEntries(tempDates);
		setDynamicTasks(tempDynamic);
		console.log(dynamicTasks);
	}


	function findTasks() {
		var xhr = new XMLHttpRequest();
		xhr.onload = function (e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					getTaskInfo(xhr.responseText);
				} else {
					console.error(xhr.statusText);
					return <AppLoading />;
				}
			}
		};
		xhr.onerror = function (e) {
			console.error(xhr.statusText);
		};
		xhr.open("GET", addr + "all.json", true);
		xhr.send(null);
	}

	function gettaskEntries() {
		return taskEntries;
	}
	function getDynamicTaskEntries() {
		return dynamicTasks;
	}

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={options}
			>
				<Tab.Screen name="Agenda" children={() => <DayView findTasks={findTasks} tasks={gettaskEntries()} />}
					options={{
						tabBarIcon: ({ color }) => (
							<Image
								style={styles.icon}
								source={require('./assets/Tab_Icons/agenda-on.png')
								} />
						),
					}}
				/>
				<Tab.Screen name="Tasks" children={() => <DynamicTaskList findTasks={findTasks} tasks={getDynamicTaskEntries()} />}
					options={{
						tabBarIcon: ({ color }) => (
							<Image
								style={styles.icon}
								source={require('./assets/Tab_Icons/tasks-on.png')
								} />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as FileSystem from 'expo-file-system';
import { DayView } from './Calendars.js';
import DynamicTaskList from './Dynamic.js';
import * as SQLite from 'expo-sqlite';
import { Image,Text,View,ScrollView,TextInput,Button } from 'react-native';
import styles from './assets/Styles.js';
import { useFonts, Roboto_100Thin, Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface'
import { AppLoading } from 'expo';
import loadLocalResource from 'react-native-local-resource'
import schedule from './Scheduler.js';
import bcrypt from 'react-native-bcrypt'
//import RNBackgroundDownloader from 'react-native-background-downloader';

const addr = "http://192.168.86.27:8000/";

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
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [correct, setCorrect] = useState(0);
    const [passwordChecked, setPasswordChecked] = useState("");

    // Load tasks to agenda on app startup
    if (!loaded) {
	// initializeTasks();
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
	const tempList = [];
	var parsed = tasks;
	for (var i in parsed) {
	    //alert(JSON.stringify(parsed[i]));
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
	setTaskEntries(tempTasks);
	setDateEntries(tempDates);
	setTaskList(tempList);
    }

    function getDynamicInfo(tasks) {
	const tempDynamic = [];
	for (var i in tasks) {
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
	schedule(taskList, dynamicTasks);

    }

    function gettaskEntries() {
	return taskEntries;
    }
    function getDynamicTaskEntries() {
	return dynamicTasks;
    }

    //const cred = ["mk","pass"];
    let content;
    //let correct = 0;
    function checkCreds() {
	let parsed = require('./server/users.json');
	//alert(password);
	for (var i in parsed) {
	    //alert(passwordChecked);
	    if(parsed[i].username == username) {
		bcrypt.compare(password, parsed[i].password, function(err, res) {setPasswordChecked(res) });
		//alert(passwordChecked);
		if(passwordChecked) setCorrect(2);
	    }
	}
    }
    function getUsername() {
	return username;
    }
    var salt = bcrypt.genSaltSync(10);
    function createAccount() {
	if (username == "" || password == "") alert("Username and password cannot be empty");
	else if(password != password2) alert("Passwords must be the same");
	else {
	    let hash = bcrypt.hashSync(password, salt);
	    pushServer("insert into users(username,password) values('" + username + "','" + hash + "')");
	    //alert(hash);
	    //bcrypt.compare(password, hash, function(err, res) {alert(res) });
	    //alert(typeof hash);
	    setCorrect(2);
	}
    }
    if (correct == 0) {
	content = <ScrollView style={{padding:30}}>
	    <Button title="Click here to sign up" onPress={()=>{setCorrect(1)}}/>
	    <Text>Enter username:</Text>
	    <TextInput style={styles.input} value={username} type="text" onChangeText={(text) => setUsername(text)}/>
	    <Text>Password:</Text>
	    <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={(text) => setPassword(text)} />
	    <Button title="Submit" onPress={()=>{checkCreds()}}/>
	    </ScrollView>;
    }
    else if(correct == 1) {
	content = <ScrollView style={{padding:30}}>
	    <Button title="Click here to log in" onPress={()=>{setCorrect(0)}}/>
	    <Text>Enter username:</Text>
	    <TextInput style={styles.input} value={username} type="text" onChangeText={(text) => setUsername(text)}/>
	    <Text>Password:</Text>
	    <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={(text) => setPassword(text)} />
	    <Text>Enter password again:</Text>
	    <TextInput secureTextEntry={true} style={styles.input} value={password2} onChangeText={(text) => setPassword2(text)} />
	    <Button title="Create account" onPress={()=>{createAccount()}}/>
	    </ScrollView>;
    }
    else{
	content = <Tab.Navigator
	screenOptions={options}
	    >
	    <Tab.Screen name="Agenda" children={() => <DayView findTasks={findTasks} tasks={gettaskEntries()}
						pushServer={pushServer} getUsername={getUsername()} />}
	options={{
	    tabBarIcon: ({ color }) => (
		    <Image
		style={styles.icon}
		source={require('./assets/Tab_Icons/agenda-on.png')
		       } />
	    ),
	}}
	    />
	    <Tab.Screen name="Tasks" children={() => <DynamicTaskList findTasks={findTasks} tasks={getDynamicTaskEntries()} getUsername={getUsername()}
					       pushServer={pushServer} static={taskList} />}
	options={{
	    tabBarIcon: ({ color }) => (
		    <Image
		style={styles.icon}
		source={require('./assets/Tab_Icons/tasks-on.png')
		       } />
	    ),
	}}
	    />
	    </Tab.Navigator>;
    }
    return (
	    <NavigationContainer>
	    {content}
	</NavigationContainer>
    );
}

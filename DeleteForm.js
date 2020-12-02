import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, CheckBox } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';
import styles from "./assets/Styles.js"
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

// Static Form Component

function DeleteStaticTasks(props) {
    //Remember to clear form
    const [input, setInput] = useState("");
    function check() {
	if (input == "") {
	    return 0;
	}
	return 1;
    }
    function notFilled() {
	alert("Fill in the taskname to remove the task");
    }
    function submit() {
	/*
	let values = "('" + input + "'" + ",'" + count + "','" + Hours + ":" + Minutes + "','" + Hours2 + ':' + Minutes2 + "')";
	//Add stuff to database
	//insert into tasks(taskname,date,startTime,endTime) values ('e','f','g','h'')
	db.transaction(tx => {
	    tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
	    tx.executeSql(
		"select * from tasks",
		[],
		(_, { rows: { _array } }) => alert(JSON.stringify(_array))
	    );
	});
	*/
	alert(1);
	props.retFunc();
    }
    let button;
    if (check()) {
	button = <Button onPress={() => {submit();setInput("");}} title="Submit" />;
    }
    else {
	button = <Button onPress={() => { notFilled() }} title="Submit" />;
    }
    return (
	<ScrollView style={styles.form}>
	    <Text>Enter task name</Text>
	    <View>
		<TextInput style={styles.input} name="taskname" type="text" value={input} onChangeText={(text) => setInput(text)} />
	    </View>
	    {button}
	</ScrollView>
    );
}

function DeleteDynamicTasks(props) {
    //Remember to clear form
    const [input, setInput] = useState("");
    function check() {
	if (input == "") {
	    return 0;
	}
	return 1;
    }
    function notFilled() {
	alert("Fill in the taskname to remove the task");
    }
    function submit() {
	/*
	let values = "('" + input + "'" + ",'" + count + "','" + Hours + ":" + Minutes + "','" + Hours2 + ':' + Minutes2 + "')";
	//Add stuff to database
	//insert into tasks(taskname,date,startTime,endTime) values ('e','f','g','h'')
	db.transaction(tx => {
	    tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
	    tx.executeSql(
		"select * from tasks",
		[],
		(_, { rows: { _array } }) => alert(JSON.stringify(_array))
	    );
	});
	*/
	alert(1);
	props.retFunc();
    }
    let button;
    if (check()) {
	button = <Button onPress={() => {submit();setInput("");}} title="Submit" />;
    }
    else {
	button = <Button onPress={() => { notFilled() }} title="Submit" />;
    }
    return (
	<ScrollView style={styles.form}>
	    <Text>Enter task name</Text>
	    <View>
		<TextInput style={styles.input} name="taskname" type="text" value={input} onChangeText={(text) => setInput(text)} />
	    </View>
	    {button}
	</ScrollView>
    );
}


module.exports = {
    DeleteStaticTasks: DeleteStaticTasks,
    DeleteDynamicTasks: DeleteDynamicTasks
}

import { View, Text, Dimensions } from 'react-native';
import styles from './assets/Styles';
import * as SQLite from 'expo-sqlite';
import { TableView } from "react-native-responsive-table"
import React, { useState } from 'react';
import RadioButton from "react-native-animated-radio-button";

const db = SQLite.openDatabase("db.db");


export default function TaskList() {
    const [tasks, setTasks] = useState("");
	function showTasks() {
	const tempDates={};
	db.transaction(tx => {
		tx.executeSql(
		"select * from tasks",
		[],
		(_, { rows: { _array } }) => setTasks(_array)
	    );
	});
	}
	let tableview;
    if (tasks != "") {
	//horizontalScroll={true} columnWidth={50} height={150}
	tableview = <TableView width={Math.round(Dimensions.get('window').width)} horizontalScroll={true}
	columnWidth={Math.round(Dimensions.get('window').width)/5}
	    headers={[
		{
		    name: "Taskname",
		    reference_key: "taskname",
		},
		{
		    name: "Date",
		    reference_key: "date",
		},
		{
		    name: "Start Time",
		    reference_key: "startTime",
		},
		{
		    name: "End Time",
		    reference_key: "endTime",
		},
	    ]}
	    rows={tasks}
	/>;
    }
    else {
	tableview = <Text>When you add a task, it will be displayed here</Text>
    }
    //Change the style for the button
    return (
	    <View style={{padding: 30}}>
	    {tableview}
	    <RadioButton disableText={true} disableBuiltinStateManagement={true} onPress={showTasks}
/>
	    </View>
    );
}

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars'
import { TableView } from "react-native-responsive-table"
import { Form, Dynamic } from './EventForm.js'
import { DeleteStaticTasks } from './DeleteForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';

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

    /***** Executed on "Add" button press, renders an EventForm *****/
    const [addingEvent, setAddingEvent] = useState(false);
    const addEventPressHandler = () => {
	showTasks();
	setAddingEvent(!addingEvent);
    };
    // Only render a form if the user is adding an event
    const render_form = (addingEvent ?
	<View style={styles.formwrapper}>
	    {/* So the user can click outside of form box to cancel*/}
	    <TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} />
	    <View style={styles.formcontainer}>
		<Form retFunc={addEventPressHandler}/>
	    </View>
	</View>
	: null)
    let tableview;
    if (tasks != "") {
	//horizontalScroll={true} columnWidth={50} height={150}
	tableview = <TableView
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
    return (
	<View style={styles.container} >
	    <View style={{height:100,padding:30}}>{tableview}</View>
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

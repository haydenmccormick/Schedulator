import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Table, Text, Button, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars'
import * as SQLite from 'expo-sqlite';
import {TableView} from "react-native-responsive-table"
import * as FileSystem from 'expo-file-system';

import { Form, Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
FileSystem.downloadAsync(
    Expo.Asset.fromModule(require('./db.db')).uri,
    `${FileSystem.documentDirectory}SQLite/db.db`
  );
  const db = SQLite.openDatabase("db.db");

// Main render method
export default function App() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const string = d.getFullYear() + '-' + month + '-' + d.getDate();
    const [selected, setSelected] = useState(string);
    const [tasks, setTasks] = useState("");
    const [tasks2, setTasks2] = useState("");
  const onDayPress = (day) => {
    setSelected(day.dateString);
    alert(day.dateString);
  };

  /***** Executed on "Add" button press, renders an EventForm *****/
  const [addingEvent, setAddingEvent] = useState(false);
  const addEventPressHandler = () => {
    setAddingEvent(!addingEvent);
  };
  // Only render a form if the user is adding an event
  const render_form = (addingEvent ?
    <View style={styles.formwrapper}>
      {/* So the user can click outside of form box to cancel*/}
      <TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} />
      <View style={styles.formcontainer}>
	<Form />
      </View>
    </View>
    : null)
    function showTasks() {
	db.transaction(tx => {
	    //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
	    tx.executeSql(
		"select * from tasks",
		[],
		(_, { rows: { _array } }) => setTasks(_array)
	    );
	});
	setTasks2(JSON.stringify(tasks));
    }
    let tableview;
    if(tasks != "") {
	tableview =	  <TableView horizontalScroll={true} columnWidth={70}
      headers={[
	{
	    name:"Taskname",
	    reference_key:"taskname",
	},
	{
	    name:"Date",
	    reference_key:"date",
	},
	{
	    name:"Start Time",
	    reference_key:"startTime",
	},
	  {
	      name:"End Time",
	      reference_key:"endTime",
	  },
      ]}
      rows={tasks}
	    />;
    }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.calendararea}>
	<Calendar
	  onDayPress={onDayPress}
	  markedDates={{
	    [selected]: {
	      selected: true,
	      disableTouchEvent: true,
	      selectedColor: 'lightblue',
	      selectedTextColor: 'black',
	    },
	  }}
	  />
	  <Button title="Click to show tasks" onPress={() => showTasks()} />
	  {tableview}
      </ScrollView>
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
    </SafeAreaView>
  );
}

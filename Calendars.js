import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars'
import {TableView} from "react-native-responsive-table"
import { Form, Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

function MonthView() {
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
    let tableview;
    if(tasks != "") {
	tableview =	  <TableView horizontalScroll={true} columnWidth={50}
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
    <View style={styles.container}>
      <View style={styles.calendararea}>
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

      </View>
	  <View>{tableview}</View>
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

function DayView() {
    return (
	    <Agenda />

    );
}

module.exports = {
    MonthView: MonthView,
    DayView: DayView,
  }

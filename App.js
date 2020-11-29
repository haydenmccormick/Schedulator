import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars'
import Form from './EventForm.js'
import styles from './assets/Styles.js'

//const db = SQLite.openDatabase("db.db");

// Main render method
export default function App() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const string = d.getFullYear() + '-' + month + '-' + d.getDate();
  const [selected, setSelected] = useState(string);
  const [addingEvent, setAddingEvent] = useState(false);
  const onDayPress = (day) => {
    setSelected(day.dateString);
    alert(day.dateString);
  };
  const addEventPressHandler = () => {
    setAddingEvent(!addingEvent);
  };
  const render_form = (addingEvent ?
    <View style={styles.formwrapper}>
      <TouchableOpacity style={styles.formwrapper} onPress={addEventPressHandler} />
      <View style={styles.formcontainer}>
        <Form />
      </View>
    </View>
    : null)

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
      </View>
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



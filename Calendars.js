import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars'

import { Form, Dynamic } from './EventForm.js'
import styles from './assets/Styles.js'


function MonthView() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const string = d.getFullYear() + '-' + month + '-' + d.getDate();
  const [selected, setSelected] = useState(string);
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

function DayView() {
    return (
        <Agenda />
    );
}

module.exports = {
    MonthView: MonthView,
    DayView: DayView,
  }
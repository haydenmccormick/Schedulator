import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import { Calendar } from 'react-native-calendars'

// Main render method
export default function App() {

  const [value, setValue] = useState(new Date());
  function onChange(nextValue) {
    setValue(nextValue);
  }
  return (
    <View style={styles.container}>
      <View style={styles.calendararea}>
        <Text style={styles.title}>Basic Calendar</Text>
        <Calendar onChange={onChange} value={value} />
      </View>
      <View style={styles.inputarea}>
        <Text style={styles.subtitle}>Create an Event</Text>
        <Form />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

/*
function Event(props) {
  return (
    <View>
      <Text>{props.nunberOfGuests}</Text>
      <Text>{props.isGoing}</Text>
    </View>
  );
}
*/

// Form for adding events
function Form(props) {
  const [isGoing, setIsGoing] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  //const [Events, addEvent] = useState([]);

  // TODO: add event class/function and a handler to store event information

  return (
    <View>
      <TextInput
        style={styles.input}
        type="outlined"
        placeholder="Number of Guests"
        name="numberOfGuests" type="text"
        onChangeText={numberOfGuests => setNumberOfGuests(numberOfGuests)}
      />
      <View style={styles.going} >
        <Text>Going?</Text>
        <Switch
          value={isGoing}
          onValueChange={isGoing => setIsGoing(isGoing => !isGoing)}
        />
      </View>
      <Button
        title="Add Event"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  calendararea: {
    flex: 1.5,
    justifyContent: 'flex-end',
    marginBottom: 15,
    width: "80%",
  },
  inputarea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  going: {
    alignItems: 'center',
    marginVertical: 15,
  },
  input: {
    textAlign: 'center',
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: 'skyblue',
    borderWidth: 2,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    paddingBottom: 15,
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 15,
    borderBottomWidth: 1.5,
  },
});

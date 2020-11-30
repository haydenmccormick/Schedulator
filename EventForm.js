import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';
import styles from "./assets/Styles.js"
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';


// Database integration
FileSystem.downloadAsync(
    Expo.Asset.fromModule(require('./db.db')).uri,
    `${FileSystem.documentDirectory}SQLite/db.db`
  );
  const db = SQLite.openDatabase("db.db");

// Static Form Component

function Form(props) {
    //Remember to clear form
    const [input, setInput] = useState("");
    const [count, setCount] = useState("");
    const [Hours, setHours] = useState("");
    const [Minutes, setMinutes] = useState("");
    const [Hours2, setHours2] = useState("");
    const [Minutes2, setMinutes2] = useState("");
    function fixMinutes(minutes) {
        if (String(minutes).length == 1) {
            return '0' + minutes;
        }
        else return minutes;
    }
    function check() {
        if (input == "" || count == "" || Hours == "" || Minutes == "" || Hours2 == "" || Minutes2 == "") {
            return 0;
        }
        return 1;
    }
    function notFilled() {
        alert("Fill in all the fields to add the task");
    }
    function submit() {
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

        //alert("Adding task");
    }
    let button;
    if (check()) {
        button = <Button onPress={() => {
            submit();
            setInput(""); setCount("");
            setHours(""); setMinutes("");
            setHours2(""); setMinutes2("");
        }} title="Submit" />;
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
            <Text>Enter date</Text>
            <View>
                <DatePicker placeholder={count} onDateChange={(date) => setCount(date)} />
            </View>
            <Text>Enter start time</Text>
            <Text>{Hours}:{Minutes}</Text>
            <View>
                <TimePicker selectedHours={Hours} selectedMinutes={Minutes}
                    onChange={(hours, minutes) => { setHours(hours); setMinutes(fixMinutes(minutes)) }} />
            </View>
            <Text>Enter end time</Text>
            <Text>{Hours2}:{Minutes2}</Text>
            <View>
                <TimePicker selectedHours={Hours2} selectedMinutes={Minutes2}
                    onChange={(hours, minutes) => { setHours2(hours); setMinutes2(fixMinutes(minutes)) }} />
            </View>
            {button}
        </ScrollView>
    );
}

// Dynamic form component

function Dynamic(props) {
    //Remember to clear form
    //insert into dynamicTasks(taskname,date,endTime,period,split) values ('a','b','c','d','e');
    const [input, setInput] = useState("");
    const [count, setCount] = useState("");
    const [Hours, setHours] = useState("");
    const [Minutes, setMinutes] = useState("");
    const [Hours2, setHours2] = useState("");
    const [Minutes2, setMinutes2] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(true);
    function fixMinutes(minutes) {
        if (String(minutes).length == 1) {
            return '0' + minutes;
        }
        else return minutes;
    }
    function check() {
        if (input == "" || count == "" || Hours == "" || Minutes == "" || Hours2 == "" || Minutes2 == "") {
            return 0;
        }
        return 1;
    }
    function notFilled() {
        alert("Fill in all the fields to add the task");
    }
    function submit() {
        let values = "('" + input + "'" + ",'" + count + "','" + Hours + ":" + Minutes + "','" + Hours2 + ':' +
            Minutes2 + "','" + toggleCheckBox + "')";
        //Add stuff to database
        //insert into tasks(taskname,date,startTime,endTime) values ('e','f','g','h'')
        db.transaction(tx => {
            tx.executeSql("insert into dynamicTasks(taskname,date,endTime,period,split) values" + values, []);
            tx.executeSql(
                "select * from dynamicTasks",
                [],
                (_, { rows: { _array } }) => alert(JSON.stringify(_array))
            );
        });
        alert(values);
    }
    let button;
    if (check()) {
        button = <Button onPress={() => {
            submit();
            setInput(""); setCount("");
            setHours(""); setMinutes("");
            setHours2(""); setMinutes2("");
        }} title="Submit" />;
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
            <Text>Enter date</Text>
            <View>
                <DatePicker placeholder={count} onDateChange={(date) => setCount(date)} />
            </View>
            <Text>Enter deadline time</Text>
            <Text>{Hours}:{Minutes}</Text>
            <View>
                <TimePicker selectedHours={Hours} selectedMinutes={Minutes}
                    onChange={(hours, minutes) => { setHours(hours); setMinutes(fixMinutes(minutes)) }} />
            </View>
            <Text>Enter the amount of time it taskes to get done</Text>
            <Text>{Hours2}:{Minutes2}</Text>
            <View>
                <TimePicker selectedHours={Hours2} selectedMinutes={Minutes2}
                    onChange={(hours, minutes) => { setHours2(hours); setMinutes2(fixMinutes(minutes)) }} />
            </View>
            <Text>Splitable</Text>
            <CheckBox disabled={false} value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)} />
            {button}
        </ScrollView>
    );
}

module.exports = {
    Form: Form,
    Dynamic: Dynamic
}
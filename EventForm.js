import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';
import styles from "./assets/Styles.js"

// Form for adding events
function Form() {
    //Remember to clear form
    const [input, setInput] = useState("");
    const [count, setCount] = useState("");
    const [Hours, setHours] = useState("");
    const [Minutes, setMinutes] = useState("");
    const [Hours2, setHours2] = useState("");
    const [Minutes2, setMinutes2] = useState("");
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
        //Add stuff to database
        alert("Adding task");
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
                    onChange={(hours, minutes) => { setHours(hours); setMinutes(minutes) }} />
            </View>
            <Text>Enter end time</Text>
            <Text>{Hours2}:{Minutes2}</Text>
            <View>
                <TimePicker selectedHours={Hours2} selectedMinutes={Minutes2}
                    onChange={(hours, minutes) => { setHours2(hours); setMinutes2(minutes) }} />
            </View>
            {button}
        </ScrollView>
    );
}

export default Form;
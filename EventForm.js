import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, Image, Switch, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./assets/Styles.js"
import * as SQLite from 'expo-sqlite';

const addr = "http://192.168.0.4:8000/";

// Database integration
const db = SQLite.openDatabase("db.db");

// Static Form Component

function Form(props) {
	let tempDate = new Date(Date.now());
	const [input, setInput] = useState("");
	const [start, setStart] = useState(tempDate);
	const [end, setEnd] = useState(tempDate);
	const [form, setForm] = useState('');
	const [SE, setSE] = useState();

	function check() {
		if (input == "") {
			return 0;
		}
		return 1;
	}
	function notFilled() {
		alert("Fill in all the fields to add the task");
	}
	function submit() {
		let datestring = start.toISOString().split('T')[0];
		let insert = "insert into tasks(taskname,date,startTime,endTime,dateString) values ";
		let values = "('" + input + "','" + start.getTime() + "','" + start.getTime() + "','" + end.getTime() + "','" + datestring + "')";
		db.transaction(tx => {
			tx.executeSql(insert + values, []);
		});
		props.pushServer(insert + values);
		props.retFunc();
	}
	const datePressHandler = () => {
		if (form == '')
			setForm("date");
		else
			setForm("");
		setSE('start');
	}
	const timePressHandler = (val) => {
		if (form == '')
			setForm("time");
		else
			setForm("");
		setSE(val == 1 ? 'start' : 'end');
	}
	const onChange = (event, selectedDate) => {
		const newDate = selectedDate || start;
		SE == 'start' ? setStart(newDate) : setEnd(newDate);
	};
	const formItem = (
		<DateTimePicker mode={form} style={styles.datepicker} value={SE == 'start' ? start : end} onChange={onChange} />
	);
	let render_form = null;
	if (Platform.OS == 'ios') {
		render_form = (form != '' ?
			<View>
				<Image source={require('./assets/FormTop.png')} style={styles.formtop} />
				<View style={styles.form2}>
					{formItem}
				</View>
			</View>
			: null);
	}
	else {
		render_form = (form != '' ?
			<View>
				{formItem}
			</View>
			: null);
	}
	let button;
	if (check()) {
		button = <Button onPress={() => {
			submit();
			setInput("");
		}} title="Submit" />;
	}
	else {
		button = <Button onPress={() => { notFilled() }} title="Submit" />;
	}
	return (
		<View>
			<ScrollView style={styles.form}>
				<TextInput style={styles.input} multiline placeholder="Title" name="taskname"
					type="text" value={input} onChangeText={(text) => setInput(text)}
					selectionColor={'#70d3f4'}
				/>
				<View style={styles.enterdate}>
					<Text style={styles.formtext}>Date</Text>
					<Text style={styles.formtext} onPress={(form) => datePressHandler()} >
						{start.toDateString()}
					</Text>
				</View>
				<View style={styles.enterdate}>
					<Text style={styles.formtext}>Start Time</Text>
					<Text style={styles.formtext} onPress={(form) => timePressHandler(1)} >
						{start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
					</Text>
				</View>
				<View style={[styles.enterdate, { marginBottom: 20 }]}>
					<Text style={styles.formtext}>End Time</Text>
					<Text style={styles.formtext} onPress={(form) => timePressHandler(2)} >
						{end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
					</Text>
				</View>
				{button}
			</ScrollView >
			{render_form}
		</View>
	);
}

// Dynamic form component

function Dynamic(props) {
	//Remember to clear form
	//insert into dynamicTasks(taskname,date,endTime,period,split) values ('a','b','c','d','e');
	let tempDate = new Date(Date.now());
	const [input, setInput] = useState("");
	const [start, setStart] = useState(tempDate);
	const [end, setEnd] = useState(tempDate);
	const [form, setForm] = useState('');
	const [toggleCheckBox, setToggleCheckBox] = useState(true);
	const [period, setPeriod] = useState();

	function check() {
		if (input == "") {
			return 0;
		}
		return 1;
	}
	function notFilled() {
		alert("Fill in all the fields to add the task");
	}
	function submit() {
		let datestring = start.toISOString().split('T')[0];
		let values = "('" + input + "','" + end + "','" + end.getTime() + "','" + end.getTime() + "','" + period + "','" + datestring + "')";
		let insert = "insert into dynamicTasks(taskname,date,deadline,split,period, dateString) values";
		//alert(values);
		//Add stuff to database
		//insert into tasks(taskname,date,startTime,endTime) values ('e','f','g','h'')
		db.transaction(tx => {
			tx.executeSql(insert + values, []);
		});
		props.pushServer(insert + values);
		props.retFunc();
	}
	let button;
	const datePressHandler = () => {
		if (form == '')
			setForm("date");
		else
			setForm("");
	}
	const timePressHandler = (val) => {
		if (form == '')
			setForm("time");
		else
			setForm("");
	}
	const onChange = (event, selectedDate) => {
		const newDate = selectedDate || start;
		setEnd(newDate);
	};
	let render_form = null;
	if (Platform.OS == 'ios') {
		render_form = (form != '' ?
			<View>
				<Image source={require('./assets/FormTop.png')} style={styles.formtop} />
				<View style={styles.form2}>
					<DateTimePicker mode={form} style={styles.datepicker} value={end} onChange={onChange} />
				</View>
			</View>
			: null);
	}
	else {
		render_form = (form != '' ?
			<View>
				<DateTimePicker mode={form} style={styles.datepicker} value={end} onChange={onChange} />
			</View>
			: null);
	}
	if (check()) {
		button = <Button onPress={() => {
			submit();
			setInput("");
		}} title="Submit" />;
	}
	else {
		button = <Button onPress={() => { notFilled() }} title="Submit" />;
	}
	return (
		<View>
			<ScrollView style={styles.form}>
				<TextInput style={styles.input} multiline placeholder="Title" name="taskname"
					type="text" value={input} onChangeText={(text) => setInput(text)}
					selectionColor={'#70d3f4'}
				/>
				<View style={styles.enterdate}>
					<Text style={styles.formtext}>Date Due</Text>
					<Text style={styles.formtext} onPress={(form) => datePressHandler()} >
						{end.toDateString()}
					</Text>
				</View>
				<View style={styles.enterdate}>
					<Text style={styles.formtext}>Deadline</Text>
					<Text style={styles.formtext} onPress={(form) => timePressHandler(1)} >
						{end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
					</Text>
				</View>
				<View style={styles.period}>
					<Text style={styles.formtext}>About how long will it take?</Text>
					<View style={styles.forminput}>
						<TextInput style={styles.input2} multiline placeholder="Enter Number" name="period"
							type="text" value={period} onChangeText={(text) => setPeriod(text)}
							selectionColor={'#70d3f4'}
						/>
						<Text style={styles.input}> hours</Text>
					</View>
				</View>
				<View style={[styles.enterdate, { marginBottom: 20 }]}>
					<Text style={styles.formtext}>Splitable?</Text>
					<Switch value={toggleCheckBox} onValueChange={() => { setToggleCheckBox(!toggleCheckBox) }} />
				</View>
				{button}
			</ScrollView >
			{render_form}
		</View>
	);
} {/*
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
}*/}

module.exports = {
	Form: Form,
	Dynamic: Dynamic
}

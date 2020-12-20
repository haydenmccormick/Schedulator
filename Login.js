import React, { useState } from 'react';
import { Text, ScrollView, TextInput, Button } from 'react-native';
import styles from './assets/Styles.js';
import bcrypt from 'react-native-bcrypt'

// LOGIN SCREEN //

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordChecked, setPasswordChecked] = useState("");
    const [correct, setCorrectStatus] = useState("");

    function setCorrect(val) {
        props.setCorrect(val);
        setCorrectStatus(val);
    }

    let content;
    function checkCreds() {
        let parsed = require('./server/users.json');
        for (var i in parsed) {
            if (parsed[i].username == username) {
                bcrypt.compare(password, parsed[i].password, function (err, res) { setPasswordChecked(res) });
                if (passwordChecked) {
                    props.setCorrect(2);
                    props.setUsername(username);
                };
            }
        }
    }
    var salt = bcrypt.genSaltSync(10);
    function createAccount() {
        if (username == "" || password == "") alert("Username and password cannot be empty");
        else if (password != password2) alert("Passwords must be the same");
        else {
            let hash = bcrypt.hashSync(password, salt);
            props.pushServer("insert into users(username,password) values('" + username + "','" + hash + "')");
            setCorrect(2);
        }
    }
    if (correct == 0) {
        content = <ScrollView style={{ padding: 30 }}>
            <Button title="Click here to sign up" onPress={() => { setCorrect(1) }} />
            <Text>Enter username:</Text>
            <TextInput style={styles.input} value={username} type="text" onChangeText={(text) => setUsername(text)} />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={(text) => setPassword(text)} />
            <Button title="Submit" onPress={() => { checkCreds() }} />
        </ScrollView>;
    }
    else if (correct == 1) {
        content = <ScrollView style={{ padding: 30 }}>
            <Button title="Click here to log in" onPress={() => { setCorrect(0) }} />
            <Text>Enter username:</Text>
            <TextInput style={styles.input} value={username} type="text" onChangeText={(text) => setUsername(text)} />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={(text) => setPassword(text)} />
            <Text>Enter password again:</Text>
            <TextInput secureTextEntry={true} style={styles.input} value={password2} onChangeText={(text) => setPassword2(text)} />
            <Button title="Create account" onPress={() => { createAccount() }} />
        </ScrollView>;
    }
    return content;
}
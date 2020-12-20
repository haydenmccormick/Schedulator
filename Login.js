import React, { useState } from 'react';
import { Text, TextInput, Button, View, TouchableOpacity } from 'react-native';
import styles from './assets/Styles.js';
import bcrypt from 'react-native-bcrypt';
import AsyncStorage from '@react-native-community/async-storage';

// LOGIN SCREEN //

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    //const [passwordChecked, setPasswordChecked] = useState("");
    const [correct, setCorrectStatus] = useState("");

    function setLoggedIn() {
        try {
            AsyncStorage.setItem('loggedIn', username);
        } catch (error) {
            console.log(error);
        }
    };

    bcrypt.setRandomFallback((len) => {
        var Chance = require('chance');
        var chance = new Chance();
        const buf = new Uint8Array(len);
        return buf.map(() => Math.floor(chance.random() * 256));
    });

    function setCorrect(val) {

        setUsername("");
        setPassword("");
        setPassword2("");
        setCorrectStatus(val);
        props.setCorrect(val);
    }

    function setPasswordChecked(res) {
        if (res == true) {
            props.setUsername(username);
            setLoggedIn();
            setCorrect(2);
        }
    }

    function checkCreds() {
        if (username == "" || password == "") alert("Please fill out username and password");
        let parsed = require('./server/users.json');
        for (var i in parsed) {
            if (parsed[i].username == username) {
                bcrypt.compare(password, parsed[i].password, function (err, res) { setPasswordChecked(res) });
            }
        }
        // if (correct == 0)
        //     alert("The username or password is incorrect")
    }
    var salt = bcrypt.genSaltSync();
    function createAccount() {
        let exists = 0;
        if (username == "" || password == "") alert("Username and password cannot be empty");
        else if (password != password2) alert("Passwords must match!");
        else {
            let parsed = require('./server/users.json');
            for (var i in parsed) {
                if (parsed[i].username == username) {
                    exists = 1;
                    alert("An account with that username already exists! Please try again or login.");
                }
            }
            if (exists == 0) {
                let hash = bcrypt.hashSync(password, salt);
                props.pushServer("insert into users(username,password) values('" + username + "','" + hash + "')");
                props.setUsername(username);
                setLoggedIn();
                setCorrect(2);
            }
        }
    }

    let content = null;
    if (correct == 0) {
        content = <View style={{ padding: 30 }}>
            <View style={styles.loginheader}>
                <Text style={styles.logintext}>Login</Text>
            </View>
            <View style={styles.loginarea}>
                <Text style={styles.logintext2} >Username</Text>
                <TextInput selectionColor={'#70d3f4'} style={styles.logintextinput} value={username} type="text" onChangeText={(text) => setUsername(text)} />
                <Text style={styles.logintext2} >Password</Text>
                <TextInput selectionColor={'#70d3f4'} secureTextEntry={true} style={styles.logintextinput} value={password} onChangeText={(text) => setPassword(text)} />
                <TouchableOpacity style={styles.loginsubmit} title="Submit" onPress={() => { checkCreds() }}>
                    <Text style={styles.loginsubmittext}>Submit</Text>
                </TouchableOpacity>
                <Button color='gray' title="Create an account" onPress={() => { setCorrect(1) }} />
            </View>
        </View>;
    }
    else if (correct == 1) {
        content = <View style={{ padding: 30 }}>
            <View style={styles.loginheader}>
                <Text style={styles.signuptext}>Create Account</Text>
            </View>
            <View style={styles.loginarea}>
                <Text style={styles.logintext2}>Username</Text>
                <TextInput selectionColor={'#70d3f4'} style={styles.logintextinput} value={username} type="text" onChangeText={(text) => setUsername(text)} />
                <Text style={styles.logintext2}>Password</Text>
                <TextInput selectionColor={'#70d3f4'} secureTextEntry={true} style={styles.logintextinput} value={password} onChangeText={(text) => setPassword(text)} />
                <Text style={styles.logintext2}>Repeat Password</Text>
                <TextInput selectionColor={'#70d3f4'} secureTextEntry={true} style={styles.logintextinput} value={password2} onChangeText={(text) => setPassword2(text)} />
                <TouchableOpacity style={styles.loginsubmit} title="Create account" onPress={() => { createAccount() }}>
                    <Text style={styles.loginsubmittext}>Sign Up</Text>
                </TouchableOpacity>
                <Button color='gray' title="Return to login" onPress={() => { setCorrect(0) }} />
            </View>
        </View >;
    }
    return content;
}
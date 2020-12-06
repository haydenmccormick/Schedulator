import React from 'react';
import { View, StyleSheet } from 'react-native';

import Logo from '../assets/Logo';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';

function TitleScreen({ navigation }) {
    return (
        <Screen style={styles.container}>
            <Logo />
                <AppButton title="Log in" onPress={() => navigation.navigate("Login")} color="secondary"/>
                <AppButton title="Register" onPress={() => navigation.navigate("Register")}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
})

export default TitleScreen;
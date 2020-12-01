import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import defaultStyles from '../config/styles';

function Logo() {
    return (
    <View style={styles.container}>
        <AppText style={styles.title}>untitled-</AppText>
        <AppText style={styles.title}>scheduling-</AppText>
        <AppText style={styles.title}>project.js</AppText>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 30,
      },
    title: {
        fontSize: 60,
        fontWeight: "500",
        color: defaultStyles.colors.primary,
      },
})

export default Logo;
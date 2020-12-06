import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

import defaultStyles from '../config/styles';
import AppText from './AppText';

function AppButton({title, onPress, color="primary"}) {
    return (
        <TouchableOpacity 
            style={[styles.button, {backgroundColor: defaultStyles.colors[color]}]} 
            onPress={onPress}
        >
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        padding: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
    },
    text: {
        color: defaultStyles.colors.white,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
})

export default AppButton;
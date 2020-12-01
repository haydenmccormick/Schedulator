import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';

import colors from '../config/colors';

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={style}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: StatusBar.currentHeight || 0,
        flex: 1,
    }
})

export default Screen;
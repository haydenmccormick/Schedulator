import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Logo from '../assets/Logo';
import Screen from '../components/Screen';

function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return(
    <Screen style={styles.container}>
        <Logo />
        <AppTextInput 
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            textContentType="emailAddress"
        />
        <AppTextInput 
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
        />
        <AppButton 
            color="secondary" 
            onPress={() => console.log(email, password)}
            title="Login" 
        />
    </Screen>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default LoginScreen;
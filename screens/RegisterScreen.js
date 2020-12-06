import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';

function RegisterScreen() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return(
    <Screen style={styles.container}>
        <AppTextInput 
            autoCapitalize="word"
            autoCorrect={false}
            icon="account"
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            textContentType="name"
        />
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
            onPress={() => console.log(name, email, password)}
            title="Register" 
        />
    </Screen>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default RegisterScreen;
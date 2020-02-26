import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Loader from '../../../shared/components/loader';
import ValidEmail from '../../../shared/ValidEmail';
import {mainGreenColor, mainBrandColor} from '../../../shared/styles/mainStyle';

const SignInForm = ({navigation, toggleSignIn}) => {
  let [emailValue, setEmail] = useState('');
  let [passwordValue, setPassword] = useState('');
  
  const signIn = (email: string, password: string) => {
    const isValidEmail = new ValidEmail(email).isValid;
    if (password.trim().length > 6 && isValidEmail) {
      // TODO: send request to sign in
      navigation.navigate('Main');
    } else {
      // TODO: handle invalid data
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.emailInput}
        placeholder={'Your email'}
        onChangeText={text => setEmail(text)}
        value={emailValue}
      />

      <TextInput
        style={baseInput.input}
        placeholder={'Your password'}
        onChangeText={text => setPassword(text)}
        value={passwordValue}
      />

      <Text
        style={styles.signInButton}
        onPress={() => signIn(emailValue, passwordValue)}
      >
        Sign in
      </Text>
      
      <View style={styles.textWithLink}>
        <Text> Dont have an account?</Text>
        <Text style={styles.link} onPress={() => toggleSignIn()} > Create one </Text>
      </View>
    </View>
  );
}

const baseInput = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWithLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    color: mainBrandColor,

  },
  emailInput: {
    ...baseInput.input,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: mainGreenColor,
    padding: 5,
    color: 'white',
    width: '50%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SignInForm;

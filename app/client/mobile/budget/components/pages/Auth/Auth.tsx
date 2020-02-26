import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { mainBrandColor, whiteColor } from '../../../shared/styles/mainStyle';

const AuthPage = ({navigation}) => {
  let [isSignInToggled, setSignIn] = useState(true);

  const toggleSignIn = (): void => {
    setSignIn(prevValue => {
      return !isSignInToggled;
    });
  }

  if (isSignInToggled) {
    // Sign in
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.textColor}> Welcome to Budget App! </Text>
          <SignInForm navigation={navigation} toggleSignIn={toggleSignIn} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <SignUpForm navigation={navigation} toggleSignIn={toggleSignIn} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainBrandColor,
    color: whiteColor,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 5,
  },
  textColor: {
    color: 'white',
  }
});

export default AuthPage;

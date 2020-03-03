import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import {mainBrandColor, whiteColor} from '../../../shared/styles/mainStyle';
import ValidEmail from '../../../shared/ValidEmail';
import AsyncStorage from '@react-native-community/async-storage';

const AuthPage = ({navigateToHome}) => {
  let [isSignInToggled, setSignIn] = useState<boolean | undefined>(true);

  const signIn = (email: string, password: string) => {
    const isValidEmail = new ValidEmail(email).isValid;
    if (password.trim().length >= 6 && isValidEmail) {
      fetch('http://kletskovg.tech:5051/auth', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(res => {
          if (res.status === 200) {
            AsyncStorage.setItem('@email', email);
            AsyncStorage.setItem('@password', password);
            navigateToHome();
          } else {
            return Alert.alert('Error', 'Server error');
          }
        })
        .catch(err => {
          return Alert.alert('Error', 'Cant auth');
        });
    } else {
      // setErrorStyle(errorStyles.text);
      // setEmailInputStyle(emailInputStyles.emailInputOnError);
    }
  };



  useEffect(() => {
    async function getValues() {
      const email = await AsyncStorage.getItem('@email');
      const password = await AsyncStorage.getItem('@password');
      if (!!email && !!password) {
        signIn(email, password);
      }
    }
    getValues();
  }, []);

  const toggleSignIn = (): void => {
    setSignIn(!isSignInToggled);
  };

  if (isSignInToggled) {
    // Sign in
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.textColor}> Welcome to Budget App! </Text>
          <Text>  </Text>
          <SignInForm auth={navigateToHome} toggleSignIn={toggleSignIn} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <SignUpForm auth={navigateToHome} toggleSignIn={toggleSignIn} />
        </View>
      </View>
    );
  }
};

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
  },
});

export default AuthPage;

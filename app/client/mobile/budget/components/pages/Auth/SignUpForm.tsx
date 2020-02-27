import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Text, AsyncStorage} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ValidEmail from '../../../shared/ValidEmail';
import Loader from '../../../shared/components/loader';
import {mainBrandColor, mainGreenColor} from '../../../shared/styles/mainStyle';
import {errorStyles, emailInputStyles} from './formStyles';

const SignUpForm = ({toggleSignIn, auth}) => {
  let [emailValue, setEmail] = useState('');
  let [passwordValue, setPassword] = useState('');
  let [repeatPasswordValue, setRepeatPassword] = useState('');
  let [isModalVisible, setModalVisible] = useState(false);
  let [errorStyle, setErrorStyle] = useState<object| undefined>(errorStyles.textHidden);
  let [emailInputStyle, setEmailInputStyle] = useState<object | undefined>(emailInputStyles.emailInput);

  const signUp = (email: string, password: string) => {
    const validEmail = new ValidEmail(email).isValid;
    if (passwordValue.trim().length >= 6 && validEmail) {
      fetch('http://kletskovg.tech:5051/register', {
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
            auth();
          } else {
            return Alert.alert('Error', 'You wasnt reggistred', [
              {
                text: 'OK',
              },
              {
                text: `${res.status}`,
              },
            ]);
          }
        })
        .catch(err => {
          return Alert.alert('Error', '', [{text: `${err}`}]);
        });
    } else {
      setErrorStyle(errorStyles.text);
      setEmailInputStyle(emailInputStyles.emailInputOnError);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={emailInputStyle}
        placeholder={'Your email'}
        onChangeText={text => setEmail(text)}
        value={emailValue}
        autoCapitalize={'none'}
      />
      <Text style={errorStyle}> Email should be valid </Text>

      <TextInput
        style={emailInputStyle}
        placeholder={'Your password'}
        onChangeText={text => setPassword(text)}
        value={passwordValue}
        autoCapitalize={'none'}
        secureTextEntry={true}
        autoCompleteType={'off'}
      />
      <Text style={errorStyle}> Password should be at least 6 characters </Text>

      <TextInput
        style={baseInput.input}
        placeholder={'Repeat your password'}
        onChangeText={text => setRepeatPassword(text)}
        value={repeatPasswordValue}
        autoCapitalize={'none'}
        secureTextEntry={true}
        autoCompleteType={'off'}
      />
      <Text style={errorStyle}> Passwords should match </Text>

      <Text
        style={styles.signUpButton}
        onPress={() => signUp(emailValue, passwordValue)}>
        Sign up
      </Text>

      <View style={styles.textWithLink}>
        <Text> Already have an account?</Text>
        <Text style={styles.link} onPress={() => toggleSignIn()}>
          {' '}
          Sign in{' '}
        </Text>
      </View>

      <Loader isVisible={isModalVisible} />
    </View>
  );
};

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
  },
  signUpButton: {
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

export default SignUpForm;

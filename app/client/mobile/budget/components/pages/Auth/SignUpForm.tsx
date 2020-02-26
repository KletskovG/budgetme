import React, {useState} from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ValidEmail from '../../../shared/ValidEmail';
import Loader from '../../../shared/components/loader';
import { mainBrandColor, mainGreenColor } from '../../../shared/styles/mainStyle';

const SignUpForm = ({navigation, toggleSignIn}) => {
  let [emailValue, setEmail] = useState('');
  let [passwordValue, setPassword] = useState('');
  let [repeatPasswordValue, setRepeatPassword] = useState('');
  let [isModalVisible, setModalVisible] = useState(false);

  const signUp = (email: string, password: string) => {
    const validEmail = new ValidEmail(email).isValid;
    if (passwordValue.trim().length > 6 && validEmail) {
      // fetch('http://kletskovg.tech:5051/register', {
      //   method: 'post',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // })
      //   .then(res => {
      //     if (res.status === 200) {
      //       navigation.navigate('Main');
      //     } else {
      //       return Alert.alert('Error', 'You wasnt reggistred', [
      //         {
      //           text: 'OK',
      //         },
      //         {
      //           text: `${res.status}`,
      //         },
      //       ]);
      //     }
      //   })
      //   .then(res => {})
      //   .catch(err => {
      //     return Alert.alert('Error', '', [{text: `${err}`}]);
      //   });

      setModalVisible(true);
    } else {
      // TODO: handle invalid data
      return Alert.alert('Error', '', [{text: 'Invalid data', onPress: () => {}}]);
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
        style={styles.emailInput}
        placeholder={'Your password'}
        onChangeText={text => setPassword(text)}
        value={passwordValue}
      />

      <TextInput 
        style={baseInput.input}
        placeholder={'Repeat your password'}
        onChangeText={text => setRepeatPassword(text) }
        value={repeatPasswordValue}
      />

      <Text style={styles.signUpButton}>
        Sign up
      </Text>

      <View style={styles.textWithLink}>
        <Text> Already have an account?</Text>
        <Text style={styles.link} onPress={() => toggleSignIn()} > Sign in </Text>
      </View>

      <Loader isVisible={isModalVisible} />
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

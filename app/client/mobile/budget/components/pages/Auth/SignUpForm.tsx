import React, {useState} from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ValidEmail from '../../../shared/ValidEmail';


const SignUpForm = () => {
  let [emailValue, setEmail] = useState('');
  let [passwordValue, setPassword] = useState('');

  const signUp = (email: string, password: string) => {
    const validEmail = new ValidEmail(email).isValid;
    if (passwordValue.trim().length > 6 && validEmail) {
      fetch('http://kletskovg.tech:5051/register', {
        method: 'post',
        body: {
          email,
          password
        }
      })
      .then(res => {
        if (res.status === 200) {
          return Alert.alert('Success', 'You was registred', [
            {
              text: `OK`,
            },
          ]);
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
      .then(res => {
        
      })
      .catch(err => {
        return Alert.alert('Error', '', [{text: `${err}`}]);
      })
    }
  }

  return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder={'Your email'}
        onChangeText={text => setEmail(text)}
        value={emailValue}
      />

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder={'Your password'}
        onChangeText={text => setPassword(text)}
        value={passwordValue}
      />

      <Button title={'Sign up'} onPress={() => {
        signUp(emailValue, passwordValue);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default SignUpForm;

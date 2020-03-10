import React from 'react';
import { View, Modal, Alert, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { mainGreenColor } from '../../../shared/styles/mainStyle';
import { emailInputStyles } from '../Auth/formStyles';

const CreateTransaction = () => {
  return (
    <View>
      <TextInput 
        placeholder={'Type category here'}
      />
      <TextInput 
        placeholder={'Amount'}
        keyboardType={'numeric'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  emailInputStyles: {
    ...emailInputStyles.emailInput,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  flex: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CreateTransaction;

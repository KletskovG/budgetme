import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mainGreenColor } from '../styles/mainStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
    width: Dimensions.get('window').width * 0.3,
  },
  ok: {
    backgroundColor: mainGreenColor,
  },
  cancel: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white', 
  },
});

const ModalButtons = ({submit, cancel}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => submit()}
        style={{...styles.button, ...styles.ok}}>
        <Text style={styles.text}>OK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => cancel()}
        style={{...styles.button, ...styles.cancel}}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ModalButtons;

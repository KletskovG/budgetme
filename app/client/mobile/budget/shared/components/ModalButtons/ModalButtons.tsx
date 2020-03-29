import React from 'react'
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mainGreenColor } from '../../styles/mainStyle';
import ModalButtonsProps from './ModalButtonsProps';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    // width: '100%',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 50,
  },
  buttonsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 25,
  }
});

const ModalButtons = ({submit, cancel, title}: ModalButtonsProps) => {
  return (
    <View style={styles.buttons}>
      <Button
        onPress={() => cancel()}
        title="Cancel"
      />
      <Text style={styles.buttonsText}>
        {title}
      </Text>
      <Button
        onPress={() => submit()}
        title={'OK'}
      />
    </View>
  );
}

export default ModalButtons;

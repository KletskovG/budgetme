import React, { useState } from 'react';
import { View, Modal, Alert, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { emailInputStyles } from '../Auth/formStyles';
import { mainBrandColor, mainGreenColor } from '../../../shared/styles/mainStyle';

const CreateWallet = ({isModalVisible, setModal}) => {
  let [testText, setText] = useState<string | string>('Hide modal');

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          onPress={() => setModal(!isModalVisible)}
          style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder={'Type name of wallet'}
              style={styles.emailInputStyles}
            />

            <TouchableHighlight
              onPress={() => {
                setModal(!isModalVisible);
              }}>
              <View style={styles.flex}>
                <Text
                  style={{
                    ...styles.modalButton,
                    backgroundColor: mainGreenColor,
                  }}>
                </Text>
                <Text> Cancel </Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = {
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
    ...emailInputStyles,
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
    padding: 5,
    color: 'white',
    width: '50%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
};

export default CreateWallet;

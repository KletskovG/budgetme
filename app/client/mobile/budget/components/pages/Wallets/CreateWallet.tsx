import React, {useState} from 'react';
import {
  View,
  Modal,
  Alert,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {emailInputStyles} from '../Auth/formStyles';
import {mainBrandColor, mainGreenColor} from '../../../shared/styles/mainStyle';
import {config} from '../../../core/config';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { addWalletAction } from '../../../store/Wallet/actions/addWallet';

const CreateWallet = ({isModalVisible, setModal }) => {
  let [testText, setText] = useState<string | string>('Hide modal');
  let [nameOfTheWallet, setWalletName] = useState<string | string>('');
  const dispatch = useDispatch();

  return (
    <View>
      <Modal
        animationType="fade"
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
              autoCapitalize={'none'}
              value={nameOfTheWallet}
              onChangeText={text => {
                setWalletName(text);
              }}
            />

            <TouchableHighlight
              onPress={() => {
                setModal(!isModalVisible);
              }}>
              <View style={styles.flex}>
                <Text
                  onPress={() => dispatch(addWalletAction(nameOfTheWallet))}
                  style={{
                    ...styles.modalButton,
                    backgroundColor: mainGreenColor,
                  }}>
                  OK
                </Text>
                <Text
                  style={{
                    ...styles.modalButton,
                    backgroundColor: 'red',
                    marginLeft: 10,
                  }}>
                  {' '}
                  Cancel{' '}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

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
};

export default CreateWallet;

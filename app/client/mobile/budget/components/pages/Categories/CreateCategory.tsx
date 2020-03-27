import React from 'react'
import { View, Modal, Text } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {CreateCategoryStyles as styles} from './styles/CreateCategory';

const CreateCategory = () => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {}}>
        <View
          style={styles.container}>
          <View
            style={styles.formContainer}>
              <Text>😄</Text>
              <TextInput value={'Hello'}/>

          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreateCategory;

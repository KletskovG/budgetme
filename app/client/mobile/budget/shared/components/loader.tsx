import React from 'react';
import { Modal, View, Alert, Text, TouchableHighlight } from 'react-native';

const Loader = ({isVisible}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => Alert.alert('OK')}>
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                console.log('Hello world');
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Loader;
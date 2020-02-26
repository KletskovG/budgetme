import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const Navigation = () => {
  return (
    <View style={styles.base}>
      <Text> Navigation works </Text>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 300,
    left: 0,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';

interface PageLoaderProps{
  isLoading: boolean;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  loaderContainer: {
    backgroundColor: 'black',
    padding: 40,
    paddingTop: 5,
    borderRadius: 5,
    // width: Dimensions.get('window').width * 0.4,
    // height: Dimensions.get('window').height * 0.4,
    width: '50%',
    // height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

const PageLoader: React.FC<PageLoaderProps> = ({isLoading}) => {
  const loaderSource = require('../../../assets/images/spinner_white.png');
  const spinValue = new Animated.Value(0);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })


  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
        }
      )
    ).start();
  }, [isLoading])

  return (
    <View>
      <Modal
        transparent={true}
        visible={isLoading}
        animationType={'fade'}
      >
        <View style={styles.container}>
          <View style={styles.loaderContainer}>
            <Animated.Image
              style={{ transform: [{ rotate: spin }] }}
              source={loaderSource} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default PageLoader;

import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import IWallet from 'interfaces/IWallet';
const Wallets = () => {
  
  let [wallets, setWallets] = useState<IWallet[] | undefined>([]);

  async function getWallets() {
    const email = AsyncStorage.getItem('@email');
    fetch('http://kletskovg.tech:5051/wallet/')
  }

  useEffect(() => {
    
  });
  
  return (
    <View style={styles.container}>
      <Text> Wallets works </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Wallets;



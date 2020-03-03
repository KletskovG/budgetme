import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Wallet from './Wallet';
import IWallet from 'interfaces/IWallet';
const Wallets = () => {
  
  let [wallets, setWallets] = useState<IWallet[] | IWallet[]>([]);
  let [requestCount, setRequest] = useState<number | number>(0);

  async function getWallets() {
    const email = await AsyncStorage.getItem('@email');
    fetch(`http://kletskovg.tech:5051/user/${email}/wallets`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        setWallets(res);
        setRequest(requestCount + 1);
      })
      .catch(err => {
        
      })
  }

  useEffect(() => {
    getWallets();
  }, []);
  

  if (wallets.length > 0) {
    return (
      <View style={styles.container}>
        {/* FLat list here */}
        {wallets.map((value, index) => {
        return <Wallet wallet={value}/>
      })}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text> You dont have any wallets </Text>
        <Text> But you can create one! </Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Wallets;



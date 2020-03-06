import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Wallet from './Wallet';
import IWallet from 'interfaces/IWallet';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { mainGreenColor } from '../../../shared/styles/mainStyle';
import CreateWallet from './CreateWallet';
const Wallets = () => {
  
  let [wallets, setWallets] = useState<IWallet[] | IWallet[]>([]);
  let [requestCount, setRequest] = useState<number | number>(0);
  let [isCreateWallet, setToggle] = useState<boolean | boolean>(false);

  async function getWallets() {
    const email = await AsyncStorage.getItem('@email');
    fetch(`http://kletskovg.tech:5051/user/${email}/wallets`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        if (!!res) {
          setWallets(res);
        } else {
          setWallets([]);
        }
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
      <View></View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text> You dont have any wallets </Text>
        <Text  onPress={() => setToggle(!isCreateWallet)} style={styles.createButton}>  Create one! </Text>

        {isCreateWallet ? 
          <CreateWallet 
            setModal={setToggle}
            isModalVisible={isCreateWallet}
          /> 
            : 
          <Text style={{display: 'none'}}></Text>
        }
      </View>
    )
  }
  //  return (
  //    <View style={styles.container}>
  //      {/* <Text> You dont have any wallets </Text>
  //      <Text> But you can create one! </Text> */}
  //      <FlatList 
  //       data={wallets}
  //       renderItem={({wallet}) => <Wallet wallet={wallet}/>}
  //      />
  //    </View>
  //  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: mainGreenColor,
    padding: 5,
    color: 'white',
    width: '50%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});

export default Wallets;



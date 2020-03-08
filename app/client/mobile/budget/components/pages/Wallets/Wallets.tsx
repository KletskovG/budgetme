import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Wallet from './Wallet';
import IWallet from 'interfaces/IWallet';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {mainGreenColor} from '../../../shared/styles/mainStyle';
import CreateWallet from './CreateWallet';
import {config} from '../../../core/config';
import WalletList from './WalletList';
import WalletService from './WalletsService';
const Wallets = () => {
  let [wallets, setWallets] = useState<IWallet[] | IWallet[]>([]);
  let [isCreateWallet, setToggle] = useState<boolean | boolean>(false);
  const _walletService = new WalletService();

  useEffect(() => {
    getWallets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getWallets() {
    _walletService.getWallets()
      .then(wallets => setWallets(wallets))
      .catch(err => {
        Alert.alert('Cant find wallets');
        console.log(err);
        setWallets([]);
      }); 
  }

  const addWallet = async (name: string) => {
    _walletService.addWallet(name)
      .then((createdWallet: IWallet) => {
        setWallets([...wallets, createdWallet]);
      })
      .catch((err: Error) => {})
  };

  if (wallets.length > 0) {
    return (
      <WalletList wallets={wallets}/>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text> You dont have any wallets </Text>
        <Text
          onPress={() => setToggle(!isCreateWallet)}
          style={styles.createButton}>
          {' '}
          Create one!{' '}
        </Text>

        {isCreateWallet ? (
          <CreateWallet
            setModal={setToggle}
            isModalVisible={isCreateWallet}
            addWallet={addWallet}
          />
        ) : (
          <Text style={{display: 'none'}} />
        )}
      </View>
    );
  }
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
  },
});

export default Wallets;

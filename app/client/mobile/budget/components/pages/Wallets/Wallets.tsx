import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Wallet from './Wallet';
import IWallet from 'interfaces/IWallet';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {mainGreenColor} from '../../../shared/styles/mainStyle';
import CreateWallet from './CreateWallet';
import {config} from '../../../core/config';
import WalletList from './WalletList';
import { useDispatch, useSelector } from 'react-redux';
import { WalletState } from '../../../store/Wallet/walletReducer';
import {getWalletsAction} from '../../../store/Wallet/getWallets';

const Wallets = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state: WalletState) => state.wallets)
  let [isCreateWallet, setToggle] = useState<boolean | boolean>(false);

  let styles = StyleSheet.create({
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
    baseContainer: {
      height: Dimensions.get('window').height,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  useEffect(() => {
    dispatch(getWalletsAction());
  }, []);

  if (wallets.length > 0) {
    return (
      <View style={styles.baseContainer}>
        <WalletList wallets={wallets}/>
      </View>
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
          />
        ) : (
          <Text style={{display: 'none'}} />
        )}
      </View>
    );
  }
};



export default Wallets;

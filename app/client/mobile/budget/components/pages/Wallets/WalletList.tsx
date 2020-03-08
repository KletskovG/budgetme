import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import IWallet from '../../../interfaces/IWallet';
import { View, Text, StyleSheet } from 'react-native';
import { mainTextColor } from '../../../shared/styles/mainStyle';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Wallet from './Wallet';


const WalletStack = createStackNavigator();



const WalletAmount = ({amount}: {amount: number}) => {
  if (amount > 0) {
    return <Text style={{...styles.walletAmount, color: 'red'}}> {amount} </Text>
  } else {
    return <Text style={{...styles.walletAmount, color: mainTextColor}}> {amount} </Text>
  }
}

const WalletList = ({wallets}: {wallets: IWallet[]}) => {
  // return (
  //   <FlatList
  //     data={wallets}
  //     renderItem={({item}) => (
  //       <View style={styles.container}>
  //         <View style={styles.child}>
  //           <Text style={styles.walletName}> {item.name} </Text>
  //           <WalletAmount amount={item.amount}/>
  //         </View>
  //       </View>
  //     )}
  //     keyExtractor={(item, index) => item._id}
  //   />
  // );

  return (
    <View>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fafafa',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  walletName: {
    fontSize: 20,
  },
  walletAmount: {
    fontSize: 20,
  }
});

export default WalletList;

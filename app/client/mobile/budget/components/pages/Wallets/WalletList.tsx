import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import IWallet from '../../../interfaces/IWallet';
import { View, Text, StyleSheet } from 'react-native';
import { mainTextColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import {createStackNavigator} from '@react-navigation/stack';
import Wallet from './Wallet';


const WalletStack = createStackNavigator();

const WalletAmount = ({amount}: {amount: number}) => {
  if (amount >= 0) {
    return <Text style={{...styles.walletAmount, color: mainGreenColor}}> {amount} </Text>
  } else {
    return <Text style={{...styles.walletAmount, color: 'red'}}> {amount} </Text>
  }
}

const WalletList = ({wallets}: {wallets: IWallet[]}) => {
 const WholeList = ({navigation}: any) => {
   return (
    <FlatList
      data={wallets}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => {navigation.navigate(`${item.name}`, {wallet: item})}} style={styles.child}>
            <Text style={styles.walletName}> {item.name} </Text>
            <WalletAmount amount={item.amount}/>
          </TouchableOpacity>
        </View>
      )}
      key={(item) => item._id}
      keyExtractor={(item) => item._id}
    />
  );
}

  return (
    <WalletStack.Navigator initialRouteName={'WalletList'}>
      <WalletStack.Screen name={'Wallets'} component={WholeList} />
      {
        wallets.map(wallet => {
          return (
            <WalletStack.Screen name={`${wallet.name}`} component={Wallet}/>
          )
        })
      }
    </WalletStack.Navigator>
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

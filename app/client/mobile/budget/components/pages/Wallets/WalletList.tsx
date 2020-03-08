import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import IWallet from '../../../interfaces/IWallet';
import { View, Text, StyleSheet } from 'react-native';
import { mainTextColor } from '../../../shared/styles/mainStyle';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
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
 const WholeList = ({navigation}: any) => {
   return (
    <FlatList
      data={wallets}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => {navigation.navigate(`${item.name}`)}} style={styles.child}>
            <Text style={styles.walletName}> {item.name} </Text>
            <WalletAmount amount={item.amount}/>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => item._id}
    />
  );
}

  return (
    <WalletStack.Navigator initialRouteName={'WalletList'}>
      <WalletStack.Screen name={'WalletList'} component={WholeList} />
      {/* <WalletStack.Screen name={'First Wallet'} component={Wallet} /> */}
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

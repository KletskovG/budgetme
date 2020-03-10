import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import IWallet from '../../../interfaces/IWallet';
import { View, Text, StyleSheet } from 'react-native';
import { mainTextColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import {createStackNavigator} from '@react-navigation/stack';
import Wallet from './Wallet';
import CreateWallet from './CreateWallet';
import { IWalletList } from './Interfaces/IWalletList';


const WalletStack = createStackNavigator();

const WalletAmount = ({amount}: {amount: number}) => {
  if (amount >= 0) {
    return <Text style={{...styles.walletAmount, color: mainGreenColor}}> {amount} </Text>
  } else {
    return <Text style={{...styles.walletAmount, color: 'red'}}> {amount} </Text>
  }
}

const WalletList = ({wallets, addWallet}: 
  IWalletList
) => {
 const WholeList = ({navigation}: any) => {
  const navigateToWallet = (wallet: IWallet): void => {
    navigation.navigate(`${wallet._id}`, {wallet: wallet}); 
  }

  let [isCreateWallet, setToggle] = useState<boolean | boolean>(false);
  
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={wallets}
        renderItem={({item}) => (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                navigateToWallet(item);
              }}
              style={styles.child}>
              <Text style={styles.walletName}> {item.name} </Text>
              <WalletAmount amount={item.amount} />
            </TouchableOpacity>
          </View>
        )}
        key={item => item._id}
        keyExtractor={item => item._id}
      />

      <Text
        onPress={() => {setToggle(true)}}
        style={styles.createButton}>
        Add wallet
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

  return (
    <View style={{flex: 1, width: '100%'}}>
      <WalletStack.Navigator initialRouteName={'WalletList'}>
        <WalletStack.Screen name={'Wallets'} component={WholeList} />
        {wallets.map((wallet, index) => {
          return (
            <WalletStack.Screen 
              name={`${wallet._id}`} 
              component={Wallet}
              options={{title: `${wallet.name}`}}
            />
          );
        })}
      </WalletStack.Navigator>
    </View>
  );
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
  },
  createButton: {
    backgroundColor: mainGreenColor,
    padding: 5,
    color: 'white',
    width: '50%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 50,
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default WalletList;

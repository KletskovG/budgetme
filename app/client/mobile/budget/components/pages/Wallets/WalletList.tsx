import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import IWallet from '../../../interfaces/IWallet';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { mainTextColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import {createStackNavigator} from '@react-navigation/stack';
import Wallet from './Wallet';
import CreateWallet from './CreateWallet';
import { IWalletList } from './Interfaces/IWalletList';
import { useDispatch } from 'react-redux';
import { deleteWalletAction } from '../../../store/Wallet/actions/deleteWallet';
import {styles} from './styles/WalletList';


const WalletStack = createStackNavigator();

const WalletAmount = ({amount}: {amount: number}) => {
  if (amount >= 0) {
    return <Text style={{...styles.walletAmount, color: mainGreenColor}}> {amount} </Text>
  } else {
    return <Text style={{...styles.walletAmount, color: 'red'}}> {amount} </Text>
  }
}


const WalletList = ({wallets }: 
  IWalletList
) => {

  const dispatch = useDispatch();
  const DeleteWalletAlert = (wallet: IWallet) => {
    return Alert.alert(`Delete ${wallet.name}?`, '', [
      {text: 'OK', onPress: () => dispatch(deleteWalletAction(wallet))},
      {text: 'cancel', onPress: () => console.log('Cancel was pressed')},
    ]);
  };


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
              onLongPress={() => DeleteWalletAlert(item)}
              style={styles.child}>
              <Text style={styles.walletName}> {item.name} </Text>
              <WalletAmount amount={item.amount} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item._id}
      />

      <Text
        onPress={() => {
          setToggle(true);
        }}
        style={styles.createButton}>
        Add wallet
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

export default WalletList;

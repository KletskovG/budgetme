import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IWallet from '../../../interfaces/IWallet';
import { mainGreenColor } from '../../../shared/styles/mainStyle';
import {styles} from './styles/Wallet';
import CreateTransaction from './CreateTransaction';
import { useSelector } from 'react-redux';
import { WalletState } from 'store/Wallet';
import { FlatList } from 'react-native-gesture-handler';
import Transaction from './Transaction';
import ITransaction from 'interfaces/ITransaction';

const Wallet = ({route}: any) => {
  const [isCreateTransaction, setIsCreateTransaction] = useState<boolean>(false);


  // const wallet: IWallet = route.params.wallet as IWallet
  const wallet = useSelector((state: WalletState) => {
    const requiredWallet = state.wallets.find((wallet: IWallet) => wallet._id === route.params.wallet._id); 
    const walletIndex = state.wallets.indexOf(requiredWallet as IWallet);
    return state.wallets[walletIndex];
  })

  const expensesLength = wallet.expenses.length;
  for (let i = 0; i < expensesLength; i++) {
    wallet.expenses[i].isExpense = true;
  }
  const incomesLength = wallet.incomes.length;
  for (let i = 0; i < incomesLength; i++) {
    wallet.incomes[i].isExpense = false;
  }
  const transactions: ITransaction[] = [...wallet.expenses.reverse(), ...wallet.incomes.reverse()];


  const sumOfExpenses = wallet.expenses.reduce((prev, curr) => {
    let num: number = 0;
    if (!!curr?.count) {
      num = curr.count;
    }
    return prev + num;
  }, 0);
  const sumOfIncomes = wallet.incomes.reduce((prev, curr) => {
    let num: number = 0;
    if (!!curr?.count) {
      num = curr.count;
    }
    return prev + num;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.balanse}>
        <Text style={styles.baseText}> Balance: </Text>
        <Text style={styles.baseText}> {wallet.amount} </Text>
      </View>
      <View style={{...styles.balanse, marginBottom: 0}}>
        <Text style={{...styles.baseText}}> Expenses: </Text>
        <Text style={{...styles.baseText, color: 'red'}}>{sumOfExpenses}</Text>
      </View>
      <View style={styles.balanse}>
        <Text style={styles.baseText}> Incomes: </Text>
        <Text style={{...styles.baseText, color: mainGreenColor}}>
          {sumOfIncomes}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setIsCreateTransaction(true)}
        style={styles.addButton}>
        <Text style={{color: 'white', fontSize: 25}}> + </Text>
      </TouchableOpacity>

      <CreateTransaction  isCreateTransaction={isCreateTransaction} close={setIsCreateTransaction} id={wallet._id} />

      <FlatList 
        style={styles.transactions}
        data={transactions}
        renderItem={({item}) => <Transaction isExpense={item.isExpense as boolean} transaction={item}/>}
        
      />
    </View>
  );
}


export default Wallet;
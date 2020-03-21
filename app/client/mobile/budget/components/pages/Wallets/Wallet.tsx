import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IWallet from '../../../interfaces/IWallet';
import ExpenseSwitcher from './ExpenseSwitcher';
import { mainGreenColor } from '../../../shared/styles/mainStyle';
import CreateTransaction from './CreateTransaction';
import {styles} from './styles/Wallet';

const Wallet = ({route}: any) => {
  let [isCreateTransaction, toggleCreateTransaction] = useState(false);

  const wallet: IWallet = route.params.wallet as IWallet
  const transactions = {
    expenses: wallet.expenses,
    incomes: wallet.incomes,
  };

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

      <ExpenseSwitcher transactions={transactions} />
      
      {isCreateTransaction ? (
        <CreateTransaction />
      ) : (
        <Text style={{display: 'none'}} />
      )}
    </View>
  );
}


export default Wallet;
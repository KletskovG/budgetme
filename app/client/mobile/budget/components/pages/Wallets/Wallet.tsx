import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import IWallet from '../../../interfaces/IWallet';
import ExpenseSwitcher from './ExpenseSwitcher';
import { mainTextColor, mainGreenColor } from '../../../shared/styles/mainStyle';

const Wallet = ({route}: any) => {
  let [isExpensesToggled, toggleExpenses] = useState(false);

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
        <Text style={{...styles.baseText, color: 'red'}}>
          {sumOfExpenses}
        </Text>
      </View>
      <View style={styles.balanse}>
        <Text style={styles.baseText}> Incomes: </Text>
        <Text style={{...styles.baseText, color: mainGreenColor}}>{sumOfIncomes}</Text>
      </View>

      <ExpenseSwitcher transactions={transactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  balanse: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: mainTextColor,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 15,
    marginBottom: 30,
  },
  baseText: {
    fontSize: 20,
  }
});

export default Wallet;
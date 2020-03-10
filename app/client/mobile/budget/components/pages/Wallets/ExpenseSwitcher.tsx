import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { mainBrandColor, mainTextColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import ITransaction from './Interfaces/ITransaction';
import CreateTransaction from './CreateTransaction';

const Transaction = ({transaction}: ITransaction) => {
  let category: string = 'Empty category';
  if (!!transaction.category) {
    category = transaction.category;
  }

  return (
    <View style={transactionStyles.container}>
      <Text style={{color: 'white'}}>{category}</Text>
      <Text style={{color: 'white'}}>{transaction.count}</Text>
    </View>
  );
}

const ExpenseSwitcher = ({transactions}: 
  {transactions: {expenses: [], incomes: []}}
) => {
  let [isExpensesActive, setActiveTransactions] = useState(true);
  console.log(transactions);
  return (
    <View style={styles.container}>
      <View style={styles.switcher}>
        <TouchableOpacity
          onPress={() => setActiveTransactions(true)}
          style={{...styles.transactionSwitcher}}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Expenses
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 30,}}>|</Text>
        <TouchableOpacity
          onPress={() => setActiveTransactions(false)}
          style={{...styles.transactionSwitcher}}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Incomes
          </Text>
        </TouchableOpacity>
      </View>
      <CreateTransaction />
      <FlatList
        data={isExpensesActive ? transactions.expenses : transactions.incomes}
        renderItem={({item}: any) => <Transaction transaction={item}/>}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
}

const transactionStyles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.75,
    paddingLeft: '15%',
    paddingRight: '15%',
    marginTop: 30,
    backgroundColor: mainBrandColor,
    paddingTop: 10,
    paddingBottom: 10,
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switcher: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: mainTextColor,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: Dimensions.get('window').width,
  },
  transactionSwitcher: {
    padding: 20,
    paddingLeft: 0,
  },
  addButton: {
    position: 'absolute',
    bottom: '20%',
    right: '10%',
    borderRadius: 50,
    padding: 5,
    backgroundColor: mainGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
  addButtonText: {
    color: 'white',
    transform: [{rotate: '90deg'}],
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ExpenseSwitcher;

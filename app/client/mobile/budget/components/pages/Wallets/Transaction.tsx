import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ITransactionProperties from './Interfaces/ITransactionProperties';
import { TransactionStyles } from './styles/TransactionStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { mainGreenColor } from '../../../shared/styles/mainStyle';


const Transaction = ({isExpense, transaction}: ITransactionProperties) => {
  const computeTextStyle = (isExpense: boolean) => {
    const textStyle = {
      color: isExpense? 'red': mainGreenColor,
    }


    return StyleSheet.flatten([textStyle]);
  }
  
  return (
    <TouchableOpacity 
    activeOpacity={0.8}
    style={TransactionStyles.container}>
      <Text style={computeTextStyle(isExpense)} > {transaction.category} --- {transaction.count}  --- {transaction.timestamp} </Text>
    </TouchableOpacity>
  )
}

export default Transaction;

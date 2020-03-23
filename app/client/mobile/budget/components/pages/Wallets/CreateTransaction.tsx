import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { styles } from './styles/CreateTransaction';
import { ICreateTransaction } from './Interfaces/ICreateTransaction';
import { mainBrandColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import { useDispatch } from 'react-redux';
import ITransaction from '../../../interfaces/ITransaction';
import { addTransactionAction } from '../../../store/Wallet/actions/addTransaction';


const CreateTransaction = ({isCreateTransaction, close, id}: ICreateTransaction) => {
  const dispatch = useDispatch();
  const [isExpenseActive, setExpense] = useState<boolean>(true);
  const [isToday, setToday] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<ITransaction>({ count: 0, category: ''});
  const expenseBlockStyle = (isActive: boolean) => {
    const computedStyle = {
      backgroundColor: isActive? mainBrandColor: 'white',
      color: isActive? 'white': 'black',
    };

    return StyleSheet.flatten([styles.expenseBlock, computedStyle]);
  } 

  const createTransaction = (isExpense: boolean, transaction: ITransaction) => {
    dispatch(addTransactionAction(id, transaction, isExpense));
    setTransaction({count: 0, category: ''});
    close(false);
  }
  
  useEffect(() => {
    setExpense(true);
    setToday(true);
  }, [isCreateTransaction])

  return (
    <View>
      <Modal
        transparent={true}
        visible={isCreateTransaction}
        onRequestClose={() => {}}
        animationType={'fade'}>
        <TouchableOpacity
          onPress={() => close(false)}
          style={styles.container}
          activeOpacity={1}>
          <TouchableOpacity
            onPress={() => close(true)}
            activeOpacity={1}
            style={styles.formContainer}>
            <View style={styles.expenseContainer}>
              <View style={styles.expenseContainerChild}>
                <Text
                  onPress={() => setExpense(!isExpenseActive)}
                  style={expenseBlockStyle(isExpenseActive)}>
                  Expense
                </Text>
                <Text
                  onPress={() => setExpense(!isExpenseActive)}
                  style={expenseBlockStyle(!isExpenseActive)}>
                  Income
                </Text>
              </View>

              <View style={styles.expenseContainerChild}>
                <Text
                  onPress={() => setToday(!isToday)}
                  style={expenseBlockStyle(isToday)}>
                  Yesterday
                </Text>
                <Text
                  onPress={() => setToday(!isToday)}
                  style={expenseBlockStyle(!isToday)}>
                  Today
                </Text>
              </View>
            </View>
            <View>
              <TextInput
                placeholder={'Category'}
                autoCapitalize={'none'}
                style={styles.baseInput}
                onChangeText={category => setTransaction({...transaction, category})}
              />

              <TextInput
                onChangeText={count => setTransaction({...transaction, count: Number(count)})}
                keyboardType={'numeric'}
                placeholder={'0.00'}
                style={styles.baseInput}
              />

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => createTransaction(isExpenseActive, transaction)}
                  style={{...styles.button, backgroundColor: mainGreenColor}}>
                  <Text>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => close(false)}
                  style={{...styles.button, backgroundColor: 'red'}}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default CreateTransaction;

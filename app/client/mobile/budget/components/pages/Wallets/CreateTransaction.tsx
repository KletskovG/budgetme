import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, TextInput, TouchableHighlight, Text, StyleSheet, Button, DatePickerIOS, Image } from 'react-native'
import { styles } from './styles/CreateTransaction';
import { ICreateTransaction } from './Interfaces/ICreateTransaction';
import { mainBrandColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import { useDispatch, useSelector } from 'react-redux';
import ITransaction from '../../../interfaces/ITransaction';
import { addTransactionAction } from '../../../store/Wallet/actions/addTransaction';
import DateTimePicker from '@react-native-community/datetimepicker';
import TransactionSelector from './TransactionSelector';
import { RootState } from '../../../store/typeFunctions';
import ModalButtons from '../../../shared/components/ModalButtons/ModalButtons';
import LineSwitch from '../../../shared/components/LineSwitch/LineSwitch';
import { setExpenseTransaction, setTimeTransaction, toggleCreating, setAmountTransaction } from '../../../store/Wallet';
import {InlineSelector} from '../../../shared/components/';

type transactionTime = 'yesterday' | 'today' | 'other';

const CreateTransaction = ({close, id, navigation}: ICreateTransaction) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<transactionTime>('today');
  const [selectedDate, setDate] = useState<Date>(new Date(new Date().getTime()));
  const transactionState = useSelector((state: RootState) => state.walletState.createTransaction);
  const arrowImageSource = require('../../../assets/images/arrow.png');
  const inlineDateElements = ['Yesteday', 'Today', 'Other']; 

  const isVisible = useSelector((state: RootState) => state.walletState.createTransaction.isCreating);

  const selectDate = (index: number) => {
    console.log(index);
    const str = `${inlineDateElements[index].toLowerCase()}`;
    console.log(str);
    setTime(str as transactionTime);
    if (time === 'yesterday') {
      const date = new Date(new Date().getTime() - 86400000).toISOString(); // Set yesterday date
      dispatch(setTimeTransaction(date));
    } else if (time === 'today') {
      const date = new Date(new Date().getTime()).toISOString();
      dispatch(setTimeTransaction(date));
    } else {

    }
  }

  const computeCategoryStr = () => {
    const str = transactionState.category?.emoji as string + transactionState.category?.name;
    if (!!str) {
      return str;
    } else {
      return 'Empty';
    }
  }

  const createTransaction = () => {
    const transaction: ITransaction = {
      count: transactionState.amount,
      category: `${transactionState.category?.emoji} ${transactionState.category?.name}`,
      timestamp: selectedDate.toISOString(),
    }

    dispatch(addTransactionAction(id, transaction, transactionState.isExpense));
    dispatch(toggleCreating());
  }

  return (
    <View>
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {}}
        animationType={'slide'}>
        <TouchableOpacity
          onPress={() => close(false)}
          style={styles.container}
          activeOpacity={1}>
          <TouchableOpacity
            onPress={() => close(false)}
            activeOpacity={1}
            style={styles.formContainer}>
            <ModalButtons
              title={'Transaction'}
              submit={() => {
                createTransaction();
              }}
              cancel={() => {
                close(false);
              }}
            />
            <View style={styles.expenseContainer}>
              <LineSwitch title={'Expense'} change={() => { dispatch(setExpenseTransaction()) }}/>
            </View>
            <View  >
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate('Categories')
                  dispatch(toggleCreating());
                }}
                style={styles.categoryContainer}>
                <Text style={{ fontSize: 20 }} >Category</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <Text style={{ fontSize: 20, marginRight: 10, }} > 
                    {computeCategoryStr()}
                  </Text>
                  <Image style={{ width: 30, height: 30 }} source={arrowImageSource} />
                </View>
              </TouchableOpacity>
              
              <InlineSelector title={'Date'} elements={inlineDateElements} change={(index) => { selectDate(index) }}/>
              <TextInput
                onChangeText={count =>
                  dispatch(setAmountTransaction(Number.parseFloat(count)))
                }
                keyboardType={'numeric'}
                placeholder={'0.00'}
                style={styles.baseInput}
              />


              {time === 'other' ? (
                <DateTimePicker
                  mode="date"
                  value={selectedDate}
                  onChange={(event, date) => {
                    const createdDate = new Date(`${date}`);
                    setDate(createdDate)
                    dispatch(setTimeTransaction(createdDate.toISOString()));
                  }}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default CreateTransaction;

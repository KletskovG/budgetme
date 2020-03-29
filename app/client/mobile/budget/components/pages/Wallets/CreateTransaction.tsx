import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, TextInput, TouchableHighlight, Text, StyleSheet, Button } from 'react-native'
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
import { setExpenseTransaction } from '../../../store/Wallet';
import {InlineSelector} from '../../../shared/components/';

type transactionTime = 'yesterday' | 'today' | 'other';

const CreateTransaction = ({isCreateTransaction, close, id}: ICreateTransaction) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<transactionTime>('today');
  const [transaction, setTransaction] = useState<ITransaction>({ count: 0, category: ''});
  const [selectedDate, setDate] = useState<Date>(new Date(new Date().getTime()));
  const transactionState = useSelector((state: RootState) => state.walletState.createTransaction);
  useEffect(() => {
    setTime('today');
  }, [isCreateTransaction]);

  return (
    <View>
      <Modal
        transparent={true}
        visible={isCreateTransaction}
        onRequestClose={() => {}}
        animationType={'slide'}>
        <TouchableOpacity
          onPress={() => close(false)}
          style={styles.container}
          activeOpacity={1}>
          <TouchableOpacity
            onPress={() => close(true)}
            activeOpacity={1}
            style={styles.formContainer}>
            <ModalButtons
              title={'Transaction'}
              submit={() => {
                // createTransaction(transaction);
                
              }}
              cancel={() => {
                close(false);
              }}
            />
            <View style={styles.expenseContainer}>
              <LineSwitch title={'Expense'} change={() => { dispatch(setExpenseTransaction()) }}/>
            </View>
            <View>
              <Button title={'Select Category'} onPress={() => {}} />
              <InlineSelector title={'Date'} elements={['Yesteday', 'Today', 'Other', 'Next']} />
              <TextInput
                onChangeText={count =>
                  setTransaction({...transaction, count: Number(count)})
                }
                keyboardType={'numeric'}
                placeholder={'0.00'}
                style={styles.baseInput}
              />

              {time === 'other' ? (
                <DateTimePicker
                  mode="date"
                  value={selectedDate}
                  onChange={(event, date) => setDate(new Date(`${date}`))}
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

import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { styles } from './styles/CreateTransaction';
import { ICreateTransaction } from './Interfaces/ICreateTransaction';
import { mainBrandColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import { useDispatch } from 'react-redux';
import ITransaction from '../../../interfaces/ITransaction';
import { addTransactionAction } from '../../../store/Wallet/actions/addTransaction';
import DateTimePicker from '@react-native-community/datetimepicker';
import TransactionSelector from './TransactionSelector';

type transactionTime = 'yesterday' | 'today' | 'other';
const initialSelectorState = {
  expenseButtons: [
    {
      title: 'Expense',
      isActive: true,
    },
    {
      title: 'Income',
      isActive: false,
    },
  ],
  dateButtons: [
    {
      title: 'Yesterday',
      isActive: false,
    },
    {
      title: 'Today',
      isActive: true,
    },
    {
      title: 'Other',
      isActive: false,
    },
  ],
};


const CreateTransaction = ({isCreateTransaction, close, id}: ICreateTransaction) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<transactionTime>('today');
  const [transaction, setTransaction] = useState<ITransaction>({ count: 0, category: ''});
  const [selector, setSelector] = useState<typeof initialSelectorState>(initialSelectorState);
  const [selectedDate, setDate] = useState<Date>(new Date(new Date().getTime()));
  
  const changeSelector = (item: string) => {
    setSelector(selector => {
      for (const key in selector) {
        if (selector[key].some((element: any) => element.title === item)) {
          selector[key].forEach((element: any) => {
            if (element.title === item) {
              element.isActive = true;
            } else {
              element.isActive = false;
            }
          })
        }
      }

      const otherDate = selector.dateButtons.find(element => element.title === 'Other');
      if (otherDate?.isActive) {
        setTime('other');
      }
      return {...selector};
    });
  }

  const createTransaction = (transaction: ITransaction) => {
    const expenseTitle = selector.expenseButtons.find(element => {
      return element.isActive;
    })?.title.toLowerCase();
    const time = selector.dateButtons.find(element => {
      return element.isActive;
    })?.title.toLowerCase();
    
    if (time === 'today') {
      transaction.timestamp = `${new Date().toISOString()}`;
    } else if (time === 'yesterday') {
      transaction.timestamp = `${new Date(
        new Date().getTime() - 86400000,
      ).toISOString()}`;
    }

    const transactionData: ITransaction = {
      count: transaction.count,
      category: transaction.category,
      isExpense: expenseTitle === 'expense'? true: false,
      timestamp: transaction.timestamp,
    }

    dispatch(addTransactionAction(id, transactionData, !!transactionData.isExpense));
    close(false);
  }
  
  useEffect(() => {
    setTime('today');
  }, [isCreateTransaction]);

  useEffect(() => {
    setTime(time => {
      return selector.dateButtons
        .find(element => element.isActive)
        ?.title.toLowerCase() as transactionTime;
    });
  }, [selector])

  

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
              <TransactionSelector
                buttons={selector.expenseButtons}
                change={changeSelector}
              />
              <TransactionSelector
                buttons={selector.dateButtons}
                change={changeSelector}
              />
            </View>
            <View>
              <TextInput
                placeholder={'Category'}
                autoCapitalize={'none'}
                style={styles.baseInput}
                onChangeText={category =>
                  setTransaction({...transaction, category})
                }
              />

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
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    createTransaction(transaction)
                  }
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

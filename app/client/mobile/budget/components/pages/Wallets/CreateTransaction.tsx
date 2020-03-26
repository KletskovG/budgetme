import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, TextInput, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { styles } from './styles/CreateTransaction';
import { ICreateTransaction } from './Interfaces/ICreateTransaction';
import { mainBrandColor, mainGreenColor } from '../../../shared/styles/mainStyle';
import { useDispatch } from 'react-redux';
import ITransaction from '../../../interfaces/ITransaction';
import { addTransactionAction } from '../../../store/Wallet/actions/addTransaction';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
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
  const [isExpenseActive, setExpense] = useState<boolean>(true);
  const [time, setTime] = useState<transactionTime>('today');
  const [transaction, setTransaction] = useState<ITransaction>({ count: 0, category: ''});
  const [selector, setSelector] = useState<typeof initialSelectorState>(initialSelectorState);
  
  const changeSelector = (item: string) => {
    setSelector(selector => {
      for (const key in selector) {
        if (selector[key].some(element => element.title === item)) {
          selector[key].forEach(element => {
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

  const createTransaction = (isExpense: boolean, transaction: ITransaction) => {
    dispatch(addTransactionAction(id, transaction, isExpense));
    setTransaction({count: 0, category: ''});
    close(false);
  }
  
  useEffect(() => {
    setExpense(true);
    setTime('today');
  }, [isCreateTransaction]);

  useEffect(() => {
    setTime(time => {
      return selector.dateButtons
        .find(element => element.isActive)
        ?.title.toLowerCase() as transactionTime;
    })
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
                  value={new Date(new Date().getTime())}
                  onChange={(event, date) => setTransaction({...transaction, timestamp: `${date}`})}
                />
              ) : null}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    createTransaction(isExpenseActive, transaction)
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

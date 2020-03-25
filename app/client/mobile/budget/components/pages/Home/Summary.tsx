import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../../store/typeFunctions';
import {HomeState} from '../../../store/Home/homeReducer';
import {getSummaryAction} from '../../../store/Home/actions/getSummaryAction';
import AsyncStorage from '@react-native-community/async-storage';
import { SummaryStyles } from './styles';
import { mainGreenColor } from '../../../shared/styles/mainStyle';
import { getMonthFromNumber } from '../../../shared/utils/getMonthFromNumber';

const Summary = () => {
  const dispatch = useDispatch();
  const homeState: HomeState = useSelector(
    (state: RootState) => state.homeState,
  );
  const currentMonth = getMonthFromNumber(new Date().getMonth() + 1);
  const balanseColorStyle = (balanse: number) => {
    const style = {
      color: balanse > 0? mainGreenColor: 'red',
    }
    return StyleSheet.flatten([SummaryStyles.balanseText, style])
  }

  useEffect(() => {
    AsyncStorage.getItem('@id').then(id =>
      dispatch(getSummaryAction(id as string)),
    );
  }, []);
  
  return (
    <View style={SummaryStyles.container}>
      <View style={SummaryStyles.summaryDate}>
        <Text style={SummaryStyles.balanseText}>{currentMonth}</Text>
        <Image
          style={{width: 30, height: 30}}
          source={require('../../../assets/images/calendar.png')}></Image>
      </View>
      <View style={{height: '100%', width: '100%'}}>
        <View style={SummaryStyles.summaryBlock}>
          <Text style={balanseColorStyle(homeState.summary.balanse)}>
            Balanse:
          </Text>
          <Text style={balanseColorStyle(homeState.summary.balanse)}>
            {homeState.summary.balanse}
          </Text>
        </View>
        <View style={SummaryStyles.summaryBlock}>
          <Text style={balanseColorStyle(-1)}>Expenses:</Text>
          <Text style={balanseColorStyle(-1)}>
            {homeState.summary.expenses}
          </Text>
        </View>
        <View style={SummaryStyles.summaryBlock}>
          <Text style={balanseColorStyle(1)}>Incomes:</Text>
          <Text style={balanseColorStyle(1)}>{homeState.summary.incomes}</Text>
        </View>
      </View>
    </View>
  );
}

export default Summary;

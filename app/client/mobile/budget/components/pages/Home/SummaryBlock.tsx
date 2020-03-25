import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SummaryBlockStyles as styles } from './styles';
import { HomeState } from '../../../store/Home/homeReducer';
import { useSelector } from 'react-redux';
import { RootState } from 'store/typeFunctions';
import {ISummaryBlock} from './interfaces/';
import { mainGreenColor } from '../../../shared/styles/mainStyle';


const SummaryBlock = ({fontColorMatch, amount, title}: ISummaryBlock) => {
  const textStyle = () => {
    const style = {
      color: fontColorMatch > 0? mainGreenColor: 'red',
    }

    return StyleSheet.flatten([styles.text, style]);
  }
  
  return (
    <View style={styles.summaryBlock}>
      <View>
        <Text style={textStyle()}>{title}</Text>
      </View>
      <View style={styles.childContainer}>
        <Text style={textStyle()}>{amount}</Text>
        <Image style={styles.arrow}  source={require('../../../assets/images/arrow.png')}></Image>
      </View>
    </View>
  );
}

export default SummaryBlock;

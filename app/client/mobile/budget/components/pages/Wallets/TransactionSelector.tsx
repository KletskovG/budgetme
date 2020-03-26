import React from 'react'
import ITransactionSelector from './Interfaces/ITransactionSelector';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import {TransactionSelectorStyle as styles} from './styles/TransactionSelector';
import { mainBrandColor } from '../../../shared/styles/mainStyle';

const TransactionSelector = ({buttons, change }: ITransactionSelector) => {
  const SelectButton = ({text, isActive}: any) => {
    return (
      <TouchableOpacity
        style={computeStyle(isActive)}
        onPress={() => change(text)}>
        <Text style={{color: isActive ? 'white' : 'black'}}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const computeStyle = (isAcitve: boolean) => {
    const blockStyles = {...styles.block};
    blockStyles.backgroundColor = isAcitve? mainBrandColor: 'white';
    
    return StyleSheet.flatten([blockStyles]);
  }

  // useEffect(() => {}, [buttons])


  return (
    <View style={{flexDirection: 'row', marginTop: 10, position: 'relative'}}>
      <FlatList 
        data={buttons}
        renderItem={({item}) => <SelectButton text={item.title} isActive={item.isActive}/>}
        horizontal={true}
      />
    </View>
  );
}

export default TransactionSelector;

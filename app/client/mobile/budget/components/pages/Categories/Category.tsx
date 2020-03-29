import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ICategory from '../../../interfaces/ICategory';
import {CategoryStyles as styles} from './styles/Category';
import { useDispatch } from 'react-redux';
import { DeleteCategoryAction } from '../../../store/Categories/actions/deleteCategoryAction';

const Category = ({category}: {category: ICategory}) => {
  const str = `${category.emoji} ${category.name}`;
  const dispatch = useDispatch();
  const deleteCategory = (id: string) => {
    return Alert.alert(`Delete ${str}?`, '', [
      { text: 'OK', onPress: () => dispatch(DeleteCategoryAction(id)) },
      { text: 'cancel', onPress: () => console.log('Cancel was pressed') },
    ]);
  }

  return (
    <TouchableOpacity 
    style={styles.container}
      onLongPress={() => deleteCategory(`${category._id}`)}>
      <Text style={styles.text}>{str}</Text>
    </TouchableOpacity>
  );
}

export default Category;

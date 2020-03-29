import React from 'react'
import { View, Text } from 'react-native';
import ICategory from '../../../interfaces/ICategory';

const Category = ({category}: {category: ICategory}) => {
  const str = `${category.emoji} ${category.name}`;

  return (
    <View>
      <Text>{str}</Text>
    </View>
  );
}

export default Category;

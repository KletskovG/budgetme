import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/typeFunctions';
import ICategory from '../../../interfaces/ICategory';
import { GetCategoriesAction } from '../../../store/Categories/actions/getCategoriesAction';
import {CategoriesStyles as styles} from './styles/Categories';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import CreateCategory from './CreateCategory';
import CreateWallet from '../Wallets/CreateWallet';
import Category from './Category';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoriesState);
  const [expenses, setExpenses] = useState<ICategory[]>([]);
  const [incomes, setIncomes] = useState<ICategory[]>([]);
  const [isCreateActive, setCreate] = useState<boolean>(false);

  useEffect(() => {
    setExpenses(categories.expenses);
    setIncomes(categories.incomes);
  }, [categories])
  
  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [])
  return (
    <View style={styles.container}>
      {[...expenses, ...incomes].length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.text}>You dont have any categories ☹️</Text>
        </View>
      ) : (
        <FlatList
          data={[...expenses, ...incomes]}
          renderItem={({item}) => <Category category={item} />}
          keyExtractor={(item, index) => `${item._id}`}
          key={(index: number) => index}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => setCreate(true)}>
        <Text style={styles.addText}>Add category</Text>
      </TouchableOpacity>

      <CreateCategory isVisible={isCreateActive} setVisible={setCreate} />
    </View>
  );
}

export default Categories;

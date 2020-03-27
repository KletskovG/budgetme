import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/typeFunctions';
import ICategory from '../../../interfaces/ICategory';
import { GetCategoriesAction } from '../../../store/Categories/actions/getCategoriesAction';
import {CategoriesStyles as styles} from './styles/Categories';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CreateCategory from './CreateCategory';
import CreateWallet from '../Wallets/CreateWallet';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoriesState);
  const [expenses, setExpenses] = useState<ICategory[]>([]);
  const [incomes, setIncomes] = useState<ICategory[]>([]);
  const plusIconSource = require('../../../assets/images/Plus.png');
  useEffect(() => {
    setExpenses(categories.expenses);
    setIncomes(categories.incomes);
  }, [categories])
  
  useEffect(() => {
    dispatch(GetCategoriesAction());
  }, [])
  return (
    <View style={{flex: 1}}>
      <View>
        <Text style={styles.sectionTitle}>Income</Text>
        <TouchableOpacity style={styles.addButton}>
          <Image source={plusIconSource} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Expense</Text>
        <TouchableOpacity style={styles.addButton}>
          <Image source={plusIconSource} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <CreateCategory />
    </View>
  );
}

export default Categories;

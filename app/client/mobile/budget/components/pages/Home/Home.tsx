import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Summary from './Summary';
import Categories from '../Categories/Categories';

const HomeStack = createStackNavigator();

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <HomeStack.Navigator initialRouteName={'Categories'}>
        <HomeStack.Screen name={'Summary'} component={Summary} />
        <HomeStack.Screen name={'Categories'} component={Categories} />
      </HomeStack.Navigator>
    </View>
  );
}

export default Home;
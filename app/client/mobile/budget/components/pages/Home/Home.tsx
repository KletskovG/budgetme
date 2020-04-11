import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Summary from './Summary';
import Categories from '../Categories/Categories';
import CalendarScreen from './Calendar';

const HomeStack = createStackNavigator();

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <HomeStack.Navigator initialRouteName={'Calendar'}>
        <HomeStack.Screen name={'Summary'} component={Summary} />
        <HomeStack.Screen name={'Calendar'} component={CalendarScreen} />
      </HomeStack.Navigator>
    </View>
  );
}

export default Home;
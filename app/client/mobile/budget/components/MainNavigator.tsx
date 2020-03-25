import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home/Home';
import Wallets from './pages/Wallets/Wallets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wallets" component={Wallets} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
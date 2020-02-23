import React from 'react';
import 'react-native-gesture-handler';
import Home from './components/pages/Home/Home';
import AppNavigator from './Stack';
import Wallets from './components/pages/Wallets/Wallets';
import AuthPage from './components/pages/Auth/Auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthPage} />
        <Stack.Screen name="Main" component={Home} />
        <Stack.Screen name="Wallets" component={Wallets} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <MyStack/>
  );
};

export default App;

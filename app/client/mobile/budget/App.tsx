import React, {useState} from 'react';
import 'react-native-gesture-handler';
import Home from './components/pages/Home/Home';
import Wallets from './components/pages/Wallets/Wallets';
import AuthPage from './components/pages/Auth/Auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './shared/components/navigation';
import {View, StyleSheet, Text} from 'react-native';


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainNavigator from './components/MainNavigator';


const App = () => {
  let [isAuth, setAuth] = useState(true);

  const authUser = () => {
    setAuth(() => (isAuth = false));
  };

  const MyStack = () => {
    if (isAuth) {
      return <AuthPage navigateToHome={authUser} />;
    } else {
      return (
        <MainNavigator />
      );
    }
  };

  return <MyStack />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

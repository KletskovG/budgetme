import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home/Home';
import Wallets from './pages/Wallets/Wallets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-around'}}>
      <TouchableOpacity style={{flex: 1}}>
        <Image
          source={require('../assets/images/wallet.png')}
          style={{width: 30, height: 30}}></Image>
      </TouchableOpacity>
    </View>
  );
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}: any) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string;

            if (route.name === 'Wallets') {
              iconName = '../assets/images/wallet.png';
              return (
                <Image
                  source={require('../assets/images/wallet.png')}
                  style={{width: 30, height: 30}}></Image>
              );
            } else if (route.name === 'Home') {
              return (
                <Image
                  source={require('../assets/images/home.png')}
                  style={{width: 30, height: 30}}></Image>
              );
            }

            return <Text></Text>;
          },
          tabBarLabel: ''
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen name="Wallets" component={Wallets} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
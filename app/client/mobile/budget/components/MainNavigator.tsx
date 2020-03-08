import { View, Text, Settings } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home/Home';
import { createStackNavigator } from '@react-navigation/stack';
import Wallets from './pages/Wallets/Wallets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();

// const Feed = ({navigation}) => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text> Feed page </Text>
//       <Text onPress={() => navigation.navigate('Messages')}> Go to messages! </Text>
//     </View>
//   )
// }


// const Messages = () => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text> Messages page </Text>
//     </View>
//   );
// };

// const HomeScreen = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Feed" component={Feed} />
//       <Stack.Screen name="Messages" component={Messages} />
//     </Stack.Navigator>
//   );
// }

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
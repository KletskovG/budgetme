import React, {useState} from 'react';
import 'react-native-gesture-handler';
import Home from './components/pages/Home/Home';
import Wallets from './components/pages/Wallets/Wallets';
import AuthPage from './components/pages/Auth/Auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './shared/components/navigation';
import {View, StyleSheet} from 'react-native';

const Stack = createStackNavigator();

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
        <View>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" component={Home} />
              <Stack.Screen name="Wallets" component={Wallets} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
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

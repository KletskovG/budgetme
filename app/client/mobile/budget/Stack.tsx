import {createStackNavigator} from 'react-navigation-stack';
import {NavigationContainer} from 'react-navigation';
import Home from './components/pages/Home/Home';
import Wallets from './components/pages/Wallets/Wallets';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Wallets: {screen: Wallets},
});

const myStack = () => {

}

export default AppNavigator;

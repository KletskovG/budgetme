import React, {useState} from 'react';
import 'react-native-gesture-handler';
import AuthPage from './components/pages/Auth/Auth';
import {StyleSheet} from 'react-native';
import MainNavigator from './components/MainNavigator';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import {WalletReducer} from './store/Wallet/walletReducer';
import thunk from 'redux-thunk';
import { HomeReducer } from './store/Home/homeReducer';
import { AuthReducer } from './store/Auth';
import { CategoriesReducer } from './store/Categories/CategoriesReducer';


const rootReducer = combineReducers({
  walletState: WalletReducer,
  homeState: HomeReducer,
  authState: AuthReducer,
  categoriesState: CategoriesReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));

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

  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

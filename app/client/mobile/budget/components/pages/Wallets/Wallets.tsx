import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Wallet from './Wallet';
import IWallet from 'interfaces/IWallet';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {mainGreenColor} from '../../../shared/styles/mainStyle';
import CreateWallet from './CreateWallet';
import {config} from '../../../core/config';

const Wallets = () => {
  let [wallets, setWallets] = useState<IWallet[] | IWallet[]>([]);
  let [requestCount, setRequest] = useState<number | number>(0);
  let [isCreateWallet, setToggle] = useState<boolean | boolean>(false);

  async function getWallets() {
    const email = await AsyncStorage.getItem('@email');
    console.log('Trying to get wallets');
    //kletskovg.tech:5051/wallet/dim.drakon2013@yandex.ru
    http: fetch(`${config.baseUrl}/user/${email}/wallets`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        if (res) {
          setWallets(res);
          console.log(res);
        } else {
          setWallets([]);
        }
        setRequest(requestCount + 1);
      })
      .catch((err: Error) => {
        setWallets([]);
        console.log(err); // TODO: replace with FrontEnd log
      });
  }

  const addWallet = async (name: string) => {
    const email = await AsyncStorage.getItem('@email');
    console.log(name);
    const newWallet: IWallet = {
      name,
      expenses: [],
      incomes: [],
      amount: 0,
      owner: `${email}`,
    };

    fetch(`${config.baseUrl}/wallet/create`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          setWallets([...wallets, newWallet]);
        } else {
          return Alert.alert('Add Error server');
        }
      })
      .catch((err: Error) => {
        console.log(err);
        return Alert.alert('Add Error promise');
      });
  };

  // getWallets();

  useEffect(() => {
    getWallets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (wallets.length > 0) {
    return (
      <FlatList
        data={wallets}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Text> You dont have any wallets </Text>
        <Text
          onPress={() => setToggle(!isCreateWallet)}
          style={styles.createButton}>
          {' '}
          Create one!{' '}
        </Text>

        {isCreateWallet ? (
          <CreateWallet
            setModal={setToggle}
            isModalVisible={isCreateWallet}
            addWallet={addWallet}
          />
        ) : (
          <Text style={{display: 'none'}} />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: mainGreenColor,
    padding: 5,
    color: 'white',
    width: '50%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Wallets;

import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text> Hello world </Text>
      <Button 
        title="Go to wallets"
        onPress={() => navigation.navigate('Wallets')}/> 
    </View>
  )
}

export default Home;
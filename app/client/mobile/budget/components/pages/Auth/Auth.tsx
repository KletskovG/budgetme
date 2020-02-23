import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpForm from './SignUpForm';

const AuthPage = () => {
  return (
    <View style={styles.container}>
      <Text> Welcome to Budget App! </Text>
      <Text> Sign up or sign in </Text>
      <SignUpForm />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AuthPage;

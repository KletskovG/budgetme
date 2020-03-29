import { StyleSheet, Dimensions } from "react-native";

export const CategoryStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: Dimensions.get('window').width,
    padding: 10,
  },
  text: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
  }
});
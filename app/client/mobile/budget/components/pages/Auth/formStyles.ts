import { StyleSheet } from "react-native";

const baseInput = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export const errorStyles = StyleSheet.create({
  text: {
    display: 'flex',
    color: 'red',
    marginBottom: 20,
  },
  textHidden: {
    display: 'none',
    color: 'red',
  },
});

export const emailInputStyles = StyleSheet.create({
  emailInput: {
    ...baseInput.input,
    marginBottom: 20,
  },
  emailInputOnError: {
    ...baseInput.input,
  },
});
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 5,
  },
  expenseContainer: {
    // flexDirection: 'row',
  },
  expenseContainerChild: {
    flexDirection: 'row',
    marginTop: 10,
    position: 'relative',
  },
  expenseBlock: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'red',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    textAlign: 'center',
    color: 'white',
    borderRadius: 5,
    marginTop: 10,
    width: '35%',
    alignItems: 'center',
  },
  baseInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginTop: 10,
  },
});
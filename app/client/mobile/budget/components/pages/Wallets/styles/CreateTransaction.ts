import { StyleSheet, Dimensions } from "react-native";
import basicStyle from "../../../../shared/styles/mainStyle";

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
    paddingTop: 5,
    borderRadius: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    ...basicStyle.baseInput,
  }
});
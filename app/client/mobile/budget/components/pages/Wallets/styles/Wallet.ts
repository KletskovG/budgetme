import { StyleSheet, Dimensions } from "react-native";
import { mainTextColor, mainGreenColor } from "../../../../shared/styles/mainStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  balanse: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: mainTextColor,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 15,
    marginBottom: 30,
  },
  baseText: {
    fontSize: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    borderRadius: 50,
    padding: 10,
    backgroundColor: mainGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    zIndex: 2,
  },
  addButtonText: {
    color: 'white',
    transform: [{rotate: '90deg'}],
    fontWeight: 'bold',
    fontSize: 20,
  },
  addButtonText2: {
    transform: undefined,
  },
  transactions: {
    width: Dimensions.get('window').width,
  }
});

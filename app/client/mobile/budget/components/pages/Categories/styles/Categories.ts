import { StyleSheet, Dimensions } from "react-native";
import { mainGreenColor } from "../../../../shared/styles/mainStyle";
const buttonSize = 40;

export const CategoriesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: Dimensions.get('window').width * 0.5,
    height: buttonSize,
    backgroundColor: mainGreenColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    width: buttonSize / 2,
    height: buttonSize / 2,
  },
  sectionTitle: {
    fontSize: 25,
  },
  text: {
    color: '#AAA8A5',
    fontSize: 25,
    textAlign: 'center',
  },
  addText: {
    color: 'white',
  },
});
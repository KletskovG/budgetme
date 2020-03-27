import { StyleSheet } from "react-native";
import { mainGreenColor } from "../../../../shared/styles/mainStyle";
const buttonSize = 40;

export const CategoriesStyles = StyleSheet.create({
  addButton: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: mainGreenColor,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: buttonSize / 2,
    height: buttonSize / 2,
  },
  sectionTitle: {
    fontSize: 25,

  }
});
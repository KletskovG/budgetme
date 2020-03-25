import { StyleSheet } from "react-native";

export const SummaryBlockStyles = StyleSheet.create({
  summaryBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fafafa',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 30,
    height: 20,
    marginLeft: 10,
  }
});
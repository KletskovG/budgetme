import { StyleSheet } from "react-native";

export const SummaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanse: {},
  balanseText: {
    fontSize: 25,
  },
  summaryDate: {
    flexDirection: 'row',
  },
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
});
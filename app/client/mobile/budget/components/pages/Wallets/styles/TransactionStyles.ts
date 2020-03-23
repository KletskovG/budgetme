import { StyleSheet } from "react-native";
import { mainBrandColor, palletteColor } from "../../../../shared/styles/mainStyle";

export const TransactionStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: palletteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  transactionText: {},
});
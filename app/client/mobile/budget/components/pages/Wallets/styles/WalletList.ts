import { StyleSheet } from "react-native";
import { mainGreenColor } from "../../../../shared/styles/mainStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
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
  walletName: {
    fontSize: 20,
  },
  walletAmount: {
    fontSize: 20,
  },
  createButton: {
    backgroundColor: mainGreenColor,
    padding: 5,
    color: 'white',
    width: '50%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 50,
    borderRadius: 5,
    alignSelf: 'center',
  },
});

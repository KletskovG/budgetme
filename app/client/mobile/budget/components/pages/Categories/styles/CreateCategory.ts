import { StyleSheet, Dimensions } from "react-native";

export const CreateCategoryStyles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInput: {
    width: Dimensions.get('window').width * 0.7,
    borderRadius: 10,
    backgroundColor: '#F3F4F5',
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  emoji: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#F1F2F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  emojiText: {
    fontSize: 25,
  },
  buttons: {
    flexDirection: 'row',
    // width: '100%',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 50,
  },
  buttonsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 25,
  }
});
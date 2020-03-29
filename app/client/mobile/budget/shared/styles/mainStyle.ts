import { StyleSheet, Dimensions } from "react-native";


const basicStyle = StyleSheet.create({
  baseInput: {
    width: Dimensions.get('window').width * 0.7,
    borderRadius: 10,
    backgroundColor: '#F3F4F5',
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

export const mainBrandColor = '#0169FF';
export const whiteColor = '#FFFFFF';
export const mainGreenColor = '#17CE72';
export const mainTextColor = '#676767';
export const palletteColor = '#FAF8FF';

export default basicStyle;
import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { mainTextColor, mainBrandColor } from '../../../shared/styles/mainStyle';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  text: {
    fontSize: 20,
  }
});

interface LineSwitchProps {
  title: string;
  change(): void
}

const LineSwitch: React.FC<LineSwitchProps> = ({title, change}) => {
  const [isEnabled, setEnabled] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Switch
        trackColor={{false: 'white', true: '#4CD964'}}
        thumbColor={'#fff'}
        ios_backgroundColor={`#FDFDFD`}
        onValueChange={() => {
          change();
          setEnabled(!isEnabled);
        }}
        value={isEnabled}
      />
    </View>
  );
}

export default LineSwitch;

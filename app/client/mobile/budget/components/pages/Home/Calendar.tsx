import React from 'react'
import {CalendarList, Calendar} from 'react-native-calendars';
import { View } from 'react-native';
import { DateRangePicker } from '../../../shared';


const CalendarScreen: React.FC<any> = () => {
  const changeDay = (fromDate: any, dateString: any) => {
    console.log(fromDate);
    console.log(dateString);
  }
  
  
  return (
    <View>
      <DateRangePicker
        initialRange={['2018-04-01', '2018-04-10']}
        onSuccess={(s, e) => {
          console.log(s)
          console.log(e)
        }}
        theme={{markColor: 'red', markTextColor: 'white'}}
      />
    </View>
  );
}

export default CalendarScreen;
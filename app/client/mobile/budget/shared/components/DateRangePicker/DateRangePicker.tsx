import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import XDate from 'xdate';
interface DateRangePickerProps {
  onSuccess(fromDate: string, dateString: string): void;
  initialRange: any[];
  theme: {
    markColor: string;
    markTextColor: string;
  }
}
const DateRangePicker: React.FC<DateRangePickerProps> = ({onSuccess, initialRange, theme}) => {
  const [isFromDatePicked, setFromDatePicked] = useState<boolean>(false);
  const [isToDatePicked, setToDatePicked] = useState<boolean>(false);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [fromDate, setFromDate] = useState<string>('');

  useEffect(() => {
    setupInitialRange();
  }, [])

  const onDayPress = (day:any) => {
    if (
      !isFromDatePicked ||
      (isFromDatePicked && isToDatePicked)
    ) {
      setupStartMarker(day);
    } else if (!isToDatePicked) {
      let _markedDates = {...markedDates};
      let [mMarkedDates, range] = setupMarkedDates(
        fromDate,
        day.dateString,
        _markedDates,
      );
      if (range >= 0) {
        setFromDatePicked(true);
        setToDatePicked(true);
        setMarkedDates(mMarkedDates);
        console.log(mMarkedDates)
        onSuccess(fromDate, day.dateString);
      } else {
        setupStartMarker(day);
      }
    }
  }

  const setupStartMarker = (day: any) => {
    let _markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };
    setFromDatePicked(true);
    setToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(_markedDates);
  };

  const setupMarkedDates = (fromDate: any, toDate: any, markedDates: any) => {
    let mFromDate: any = new XDate(fromDate)
    let mToDate:any = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: theme.markColor,
            textColor: theme.markTextColor,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  const setupInitialRange = () => {
    if (!initialRange) return;
    let [_fromDate, toDate] = initialRange;
    let _markedDates = {
      [_fromDate]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };
    let [mMarkedDates, range] = setupMarkedDates(
      _fromDate,
      toDate,
      _markedDates,
    );
    setMarkedDates(_markedDates);
    setFromDate(_fromDate)
  };
  
  return (
    <CalendarList
      // {...this.props}
      markingType={'period'}
      current={fromDate}
      markedDates={markedDates}
      onDayPress={(day) => {
        onDayPress(day);
      }}
    />
  );
}

export default DateRangePicker;

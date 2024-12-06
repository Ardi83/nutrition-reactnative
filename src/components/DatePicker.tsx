import {useState} from 'react';
import {Platform} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import * as RNLocalize from 'react-native-localize';
import {useAppStore} from '../store';

const DatePicker = ({
  shouldShow,
  setShouldShow,
  submitCallback,
}: {
  shouldShow: boolean;
  setShouldShow: (s: boolean) => void;
  submitCallback?: (d: Date) => void;
}) => {
  const {selectedDate, setSelectedDate} = useAppStore();

  const onChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      setShouldShow(false);
    }

    if (event.type === 'neutralButtonPressed') {
      setSelectedDate(new Date(0));
    } else {
      setSelectedDate(date || new Date());
      if (submitCallback) {
        submitCallback(date || new Date());
      }
    }
  };

  return (
    shouldShow && (
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedDate}
        mode="date"
        display="default"
        is24Hour={true}
        onChange={onChange}
        style={{width: 320, backgroundColor: 'white'}}
      />
    )
  );
};
export default DatePicker;

import {useState} from 'react';
import {Button, Platform, Text, View} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import * as RNLocalize from 'react-native-localize';
import {useAppStore} from '../store';

const DatePicker = ({submitCallback}: {submitCallback?: (d: Date) => void}) => {
  const {selectedDate, setSelectedDate, showCalendar, setShowCalendar} =
    useAppStore();
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const confirmDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (event.type === 'neutralButtonPressed') {
      setSelectedDate(new Date(0));
    } else {
      setSelectedDate(date || new Date());
      console.log('Selected Date:', date?.toLocaleString());
      if (submitCallback) {
        submitCallback(date || new Date());
      }
    }

    if (mode === 'time') {
      setMode('date');
    }
  };

  const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowCalendar(Platform.OS === 'ios');

    if (mode === 'date' && event.type === 'set') {
      showTimePicker();
    }

    if (mode === 'time' && event.type === 'set') {
      confirmDate(event, date);
    }

    if (mode === 'time' && event.type === 'dismissed') {
      setMode('date');
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShowCalendar(true);
    setMode(currentMode);
  };

  const showTimePicker = () => {
    showMode('time');
  };

  return (
    <View>
      {showCalendar && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          display="default"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default DatePicker;

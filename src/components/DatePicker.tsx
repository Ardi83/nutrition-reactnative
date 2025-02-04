import {useState} from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import * as RNLocalize from 'react-native-localize';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';

const DatePicker = ({submitCallback}: {submitCallback?: (d: Date) => void}) => {
  const {selectedDate, setSelectedDate, showCalendar, setShowCalendar} =
    useAppStore();
  const {themeColor} = useStyles();
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const confirmDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (event.type === 'neutralButtonPressed') {
      setSelectedDate(new Date(0));
    } else {
      date && setSelectedDate(date);
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
      date && setSelectedDate(date);
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
      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Select Date
      </Text>
      <TextInput
        style={[styles.input, {color: themeColor.primary.color}]}
        onPress={() => setShowCalendar(true)}>
        <Text>{selectedDate.toLocaleString()}</Text>
      </TextInput>
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

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default DatePicker;

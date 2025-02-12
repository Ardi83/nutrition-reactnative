import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';
import {commonTheme} from '../styles/theme';

const DailyDropdown = ({
  days,
  selectedDay,
}: {
  days: string[];
  selectedDay: (d: string) => void;
}) => {
  const {themeColor} = useStyles();
  const [day, setDay] = React.useState<string>('');
  const onSelectDay = (itemValue: string) => {
    setDay(itemValue);
    selectedDay(itemValue);
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Date (Day)
      </Text>
      <View
        style={[
          styles.pickerContainer,
          {borderColor: themeColor.primary.borderColor},
        ]}>
        <Picker
          selectedValue={day}
          onValueChange={itemValue => onSelectDay(itemValue)}
          style={[styles.picker, {color: themeColor.primary.color}]}>
          {/* Placeholder option */}
          <Picker.Item label="Select Day" value="" enabled={false} />
          {days.map(day => (
            <Picker.Item
              style={{height: 10, padding: 0, margin: 0, overflow: 'hidden'}}
              key={day}
              label={day}
              value={day}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default DailyDropdown;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';
import {commonTheme} from '../styles/theme';

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack',
  Dessert = 'Dessert',
  Brunch = 'Brunch',
  PostWorkout = 'PostWorkout',
  PreWorkout = 'PreWorkout',
  Other = 'Other',
}

const MealTypeDropdown = () => {
  const {themeColor} = useStyles();
  const {
    setMealType,
    createDto: {mealType},
  } = useAppStore();

  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Meal Type
      </Text>
      <View
        style={[
          styles.pickerContainer,
          {borderColor: themeColor.primary.borderColor},
        ]}>
        <Picker
          selectedValue={mealType}
          onValueChange={itemValue => setMealType(itemValue)}
          prompt="Select a meal type"
          style={[styles.picker, {color: themeColor.primary.color}]}>
          {Object.values(MealType).map(mealType => (
            <Picker.Item
              style={{height: 30, padding: 0, margin: 0, overflow: 'hidden'}}
              key={mealType}
              label={mealType}
              value={mealType}
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

export default MealTypeDropdown;

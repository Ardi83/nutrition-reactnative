import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, Alert, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useAppStore} from '../store';
import DatePicker from './DatePicker';
import {getMacronutrientByDate} from '../services';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {theme} from '../styles/theme';
import {Macronutrient, Nutrition} from '../types';

const NutritionScreen = () => {
  const [show, setShow] = useState(false);

  const [nutritionData, setNutritionData] = useState<Macronutrient | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const {userId, selectedDate, setShowCalendar} = useAppStore();
  const fetchMacronutrientByDate = async (date: Date) => {
    const data = await getMacronutrientByDate(date);
    setNutritionData(data);
  };

  const saveNutritionData = async () => {
    try {
      await firestore()
        .collection('Nutritions')
        .doc('Macronutrients')
        .set(
          {
            macronutrient: {
              date: firestore.Timestamp.fromDate(new Date(selectedDate)),
              record: nutritionData,
              user: firestore().doc(`Users/${userId}`),
            },
          },
          {merge: true},
        );

      console.log('Nutrition data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Button
        color={theme.primary_accent}
        onPress={() => setShowCalendar(true)}
        title="Select Date"
      />
      <Text style={{marginTop: 10}}>{selectedDate.toLocaleString()}</Text>
      <DatePicker submitCallback={fetchMacronutrientByDate} />
      {loading && <Text>Loading...</Text>}

      {nutritionData ? (
        <View style={{marginTop: 20}}>
          <Text>Calories: {nutritionData?.calories}</Text>
          <Text>Fats: {nutritionData.fats}</Text>
          <Text>Protein: {nutritionData.protein}</Text>
          <Text>Protein: {nutritionData.carbohydrates}</Text>
        </View>
      ) : (
        !loading && (
          <View style={{marginTop: 20}}>
            <Text>No records found for the selected date.</Text>
            <TextInput
              placeholder="Enter Calories"
              style={{borderBottomWidth: 1, marginBottom: 10}}
            />
            <TextInput
              placeholder="Enter Fats"
              style={{borderBottomWidth: 1, marginBottom: 10}}
            />
            <TextInput
              placeholder="Enter Protein"
              style={{borderBottomWidth: 1, marginBottom: 10}}
            />
            <Button title="Save Record" onPress={saveNutritionData} />
          </View>
        )
      )}
    </View>
  );
};

export default NutritionScreen;

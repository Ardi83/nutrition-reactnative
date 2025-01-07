import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, Alert, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useAppStore} from '../../store';
import DatePicker from '../DatePicker';
import {getAllNutritionLogs, getNutritionByDate} from '../../services/apis';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {theme} from '../../styles/theme';
import {Macronutrient, Nutrition, RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const NutritionScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {userId, selectedDate, setShowCalendar} = useAppStore();

  useEffect(() => {
    (async () => {
      await getAllNutritionLogs();
    })();
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <Button
        title="Create Nutrition Log"
        onPress={() => navigation.navigate('Create')}
      />
      {/* <Text>Calories: {nutritionData?.calories}</Text>
        <Text>Fats: {nutritionData.fats}</Text>
        <Text>Protein: {nutritionData.protein}</Text>
        <Text>Protein: {nutritionData.carbohydrates}</Text> */}
    </View>
  );
};

export default NutritionScreen;

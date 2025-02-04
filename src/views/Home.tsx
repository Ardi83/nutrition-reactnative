import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Pressable, Text} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {getAllNutritionLogs} from '../services/apis';
import {Routes} from '../Routes';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';

type HomeProps = NativeStackScreenProps<Routes, 'Home'>;
const Home: React.FC<HomeProps> = ({navigation}) => {
  const {userId, selectedDate, setShowCalendar} = useAppStore();
  const {buttons} = useStyles();

  useEffect(() => {
    (async () => {
      await getAllNutritionLogs();
    })();
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <Pressable
        style={buttons.button_secondary}
        onPress={() => navigation.navigate('Create')}>
        <Text>+ Add new</Text>
      </Pressable>
      {/* <Text>Calories: {nutritionData?.calories}</Text>
        <Text>Fats: {nutritionData.fats}</Text>
        <Text>Protein: {nutritionData.protein}</Text>
        <Text>Protein: {nutritionData.carbohydrates}</Text> */}
    </View>
  );
};

export default Home;

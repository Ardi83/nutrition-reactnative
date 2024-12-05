import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAppStore} from '../store';

type NutritionData =
  | {
      calories: number;
      fats: number;
      protein: number;
    }
  | null
  | undefined;

const NutritionScreen = () => {
  const [date, setDate] = useState<any>('');
  const [nutritionData, setNutritionData] = useState<NutritionData>(null);
  const [loading, setLoading] = useState(false);
  const {userId} = useAppStore();
  const fetchData = async () => {
    const data = await fetchNutritionData(date);
    setNutritionData(data);
  };

  const fetchNutritionData = async (selectedDate: NutritionData) => {
    try {
      const docSnapshot = await firestore()
        .collection('Nutritions')
        .doc('Macronutrients')
        .get();

      if (docSnapshot.exists) {
        const macronutrient = docSnapshot.data()?.macronutrient;

        // Match user and date
        if (
          macronutrient.user.id === auth().currentUser?.uid &&
          macronutrient.date.toDate().toISOString().split('T')[0] ===
            selectedDate
        ) {
          const {calories, fats, protein} = macronutrient.record;
          console.log('Nutrition Data:', {calories, fats, protein});
          return {calories, fats, protein};
        } else {
          console.log('No matching record found.');
          return null;
        }
      } else {
        console.log('Macronutrients document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveNutritionData = async () => {
    try {
      await firestore()
        .collection('Nutritions')
        .doc('Macronutrients')
        .set(
          {
            macronutrient: {
              date: firestore.Timestamp.fromDate(new Date(date)),
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
      <TextInput
        placeholder="Enter Date (YYYY-MM-DD)"
        value={date}
        onChangeText={text => setDate(text)}
        style={{borderBottomWidth: 1, marginBottom: 20}}
      />
      <Text>{userId}</Text>
      <Button title="Fetch Records" onPress={fetchData} />
      {loading && <Text>Loading...</Text>}

      {nutritionData ? (
        <View style={{marginTop: 20}}>
          <Text>Calories: {nutritionData?.calories}</Text>
          <Text>Fats: {nutritionData.fats}</Text>
          <Text>Protein: {nutritionData.protein}</Text>
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

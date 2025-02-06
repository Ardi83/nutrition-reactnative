import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MealLog, Nutrition } from '../types/index.d';

export const getNutritionByDate = async (selectedDate: Date) => {
  if (!auth().currentUser) {
    Alert.alert('User not authenticated.');
    return null;
  }
  try {
    const docSnapshot = await firestore()
      .collection('Nutritions')
      .doc('Macronutrients')
      .get();

    if (docSnapshot.exists) {
      const macronutrient = docSnapshot.data()?.macronutrient;

      // Match user and date
      // console.log(
      //   macronutrient.date.toDate().toISOString().split('T')[0],
      //   selectedDate?.toISOString().split('T')[0],
      // );
      if (
        macronutrient.user.id === auth().currentUser?.uid &&
        macronutrient.date.toDate().toISOString().split('T')[0] ===
        selectedDate?.toISOString().split('T')[0]
      ) {
        const { calories, fats, protein } = macronutrient.record;
        console.log('Nutrition Data:', { calories, fats, protein });
        return macronutrient.record;
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

export const getAllNutritionLogs = async () => {
  if (!auth().currentUser) {
    console.log('User not authenticated.');
    return null;
  }
  try {
    const userId = auth().currentUser?.uid;
    // Reference to the 'dailyRecords' collection for the user
    const dailyRecordsRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('dailyRecords');

    // Fetch all documents in the 'dailyRecords' collection
    const dailyRecordsSnapshot = await dailyRecordsRef.get();

    if (dailyRecordsSnapshot.empty) {
      console.log('No daily records found.');
      return [];
    }

    // Iterate through each daily record and fetch its logs
    const dailyRecordsWithLogs = await Promise.all(
      dailyRecordsSnapshot.docs.map(async dailyRecordDoc => {
        const date = dailyRecordDoc.id; // Get the document ID (date)
        const dailyRecordData = dailyRecordDoc.data();

        // Reference to the 'logs' subcollection
        const logsRef = dailyRecordsRef.doc(date).collection('logs');

        // Fetch all documents in the 'logs' subcollection
        const logsSnapshot = await logsRef.get();

        const logs = logsSnapshot.docs.map(logDoc => ({
          id: logDoc.id,
          ...logDoc.data(),
          dateTime: new Date(logDoc.data().dateTime.seconds * 1000),
        })) as MealLog[];

        const allNutritionLogs = {
          date,
          dailyRecord: { ...dailyRecordData, logs },
        } as Nutrition;

        // Return the daily record along with its logs
        return allNutritionLogs;
      }),
    );

    console.log('Fetched daily records with logs:', dailyRecordsWithLogs);
    return dailyRecordsWithLogs;
  } catch (error) {
    console.error('Error fetching daily records and logs:', error);
    throw error;
  }
};

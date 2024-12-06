import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getMacronutrientByDate = async (selectedDate: Date) => {
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
      console.log(
        macronutrient.date.toDate().toISOString().split('T')[0],
        selectedDate?.toISOString().split('T')[0],
      );
      if (
        macronutrient.user.id === auth().currentUser?.uid &&
        macronutrient.date.toDate().toISOString().split('T')[0] ===
          selectedDate?.toISOString().split('T')[0]
      ) {
        const {calories, fats, protein} = macronutrient.record;
        console.log('Nutrition Data:', {calories, fats, protein});
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

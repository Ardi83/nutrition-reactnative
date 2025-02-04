import firestore from '@react-native-firebase/firestore';
import {useAppStore} from '../store';

export const addUserCollection = async (userCredential: any) => {
  const {uid, displayName, email} = userCredential.user;
  const userDocRef = firestore().collection('users').doc(uid);

  const userDoc = await userDocRef.get();
  console.log('User document:', userDoc.data());

  if (!userDoc.exists) {
    const res = await userDocRef.set({
      id: uid,
      name: displayName || 'Anonymous',
      email: email || 'No Email Provided',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('User document created in Firestore', res);
    // await addDailyRecordAndLog(uid);
  } else {
    console.log('User already exists in Firestore');
  }
};

const addDailyRecordAndLog = async (userId: string) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    const timestamp = firestore.FieldValue.serverTimestamp();

    // Reference to the dailyRecord document
    const dailyRecordRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('dailyRecords')
      .doc(today);

    // Check if the dailyRecord exists
    const dailyRecordDoc = await dailyRecordRef.get();

    if (!dailyRecordDoc.exists) {
      // Create the daily record if it doesn't exist
      await dailyRecordRef.set({
        date: today,
        totalCalories: 0,
        macronutrients: {
          colories: 0,
          carbs: 0,
          proteins: 0,
          fats: 0,
          fiber: 0,
          suger: 0,
        },
        micronutrients: {
          water: 0,
          vitaminA: 0,
          vitaminC: 0,
          vitaminD: 0,
          vitaminE: 0,
        },
        createdAt: timestamp,
      });

      console.log('Daily record created for:', today);
    }

    // Add a new log entry to the logs subcollection
    const logsRef = dailyRecordRef.collection('logs');
    await logsRef.add({
      timestamp: timestamp, // Current time
      mealType: 'unknown', // e.g., "breakfast", "lunch", etc.
      macronutrients: {
        colories: 0,
        carbs: 0,
        proteins: 0,
        fats: 0,
        fiber: 0,
        suger: 0,
      },
      micronutrients: {
        water: 0,
        vitaminA: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
      },
    });

    console.log('Log entry added.');
  } catch (error) {
    console.error('Error adding daily record or log:', error);
  }
};

export const saveLog = async () => {
  const {
    userId,
    selectedDate,
    createDto: {
      mealType,
      macronutrients: {calories, fats, proteins, carbs, fiber, suger},
      micronutrients: {vitaminA, vitaminC, vitaminD, vitaminE, water},
    },
  } = useAppStore.getState();

  try {
    if (!mealType) {
      return {success: false, message: 'Meal type is required.'};
    }

    const selectedDay = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const dailyRecordRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('dailyRecords')
      .doc(selectedDay);

    // Check if the daily record exists
    const dailyRecordDoc = await dailyRecordRef.get();

    if (!dailyRecordDoc.exists) {
      // Create daily record if not present
      await dailyRecordRef.set({
        date: selectedDay,
        macronutrients: {
          calories: parseFloat(calories) || 0,
          fats: parseFloat(fats) || 0,
          proteins: parseFloat(proteins) || 0,
          carbs: parseFloat(carbs) || 0,
          fiber: parseFloat(fiber) || 0,
          suger: parseFloat(suger) || 0,
        },
        micronutrients: {
          vitaminA: parseFloat(vitaminA) || 0,
          vitaminC: parseFloat(vitaminC) || 0,
          vitaminD: parseFloat(vitaminD) || 0,
          vitaminE: parseFloat(vitaminE) || 0,
          water: parseFloat(water) || 0,
        },
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // Update existing daily record
      await dailyRecordRef.update({
        'macronutrients.calories': firestore.FieldValue.increment(
          parseFloat(calories) || 0,
        ),
        'macronutrients.fats': firestore.FieldValue.increment(
          parseFloat(fats) || 0,
        ),
        'macronutrients.proteins': firestore.FieldValue.increment(
          parseFloat(proteins) || 0,
        ),
        'macronutrients.carbs': firestore.FieldValue.increment(
          parseFloat(carbs) || 0,
        ),
        'macronutrients.fiber': firestore.FieldValue.increment(
          parseFloat(fiber) || 0,
        ),
        'macronutrients.suger': firestore.FieldValue.increment(
          parseFloat(suger) || 0,
        ),
        'micronutrients.vitaminA': firestore.FieldValue.increment(
          parseFloat(vitaminA) || 0,
        ),
        'micronutrients.vitaminC': firestore.FieldValue.increment(
          parseFloat(vitaminC) || 0,
        ),
        'micronutrients.vitaminD': firestore.FieldValue.increment(
          parseFloat(vitaminD) || 0,
        ),
        'micronutrients.vitaminE': firestore.FieldValue.increment(
          parseFloat(vitaminE) || 0,
        ),
        'micronutrients.water': firestore.FieldValue.increment(
          parseFloat(water) || 0,
        ),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    }

    // Add a log to the logs subcollection
    const logsRef = dailyRecordRef.collection('logs');
    await logsRef.add({
      timestamp: selectedDate,
      mealType,
      macronutrients: {
        calories: parseFloat(calories) || 0,
        fats: parseFloat(fats) || 0,
        proteins: parseFloat(proteins) || 0,
        carbs: parseFloat(carbs) || 0,
        fiber: parseFloat(fiber) || 0,
        suger: parseFloat(suger) || 0,
      },
      micronutrients: {
        vitaminA: parseFloat(vitaminA) || 0,
        vitaminC: parseFloat(vitaminC) || 0,
        vitaminD: parseFloat(vitaminD) || 0,
        vitaminE: parseFloat(vitaminE) || 0,
        water: parseFloat(water) || 0,
      },
    });

    return {success: true, message: 'Log added successfully!'};
  } catch (error) {
    console.error('Error adding log:', error);
    return {success: false, message: 'Failed to add log. Please try again.'};
  }
};

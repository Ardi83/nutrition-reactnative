import firestore from '@react-native-firebase/firestore';
import {useAppStore} from '../store';
import {NotificationType, LoadingStatus} from '../types/index.d';

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

export const saveLog = async () => {
  const {
    userId,
    selectedDate,
    createDto: {
      mealType,
      macronutrients: {calories, fats, proteins, carbs, fiber, suger},
      micronutrients: {vitaminA, vitaminC, vitaminD, vitaminE, water},
    },
    setLoading,
    setInfo,
  } = useAppStore.getState();

  try {
    const requiredFields = [
      {key: 'Date', value: selectedDate},
      {key: 'Fats', value: fats},
      {key: 'Proteins', value: proteins},
      {key: 'Carbs', value: carbs},
      {key: 'Fiber', value: fiber},
    ];
    const missingFields = requiredFields
      .filter(field => !field.value)
      .map(field => field.key);
    console.log(missingFields, 'missingFields');
    if (missingFields.length) {
      setLoading(false, LoadingStatus.Error);
      setInfo(
        NotificationType.Error,
        `Missing required fields: ${missingFields.join(', ')}`,
      );
      return;
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
    setLoading(false, LoadingStatus.Success);
    setInfo(NotificationType.Success, 'Log added successfully!');
    return {success: true, message: 'Log added successfully!'};
  } catch (error) {
    setLoading(false, LoadingStatus.Error);
    setInfo(NotificationType.Error, 'Failed to add log. Please try again.');
    console.error('Error adding log:', error);
    return {success: false, message: 'Failed to add log. Please try again.'};
  }
};

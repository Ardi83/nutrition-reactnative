import firestore from '@react-native-firebase/firestore';

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
    await addDailyRecordAndLog(uid);
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
          carbs: 0,
          proteins: 0,
          fats: 0,
        },
        micronutrients: {},
        fiber: 0,
        water: 0,
        phytochemicals: 0,
        probiotics_prebiotics: 0,
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
        carbs: 0,
        proteins: 0,
        fats: 0,
      },
      micronutrients: {},
      fiber: 0,
      water: 0,
      phytochemicals: 0,
      probiotics_prebiotics: 0,
    });

    console.log('Log entry added.');
  } catch (error) {
    console.error('Error adding daily record or log:', error);
  }
};

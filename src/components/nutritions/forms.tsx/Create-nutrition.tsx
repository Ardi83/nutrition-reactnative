import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useAppStore} from '../../../store';

const CreateForm = () => {
  const [mealType, setMealType] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [fiber, setFiber] = useState('');
  const [water, setWater] = useState('');

  const {userId} = useAppStore();

  const handleSubmit = async () => {
    try {
      if (!mealType) {
        Alert.alert('Error', 'Meal type is required.');
        return;
      }

      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const dailyRecordRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('dailyRecords')
        .doc(today);

      // Check if the daily record exists
      const dailyRecordDoc = await dailyRecordRef.get();

      if (!dailyRecordDoc.exists) {
        // Create daily record if not present
        await dailyRecordRef.set({
          date: today,
          totalCalories: 0,
          macronutrients: {carbs: 0, proteins: 0, fats: 0},
          micronutrients: {},
          fiber: 0,
          water: 0,
          phytochemicals: 0,
          probiotics_prebiotics: 0,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      // Add a log to the logs subcollection
      const logsRef = dailyRecordRef.collection('logs');
      await logsRef.add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        mealType,
        macronutrients: {
          carbs: parseFloat(carbs) || 0,
          proteins: parseFloat(proteins) || 0,
          fats: parseFloat(fats) || 0,
        },
        fiber: parseFloat(fiber) || 0,
        water: parseFloat(water) || 0,
      });

      Alert.alert('Success', 'Log added successfully!');
      // Reset form fields
      setMealType('');
      setCarbs('');
      setProteins('');
      setFats('');
      setFiber('');
      setWater('');
    } catch (error) {
      console.error('Error adding log:', error);
      Alert.alert('Error', 'Failed to add log. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Type</Text>
      <TextInput
        style={styles.input}
        value={mealType}
        onChangeText={setMealType}
        placeholder="e.g., Breakfast, Lunch, Dinner"
      />

      <Text style={styles.label}>Carbs (grams)</Text>
      <TextInput
        style={styles.input}
        value={carbs}
        onChangeText={setCarbs}
        placeholder="e.g., 50"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Proteins (grams)</Text>
      <TextInput
        style={styles.input}
        value={proteins}
        onChangeText={setProteins}
        placeholder="e.g., 20"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fats (grams)</Text>
      <TextInput
        style={styles.input}
        value={fats}
        onChangeText={setFats}
        placeholder="e.g., 10"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fiber (grams)</Text>
      <TextInput
        style={styles.input}
        value={fiber}
        onChangeText={setFiber}
        placeholder="e.g., 5"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Water (ml)</Text>
      <TextInput
        style={styles.input}
        value={water}
        onChangeText={setWater}
        placeholder="e.g., 500"
        keyboardType="numeric"
      />

      <Button title="Save Log" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default CreateForm;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NutritionUnit, useAppStore} from '../../../store';
import MealTypeDropdown from '../../MealTypeDropdown';
import {useStyles} from '../../../styles/styles';
import DatePicker from '../../DatePicker';
import {saveLog} from '../../../services/service';

const CreateForm = () => {
  const {themeColor} = useStyles();
  const {
    createDto: {
      mealType,
      macronutrients: {calories, carbs, proteins, fats, fiber, suger},
      micronutrients: {vitaminA, vitaminC, vitaminD, vitaminE, water},
    },
    setCalories,
    setCarbs,
    setProteins,
    setFats,
    setFiber,
    setSuger,
    setVitaminA,
    setVitaminC,
    setVitaminD,
    setVitaminE,
    setWater,
  } = useAppStore();

  const {userId} = useAppStore();

  const handleSubmit = async () => {
    const dd = useAppStore.getState().createDto;
    console.log('create dto submit', dd);
    const res = await saveLog();
    console.log('res', res);
    return;
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
          macronutrients: {
            calories: 0,
            fats: 0,
            proteins: 0,
            carbs: 0,
            fiber: 0,
            suger: 0,
          },
          micronutrients: {
            vitaminA: 0,
            vitaminC: 0,
            vitaminD: 0,
            vitaminE: 0,
            water: 0,
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      // Add a log to the logs subcollection
      const logsRef = dailyRecordRef.collection('logs');
      await logsRef.add({
        timestamp: firestore.FieldValue.serverTimestamp(),
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

      Alert.alert('Success', 'Log added successfully!');
      // Reset form fields
      setCalories('');
      setFats('');
      setProteins('');
      setCarbs('');
      setFiber('');
      setSuger('');
      setVitaminA('');
      setVitaminC('');
      setVitaminD('');
      setVitaminE('');
      setWater('');
    } catch (error) {
      console.error('Error adding log:', error);
      Alert.alert('Error', 'Failed to add log. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[themeColor.primary, {flex: 1}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{padding: 16}}>
        <View style={[styles.container]}>
          <DatePicker />
          <MealTypeDropdown />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Calories ({NutritionUnit.calories})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={calories}
            onChangeText={setCalories}
            placeholder="e.g., 50"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Fats ({NutritionUnit.fats})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={fats}
            onChangeText={setFats}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Carbohydrates ({NutritionUnit.carbs})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={carbs}
            onChangeText={setCarbs}
            placeholder="e.g., 50"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Proteins ({NutritionUnit.proteins})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={proteins}
            onChangeText={setProteins}
            placeholder="e.g., 20"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Fiber ({NutritionUnit.fiber})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={fiber}
            onChangeText={setFiber}
            placeholder="e.g., 5"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Suger ({NutritionUnit.suger})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={suger}
            onChangeText={setSuger}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin A
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminA}
            onChangeText={setVitaminA}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin C
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminC}
            onChangeText={setVitaminC}
            placeholder="e.g., 20"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin D
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminD}
            onChangeText={setVitaminD}
            placeholder="e.g., 5"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin E
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminE}
            onChangeText={setVitaminE}
            placeholder="e.g., 15"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Water ({NutritionUnit.water})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={water}
            onChangeText={setWater}
            placeholder="e.g., 500"
            keyboardType="numeric"
          />

          <Button title="Save Log" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default CreateForm;

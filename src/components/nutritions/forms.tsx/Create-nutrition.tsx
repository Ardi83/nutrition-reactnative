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
import {LoadingStatus} from '../../../types/index.d';

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
    loading: {loading},
    setLoading,
  } = useAppStore();

  const handleSubmit = async () => {
    setLoading(true, LoadingStatus.Pending);
    const dd = useAppStore.getState().createDto;
    console.log('create dto submit', dd);
    await saveLog();
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
            onChangeText={t => setCalories(t.replace(',', '.'))}
            placeholder="e.g., 50"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Fats ({NutritionUnit.fats}) *
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={fats}
            onChangeText={t => setFats(t.replace(',', '.'))}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Carbohydrates ({NutritionUnit.carbs}) *
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={carbs}
            onChangeText={t => setCarbs(t.replace(',', '.'))}
            placeholder="e.g., 50"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Proteins ({NutritionUnit.proteins}) *
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={proteins}
            onChangeText={t => setProteins(t.replace(',', '.'))}
            placeholder="e.g., 20"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Fiber ({NutritionUnit.fiber}) *
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={fiber}
            onChangeText={t => setFiber(t.replace(',', '.'))}
            placeholder="e.g., 5"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Suger ({NutritionUnit.suger})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={suger}
            onChangeText={t => setSuger(t.replace(',', '.'))}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin A
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminA}
            onChangeText={t => setVitaminA(t.replace(',', '.'))}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin C
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminC}
            onChangeText={t => setVitaminC(t.replace(',', '.'))}
            placeholder="e.g., 20"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin D
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminD}
            onChangeText={t => setVitaminD(t.replace(',', '.'))}
            placeholder="e.g., 5"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Vitamin E
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={vitaminE}
            onChangeText={t => setVitaminE(t.replace(',', '.'))}
            placeholder="e.g., 15"
            keyboardType="numeric"
          />

          <Text style={[styles.label, {color: themeColor.primary.color}]}>
            Water ({NutritionUnit.water})
          </Text>
          <TextInput
            style={[styles.input, themeColor.primary]}
            value={water}
            onChangeText={t => setWater(t.replace(',', '.'))}
            placeholder="e.g., 500"
            keyboardType="numeric"
          />

          <Button disabled={loading} title="Save Log" onPress={handleSubmit} />
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

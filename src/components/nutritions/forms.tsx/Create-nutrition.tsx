import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {NutritionUnit, useAppStore} from '../../../store';
import MealTypeDropdown from '../../MealTypeDropdown';
import {useStyles} from '../../../styles/styles';
import DatePicker from '../../DatePicker';
import {saveLog} from '../../../services/service';
import {LoadingStatus} from '../../../types/index.d';

const CreateForm = () => {
  const {themeColor, variables} = useStyles();
  const {
    createDto,
    selectedDate,
    createDto: {
      macronutrients: {calories, carbs, proteins, fats, fiber, sugar},
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
    setMealLog,
  } = useAppStore();

  const handleSubmit = async () => {
    setLoading(true, LoadingStatus.Pending);

    const res = await saveLog();
    console.log('create dto submit', res?.result);
    if (res && res.success && res.result) {
      console.log('add to store');
      setMealLog({
        id: res.result.id,
        dateTime: selectedDate,
        createdAt: new Date(),
        macronutrients: createDto.macronutrients,
        micronutrients: createDto.micronutrients,
        mealType: createDto.mealType,
      });
    }
  };

  return (
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
        placeholderTextColor={variables.placeholderTextColor}
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
        placeholderTextColor={variables.placeholderTextColor}
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
        placeholderTextColor={variables.placeholderTextColor}
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
        placeholderTextColor={variables.placeholderTextColor}
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
        placeholderTextColor={variables.placeholderTextColor}
        placeholder="e.g., 5"
        keyboardType="numeric"
      />

      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Suger ({NutritionUnit.sugar})
      </Text>
      <TextInput
        style={[styles.input, themeColor.primary]}
        value={sugar}
        onChangeText={t => setSuger(t.replace(',', '.'))}
        placeholderTextColor={variables.placeholderTextColor}
        placeholder="e.g., 10"
        keyboardType="numeric"
      />

      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Vitamin A ({NutritionUnit.vitaminA})
      </Text>
      <TextInput
        style={[styles.input, themeColor.primary]}
        value={vitaminA}
        onChangeText={t => setVitaminA(t.replace(',', '.'))}
        placeholderTextColor={variables.placeholderTextColor}
        placeholder="e.g., 10"
        keyboardType="numeric"
      />

      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Vitamin C ({NutritionUnit.vitaminC})
      </Text>
      <TextInput
        style={[styles.input, themeColor.primary]}
        value={vitaminC}
        onChangeText={t => setVitaminC(t.replace(',', '.'))}
        placeholderTextColor={variables.placeholderTextColor}
        placeholder="e.g., 20"
        keyboardType="numeric"
      />

      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Vitamin D ({NutritionUnit.vitaminD})
      </Text>
      <TextInput
        style={[styles.input, themeColor.primary]}
        value={vitaminD}
        onChangeText={t => setVitaminD(t.replace(',', '.'))}
        placeholderTextColor={variables.placeholderTextColor}
        placeholder="e.g., 5"
        keyboardType="numeric"
      />

      <Text style={[styles.label, {color: themeColor.primary.color}]}>
        Vitamin E ({NutritionUnit.vitaminE})
      </Text>
      <TextInput
        style={[styles.input, themeColor.primary]}
        value={vitaminE}
        onChangeText={t => setVitaminE(t.replace(',', '.'))}
        placeholderTextColor={variables.placeholderTextColor}
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
        placeholderTextColor={variables.placeholderTextColor}
        placeholder="e.g., 500"
        keyboardType="numeric"
      />

      <Button disabled={loading} title="Save Log" onPress={handleSubmit} />
    </View>
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

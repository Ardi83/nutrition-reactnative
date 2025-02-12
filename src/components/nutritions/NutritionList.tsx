import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Nutrition, MealLog} from '../../types/index.d';
import {useStyles} from '../../styles/styles';
import {useTheme} from '@react-navigation/native';
import {NutritionUnit} from '../../store';

interface NutritionListProps {
  nutritions: Nutrition[];
}

const NutritionList: React.FC<NutritionListProps> = ({nutritions}) => {
  const [expandedDates, setExpandedDates] = useState<{[key: string]: boolean}>(
    {},
  );
  const {themeColor, variables, buttons} = useStyles();

  const toggleDate = (date: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <ScrollView>
      {nutritions.map(item => (
        <View
          key={item.date}
          style={[
            {borderBottomColor: themeColor.primary.borderColor, paddingTop: 10},
          ]}>
          <TouchableOpacity
            style={{paddingBottom: 10}}
            onPress={() => toggleDate(item.date)}>
            <View style={styles.header}>
              <Text style={[styles.date, {color: themeColor.primary.color}]}>
                {item.date}
              </Text>
              <Text style={[styles.date, {color: themeColor.primary.color}]}>
                {expandedDates[item.date] ? '▼' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>

          {expandedDates[item.date] && (
            <View style={styles.details}>
              <Text
                style={[
                  {color: variables.colors.secondary, paddingBottom: 5},
                  styles.sectionTitle,
                ]}>
                Total
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 50}}>
                  <Text
                    style={{
                      color: themeColor.primary.color,
                      paddingBottom: 5,
                      textDecorationLine: 'underline',
                    }}>
                    Macronutrients
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Calories: {item.dailyRecord.macronutrients.calories}{' '}
                    {NutritionUnit.calories}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Fats: {item.dailyRecord.macronutrients.fats}{' '}
                    {NutritionUnit.fats}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Proteins: {item.dailyRecord.macronutrients.proteins}{' '}
                    {NutritionUnit.proteins}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Carbs: {item.dailyRecord.macronutrients.carbs}{' '}
                    {NutritionUnit.carbs}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Fiber: {item.dailyRecord.macronutrients.fiber}{' '}
                    {NutritionUnit.fiber}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Sugar: {item.dailyRecord.macronutrients.sugar}{' '}
                    {NutritionUnit.sugar}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: themeColor.primary.color,
                      paddingBottom: 5,
                      textDecorationLine: 'underline',
                    }}>
                    Micronutrients
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    VitaminA: {item.dailyRecord.micronutrients.vitaminA}{' '}
                    {NutritionUnit.vitaminA}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    VitaminC: {item.dailyRecord.micronutrients.vitaminC}{' '}
                    {NutritionUnit.vitaminC}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    VitaminD: {item.dailyRecord.micronutrients.vitaminD}{' '}
                    {NutritionUnit.vitaminD}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    VitaminE: {item.dailyRecord.micronutrients.vitaminE}{' '}
                    {NutritionUnit.vitaminE}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Water: {item.dailyRecord.micronutrients.water}{' '}
                    {NutritionUnit.water}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.sectionTitle,
                  {color: variables.colors.secondary},
                ]}>
                Logs:
              </Text>
              {item.dailyRecord.logs.map((log: MealLog) => (
                <View
                  key={log.id}
                  style={[
                    styles.log,
                    {borderBottomColor: themeColor.primary.borderColor},
                  ]}>
                  <Text
                    style={{
                      color: variables.colors.secondary,
                      paddingBottom: 5,
                    }}>
                    {new Date(log.dateTime).toLocaleString()} - {log.mealType}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 50}}>
                      <Text
                        style={{
                          color: themeColor.primary.color,
                          paddingBottom: 5,
                          textDecorationLine: 'underline',
                        }}>
                        Macronutrients
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Calories: {log.macronutrients.calories}{' '}
                        {NutritionUnit.calories}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Fats: {log.macronutrients.fats} {NutritionUnit.fats}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Proteins: {log.macronutrients.proteins}{' '}
                        {NutritionUnit.proteins}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Carbs: {log.macronutrients.carbs} {NutritionUnit.carbs}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Fiber: {log.macronutrients.fiber} {NutritionUnit.fiber}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Sugar: {log.macronutrients.sugar} {NutritionUnit.sugar}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: themeColor.primary.color,
                          paddingBottom: 5,
                          textDecorationLine: 'underline',
                        }}>
                        Micronutrients
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        VitaminA: {log.micronutrients.vitaminA}{' '}
                        {NutritionUnit.vitaminA}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        VitaminC: {log.micronutrients.vitaminC}{' '}
                        {NutritionUnit.vitaminC}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        VitaminD: {log.micronutrients.vitaminD}{' '}
                        {NutritionUnit.vitaminD}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        VitaminE: {log.micronutrients.vitaminE}{' '}
                        {NutritionUnit.vitaminE}
                      </Text>
                      <Text style={{color: themeColor.secondary.color}}>
                        Water: {log.micronutrients.water} {NutritionUnit.water}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  log: {
    paddingLeft: 10,
    marginTop: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
});

export default NutritionList;

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
                  {color: themeColor.primary.color},
                  styles.sectionTitle,
                ]}>
                Total
              </Text>
              <Text style={{color: themeColor.primary.color}}>
                Calories: {item.dailyRecord.macronutrients.calories}
              </Text>
              <Text style={{color: themeColor.primary.color}}>
                Fats: {item.dailyRecord.macronutrients.fats}
              </Text>
              <Text style={{color: themeColor.primary.color}}>
                Proteins: {item.dailyRecord.macronutrients.proteins}
              </Text>
              <Text style={{color: themeColor.primary.color}}>
                Carbs: {item.dailyRecord.macronutrients.carbs}
              </Text>

              <Text
                style={[
                  styles.sectionTitle,
                  {color: themeColor.primary.color},
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
                  <Text style={{color: themeColor.primary.color}}>
                    {new Date(log.dateTime).toLocaleString()} - {log.mealType}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Calories: {log.macronutrients.calories}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Fats: {log.macronutrients.fats}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Proteins: {log.macronutrients.proteins}
                  </Text>
                  <Text style={{color: themeColor.primary.color}}>
                    Carbs: {log.macronutrients.carbs}
                  </Text>
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

import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Nutrition, MealLog} from '../../types/index.d';

interface NutritionListProps {
  nutritions: Nutrition[];
}

const NutritionList: React.FC<NutritionListProps> = ({nutritions}) => {
  const [expandedDates, setExpandedDates] = useState<{[key: string]: boolean}>(
    {},
  );

  const toggleDate = (date: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <FlatList
      data={nutritions}
      keyExtractor={item => item.date}
      renderItem={({item}) => (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => toggleDate(item.date)}>
            <View style={styles.header}>
              <Text style={styles.date}>{item.date}</Text>
              <Text>{expandedDates[item.date] ? '▼' : '▶'}</Text>
            </View>
          </TouchableOpacity>

          {expandedDates[item.date] && (
            <View style={styles.details}>
              <Text style={styles.sectionTitle}>Total</Text>
              <Text>Calories: {item.dailyRecord.macronutrients.calories}</Text>
              <Text>Fats: {item.dailyRecord.macronutrients.fats}</Text>
              <Text>Proteins: {item.dailyRecord.macronutrients.proteins}</Text>
              <Text>Carbs: {item.dailyRecord.macronutrients.carbs}</Text>

              <Text style={styles.sectionTitle}>Logs:</Text>
              <FlatList
                data={item.dailyRecord.logs}
                keyExtractor={(log: MealLog) => log.id}
                renderItem={({item: log}) => (
                  <View style={styles.log}>
                    <Text>
                      {new Date(log.dateTime).toLocaleString()} - {log.mealType}
                    </Text>
                    <Text>Calories: {log.macronutrients.calories}</Text>
                    <Text>Fats: {log.macronutrients.fats}</Text>
                    <Text>Proteins: {log.macronutrients.proteins}</Text>
                    <Text>Carbs: {log.macronutrients.carbs}</Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    borderBottomColor: '#ccc',
  },
});

export default NutritionList;

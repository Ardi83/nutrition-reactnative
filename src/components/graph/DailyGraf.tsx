import React, {FC, useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Nutrition} from '../../types/index.d';
import {useStyles} from '../../styles/styles';
import DailyDropdown from '../DailyDropdown';
import {useAppStore} from '../../store';

interface DailyGraphProps {
  nutrition: Nutrition;
}

const DailyGraf: FC<DailyGraphProps> = ({nutrition}) => {
  const {themeColor} = useStyles();
  const styles = {
    textColor: {color: themeColor.primary.color},
    graphBackground: themeColor.primary.backgroundColor,
  };

  // Extract meal types and nutrition data
  const mealTypes = nutrition.dailyRecord.logs.map(log => log.mealType);
  const macronutrients = [
    'calories',
    'proteins',
    'fats',
    'carbs',
    'fiber',
    'sugar',
  ];
  const micronutrients = [
    'vitaminA',
    'vitaminC',
    'vitaminD',
    'vitaminE',
    'water',
  ];

  // Prepare data for the chart
  const chartData = {
    labels: mealTypes,
    datasets: macronutrients.map(nutrient => ({
      data: nutrition.dailyRecord.logs.map(log =>
        parseFloat(log.macronutrients[nutrient]),
      ),
      color: (opacity = 1) =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.floor(Math.random() * 255)}, ${opacity})`, // Random color for each nutrient
      label: nutrient, // Label for the legend
    })),
  };

  return (
    <ScrollView>
      <Text style={styles.textColor}>{nutrition.date}</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 70} // Adjust width
        height={300}
        yAxisLabel=""
        yAxisSuffix="g" // Adjust suffix based on your data (e.g., 'g' for grams)
        chartConfig={{
          backgroundColor: styles.graphBackground,
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1, // Adjust decimal places
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 12,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        showBarTops={true}
        fromZero={true}
      />
    </ScrollView>
  );
};

export default DailyGraf;

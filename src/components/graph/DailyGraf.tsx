import React, {FC, useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {BarChart, StackedBarChart} from 'react-native-chart-kit';
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
  const times = nutrition.dailyRecord.logs.map(log =>
    log.dateTime.toLocaleTimeString(),
  );
  const macronutrients = ['proteins', 'fats', 'carbs', 'fiber', 'sugar'];
  const micronutrients = [
    'vitaminA',
    'vitaminC',
    'vitaminD',
    'vitaminE',
    'water',
  ];

  // Prepare data for the chart
  const chartData = {
    labels: macronutrients,
    legend: mealTypes,
    data: macronutrients.map(nutrient =>
      nutrition.dailyRecord.logs.map(log =>
        parseFloat(log.macronutrients[nutrient]),
      ),
    ),
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };

  const chartDataCalories = {
    labels: ['Calories'],
    legend: mealTypes,

    data: [
      nutrition.dailyRecord.logs.map(log =>
        parseFloat(log.macronutrients['calories']),
      ),
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };
  console.log(chartDataCalories, 'chartData');

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 5,
    },
    propsForDots: {
      r: '1',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <ScrollView>
      <Text style={styles.textColor}>{nutrition.date}</Text>
      <StackedBarChart
        data={chartData}
        width={Dimensions.get('window').width - 10} // Adjust width
        yLabelsOffset={-0.1}
        height={300}
        hideLegend={false}
        decimalPlaces={2}
        yAxisLabel=""
        yAxisSuffix="g" // Adjust suffix based on your data (e.g., 'g' for grams)
        chartConfig={chartConfig}
        style={{
          marginVertical: 10,
          borderRadius: 5,
        }}
        segments={5}
        fromZero={true}
      />
      <StackedBarChart
        data={chartDataCalories}
        width={Dimensions.get('window').width - 10} // Adjust width
        yLabelsOffset={-3}
        height={300}
        decimalPlaces={1}
        yAxisLabel=""
        yAxisSuffix="cal" // Adjust suffix based on your data (e.g., 'g' for grams)
        hideLegend={false}
        chartConfig={chartConfig}
        style={{
          marginVertical: 10,
          borderRadius: 5,
        }}
        fromZero={true}
      />
    </ScrollView>
  );
};

export default DailyGraf;

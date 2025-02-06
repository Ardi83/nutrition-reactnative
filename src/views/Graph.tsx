import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Routes} from '../Routes';
import {useStyles} from '../styles/styles';
import {useAppStore} from '../store';
import DailyGraf from '../components/graph/DailyGraf';
import DailyDropdown from '../components/DailyDropdown';
import {Nutrition} from '../types/index.d';

const Graph: React.FC<NativeStackScreenProps<Routes, 'Graph'>> = () => {
  const [period, setPeriod] = useState('daily'); // State to track active tab
  const {nutritions} = useAppStore();
  const [nutrition, setNutrition] = useState<Nutrition | null>(null);
  const {themeColor, variables, buttons} = useStyles();

  const firstRecord = nutritions[0];

  const selectedDay = (day: string) => {
    setNutrition(nutritions.find(n => n.date === day) || null);
  };

  return (
    <ScrollView
      style={[themeColor.primary, {flex: 1}]}
      contentContainerStyle={{padding: 16}}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1}}>
        {/* Two-box clickable bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              period === 'daily'
                ? buttons.button_primary
                : buttons.button_tertiary,
            ]}
            onPress={() => {
              setPeriod('daily');
            }}>
            <Text style={[{color: themeColor.primary.color}, styles.tabText]}>
              Daily Graph
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              period === 'weekly'
                ? buttons.button_primary
                : buttons.button_tertiary,
            ]}
            onPress={() => setPeriod('weekly')}>
            <Text style={[{color: themeColor.primary.color}, styles.tabText]}>
              Weekly Graph
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}

        <View style={styles.content}>
          {period === 'daily' ? (
            <>
              {nutritions && (
                <DailyDropdown
                  days={nutritions.map(n => n.date)}
                  selectedDay={selectedDay}
                />
              )}
              {nutrition && <DailyGraf nutrition={nutrition} />}
            </>
          ) : (
            <Text style={styles.contentText}>Graph Content Here</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  tabText: {
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  contentText: {
    fontSize: 20,
  },
});

export default Graph;

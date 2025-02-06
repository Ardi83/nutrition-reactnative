import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Pressable,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {getAllNutritionLogs} from '../services/apis';
import {Routes} from '../Routes';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';
import useGetAllNutritions from '../hooks/useGetAllNutritions';
import NutritionList from '../components/nutritions/NutritionList';

type RecordsProps = NativeStackScreenProps<Routes, 'Records'>;
const Records: React.FC<RecordsProps> = ({navigation}) => {
  const {
    userId,
    selectedDate,
    loading: {loading},
    nutritions,
    setShowCalendar,
  } = useAppStore();
  const {buttons, themeColor} = useStyles();
  // useGetAllNutritions();
  console.log('nutritionLogs', nutritions);

  const Content = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <View style={[{marginTop: 0}]}>
        <Pressable
          style={[buttons.button_primary]}
          onPress={() => navigation.navigate('Create')}>
          <Text>+ Add new</Text>
        </Pressable>
        <NutritionList nutritions={nutritions} />
      </View>
    );
  };

  return (
    <ScrollView
      style={[themeColor.primary, {flex: 1}]}
      contentContainerStyle={{padding: 16}}>
      <Content />
    </ScrollView>
  );
};

export default Records;

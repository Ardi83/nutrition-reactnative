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
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {getAllNutritionLogs} from '../services/apis';
import {Routes} from '../Routes';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';
import useGetAllNutritions from '../hooks/useGetAllNutritions';
import NutritionList from '../components/nutritions/NutritionList';

type HomeProps = NativeStackScreenProps<Routes, 'Home'>;
const Home: React.FC<HomeProps> = ({navigation}) => {
  const {
    userId,
    selectedDate,
    loading: {loading},
    nutritions,
    setShowCalendar,
  } = useAppStore();
  const {buttons} = useStyles();
  useGetAllNutritions();
  console.log('nutritionLogs', nutritions);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    // <ScrollView contentContainerStyle={{padding: 16}}>
    <View style={{marginTop: 0}}>
      <Pressable
        style={[buttons.button_primary]}
        onPress={() => navigation.navigate('Create')}>
        <Text>+ Add new</Text>
      </Pressable>
      <NutritionList nutritions={nutritions} />
    </View>
    // </ScrollView>
  );
};

export default Home;

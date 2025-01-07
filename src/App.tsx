import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {GoogleGenerativeAI} from '@google/generative-ai';
import CustomHeader from './components/CustomHeader';
import {geminiApiKey} from './config/config';
import {theme} from './styles/theme';
import NutritionScreen from './components/nutritions/Nutrition';
import {app} from './styles/styles';
import CreateForm from './components/nutritions/forms.tsx/Create-nutrition';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor: theme.primary_bg}}> */}
      <StatusBar
        barStyle={theme.bar_style}
        backgroundColor={theme.primary_bg}
      />
      {/* <View style={app.container}> */}
      <CustomHeader />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={NutritionScreen} />

        <Stack.Screen name="Create" component={CreateForm} />
      </Stack.Navigator>
      {/* </View> */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return <MyStack />;
}

export default App;

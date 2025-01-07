import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {GoogleGenerativeAI} from '@google/generative-ai';
import CustomHeader from './components/CustomHeader';
import {geminiApiKey} from './config/config';
import {theme} from './styles/theme';
import NutritionScreen from './components/nutritions/Nutrition';
import {app} from './styles/styles';
import CreateForm from './components/nutritions/forms.tsx/Create-nutrition';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: theme.primary_bg}}>
      <StatusBar
        barStyle={theme.bar_style}
        backgroundColor={theme.primary_bg}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: theme.primary_bg}}>
        <CustomHeader />
        <View style={app.container}>
          <CreateForm />
          <NutritionScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GoogleGenerativeAI} from '@google/generative-ai';
import CustomHeader from './components/CustomHeader';
import {geminiApiKey} from './config/config';
import {isDarkMode, theme} from './config/theme';
import NutritionScreen from './components/Nutrition';

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: theme.primary_bg,
  };

  const textColorStyle = {
    color: theme.text_primary,
  };

  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      Alert.alert('Validation Error', 'Please enter some text.');
      return;
    }

    try {
      const result = await model.generateContent(inputText);
      const response = result.response?.text();
      setResponseText(response || 'No response from AI.');
      setInputText('');
    } catch (error) {
      console.error('Error generating AI response:', error);
      setResponseText('Error occurred while generating AI response.');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={theme.bar_style}
        backgroundColor={theme.primary_bg}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CustomHeader />
        <View style={styles.app_container}>
          <NutritionScreen />
          <TextInput
            style={[styles.input, textColorStyle]}
            placeholder="Enter your text"
            placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
            value={inputText}
            onChangeText={setInputText}
          />
          <Button title="Submit" onPress={handleSubmit} />
          {responseText ? (
            <View style={styles.responseContainer}>
              <Text style={[styles.responseHeader, textColorStyle]}>
                AI Response:
              </Text>
              <Text style={[styles.responseText, textColorStyle]}>
                {responseText}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  responseContainer: {
    marginTop: 20,
  },
  responseHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseText: {
    fontSize: 16,
    marginTop: 10,
  },
  app_container: {
    backgroundColor: theme.primary_bg,
    padding: 10,
  },
});

export default App;

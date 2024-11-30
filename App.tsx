import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  Button,
  View,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {GoogleGenerativeAI} from '@google/generative-ai';
import CustomHeader from './CustomHeader';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const googole_api_key = 'api_key';
const genAI = new GoogleGenerativeAI(googole_api_key);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
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
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CustomHeader isDarkMode={isDarkMode} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.header}>AI Text Generator</Text>
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

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

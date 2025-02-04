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
import {geminiApiKey} from '../config/config';
import {useStyles} from '../styles/styles';

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

function App(): React.JSX.Element {
  const {inputs} = useStyles();
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
    <View>
      <TextInput
        style={[inputs.input_primary]}
        placeholder="Enter your text"
        placeholderTextColor={Colors.gray}
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {responseText ? (
        <View style={{}}>
          <Text style={{}}>AI Response:</Text>
          <Text style={{}}>{responseText}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default App;

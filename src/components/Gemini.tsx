import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {geminiApiKey} from '../config/config';
import {useStyles} from '../styles/styles';
import {useAppStore} from '../store';
import {LoadingStatus, NotifyType} from '../types/index.d';
import {parseAIResponse} from '../helper/helper.functions';

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

function Gemini(): React.JSX.Element {
  const {
    loading: {loading},
    notification,
    setLoading,
    setNotification,
  } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const {setAIResponse} = useAppStore();

  const {inputs, themeColor, variables, buttons} = useStyles();

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setNotification(NotifyType.Error, 'Please enter some text.');
      return;
    }

    setLoading(true, LoadingStatus.Pending);

    try {
      const result =
        await model.generateContent(`${inputText} , if i ask something irrelevant to calculation of nutrition just reply Please just return "Your question is irrelevant". otherwise return approximatly nutritions of food and feel question mark with the following values
        {calories: ?, fats: ?, proteins: ?, carbs: ?, fiber: ?, sugar: ?, vitaminA: ?, vitaminC: ?, vitaminD: ?, vitaminE: ?, water: ?}
        if you cant find any value just return 0 wthout any ~ sign, if there are multiple values just return them same structure an put theme in an object.
        like this : 
        {
          kebab: {calories: 100, fats: 10, proteins: 20, carbs: 30, fiber: 0, sugar: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, water: 0},
          pizza: {calories: 200, fats: 20, proteins: 30, carbs: 40, fiber: 0, sugar: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, water: 0}
        }
          unit of values should be:
          calories: cal
          fats: g
          proteins: g
          carbs: g
          fiber: g
          sugar: g
          vitaminA: IU
          vitaminC: mg
          vitaminD: IU
          vitaminE: mg
          water: ml
        `);
      const response = result.response?.text();

      if (
        response?.includes('irrelevant') ||
        !response.includes('calories') ||
        !response.includes('fats') ||
        !response.includes('proteins') ||
        !response.includes('carbs')
      ) {
        setNotification(NotifyType.Error, 'Your question is irrelevant.');
        setLoading(false, LoadingStatus.Error);
        return setInputText('');
      } else {
        setResponseText(response || 'No response from AI.');
        setLoading(false, LoadingStatus.Success);
        setInputText('');
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      setNotification(
        NotifyType.Error,
        'Error occurred while generating AI response.',
      );
      return setLoading(false, LoadingStatus.Error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpened(!isOpened)}>
        <View style={[styles.header]}>
          <Text style={[styles.ai, themeColor.primary]}>Gemini</Text>
          <Text style={[themeColor.primary]}>{isOpened ? '▼' : '▶'}</Text>
        </View>
      </TouchableOpacity>
      {isOpened && (
        <>
          <TextInput
            style={[inputs.input_primary, themeColor.primary]}
            placeholder="Describe your food"
            placeholderTextColor={variables.placeholderTextColor}
            value={inputText}
            onChangeText={setInputText}
          />
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          <Pressable
            style={buttons.button_secondary}
            disabled={loading}
            onPress={handleSubmit}>
            <Text>Submit</Text>
          </Pressable>
          <Text style={{color: themeColor.primary.color}}>
            Date and Meal Type should select manualy
          </Text>
        </>
      )}
      {responseText ? (
        <View style={{}}>
          <Text style={[styles.ai, {color: themeColor.primary.color}]}>
            AI Response:
          </Text>
          <Text style={{color: themeColor.primary.color}}>{responseText}</Text>

          <Pressable
            style={[buttons.button_primary]}
            onPress={() => {
              const aiResponse = parseAIResponse(responseText);
              setAIResponse(aiResponse);
              setResponseText('');
            }}>
            <Text>Fill Form by AI response</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ai: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 10,
    paddingBottom: 15,
  },
});
export default Gemini;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import CreateForm from '../components/nutritions/forms.tsx/Create-nutrition';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useStyles} from '../styles/styles';
import Gemini from '../components/Gemini';
import {useAppStore} from '../store';

type CreateProps = NativeStackScreenProps<Routes, 'Create'>;
const Create: React.FC<CreateProps> = () => {
  const {themeColor} = useStyles();

  return (
    <KeyboardAvoidingView
      style={[themeColor.primary, {flex: 1}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{padding: 16}}>
        <Gemini />
        <CreateForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;

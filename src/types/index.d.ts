import {User} from '@react-native-google-signin/google-signin';

export type UserInfo = {
  userInfo: User | undefined;
  error: Error | undefined;
};

export type Macronutrient = {
  calories: number;
  fats: number;
  protein: number;
  carbohydrates: number;
};

export type Nutrition = {
  macronutrient: Macronutrient;
};

export type RootStackParamList = {
  Home: undefined;
  Create: undefined; // No parameters expected for the 'Create' screen
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

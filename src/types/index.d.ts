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

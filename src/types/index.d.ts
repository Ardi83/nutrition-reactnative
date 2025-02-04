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

export type Nutrition = CreateDto;

export type CreateDto = {
  date: Date;
  macronutrients: {
    calories: string;
    fats: string;
    proteins: string;
    carbs: string;
    fiber: string;
    suger: string;
  };
  micronutrients: {
    vitaminA: string;
    vitaminC: string;
    vitaminD: string;
    vitaminE: string;
    water: string;
  };
  mealType: MealType;
};

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack',
  Dessert = 'Dessert',
  Brunch = 'Brunch',
  PostWorkout = 'PostWorkout',
  PreWorkout = 'PreWorkout',
  Other = 'Other',
}

export enum LoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export enum NotificationType {
  Null = '',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

import { User } from '@react-native-google-signin/google-signin';

export type UserInfo = {
  userInfo: User | undefined;
  error: Error | undefined;
};

export type Macronutrient = {
  [key: string]: string; // Index signature
  calories: string;
  fats: string;
  proteins: string;
  carbs: string;
  fiber: string;
  sugar: string;
};

export type Micronutrients = {
  [key: string]: string; // Index signature
  vitaminA: string;
  vitaminC: string;
  vitaminD: string;
  vitaminE: string;
  water: string;
};

export type DailyRecord = {
  date: string;
  macronutrients: Macronutrient;
  micronutrients: Micronutrients;
  createdAt: Date;
  updatedAt?: Date;
  logs: MealLog[];
}

export type MealLog = {
  id: string;
  dateTime: Date;
  mealType: MealType;
  macronutrients: Macronutrient;
  micronutrients: Micronutrients;
  createdAt: Date;
  updatedAt?: Date;
}

export type Nutrition = {
  date: string;
  dailyRecord: DailyRecord;
}

export type CreateDto = {
  date: Date;
  macronutrients: Macronutrient;
  micronutrients: Micronutrients;
  mealType: MealType;
};

type NutritionAIInfo = {
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  fiber: number;
  sugar: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  water: number;
};

type CreateAIDto = {
  [key: string]: NutritionAIInfo;
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

export enum NotifyType {
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

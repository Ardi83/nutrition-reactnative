import { create } from 'zustand';
import { produce } from 'immer';
import {
  CreateAIDto,
  CreateDto,
  LoadingStatus,
  MealLog,
  MealType,
  NotifyType,
  Nutrition,
  UserInfo,
} from '../types/index.d';
import { User } from '@react-native-google-signin/google-signin';
import { combineAllItems } from '../helper/helper.functions';

export const NutritionUnit = {
  calories: 'cal',
  fats: 'g',
  proteins: 'g',
  carbs: 'g',
  fiber: 'g',
  sugar: 'g',
  vitaminA: 'IU',
  vitaminC: 'mg',
  vitaminD: 'IU',
  vitaminE: 'mg',
  water: 'ml',
};

const initialState: AppProps = {
  user: {
    userInfo: undefined,
    error: undefined,
  },
  userId: '',
  selectedDate: new Date(),
  nutritions: [],
  showCalendar: false,
  loading: {
    loading: false,
    status: LoadingStatus.Idle,
  },
  notification: {
    type: NotifyType.Null,
    message: '',
  },
  createDto: {
    date: new Date(),
    macronutrients: {
      calories: '',
      fats: '',
      proteins: '',
      carbs: '',
      fiber: '',
      sugar: '',
    },
    micronutrients: {
      vitaminA: '',
      vitaminC: '',
      vitaminD: '',
      vitaminE: '',
      water: '',
    },
    mealType: MealType.Other,
  },
};

interface AppProps {
  user: UserInfo;
  userId: string;
  selectedDate: Date;
  nutritions: Nutrition[];
  showCalendar: boolean;
  createDto: CreateDto;
  loading: {
    loading: boolean;
    status: LoadingStatus;
  };
  notification: {
    type: NotifyType;
    message: string;
  };
}

interface AppState extends AppProps {
  setCurrentUser: (user: User) => void;
  setError: (err: Error) => void;
  setUserId: (userId: string) => void;
  setSelectedDate: (date: Date) => void;
  setShowCalendar: (show: boolean) => void;
  setMealType: (mealType: MealType) => void;
  setCalories: (calories: string) => void;
  setFats: (fats: string) => void;
  setProteins: (proteins: string) => void;
  setCarbs: (carbs: string) => void;
  setFiber: (fiber: string) => void;
  setSuger: (sugar: string) => void;
  setVitaminA: (vitaminA: string) => void;
  setVitaminC: (vitaminC: string) => void;
  setVitaminD: (vitaminD: string) => void;
  setVitaminE: (vitaminE: string) => void;
  setWater: (water: string) => void;
  setLoading: (loading: boolean, status?: LoadingStatus) => void;
  setNotification: (type: NotifyType, message: string) => void;
  setMealLog: (createDto: MealLog) => void;
  setAllNutritions: (nutritions: Nutrition[]) => void;
  setAIResponse: (aiResponse: CreateAIDto) => void;
  resetForm: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>(set => ({
  ...initialState,
  setCurrentUser: (user: User) =>
    set(
      produce((state: AppState) => {
        state.user.userInfo = user;
      }),
    ),
  setError: (err: Error) =>
    set(
      produce((state: AppState) => {
        state.user.error = err;
      }),
    ),
  setShowCalendar: (show: boolean) =>
    set(
      produce((state: AppState) => {
        state.showCalendar = show;
      }),
    ),
  setUserId: (userId: string) =>
    set(
      produce((state: AppState) => {
        state.userId = userId;
      }),
    ),
  setSelectedDate: (date: Date) =>
    set(
      produce((state: AppState) => {
        state.selectedDate = date;
      }),
    ),
  setMealLog: (resultCreate: MealLog) =>
    set(
      produce((state: AppState) => {
        const date = resultCreate.dateTime.toISOString().split('T')[0];
        // Find the nutrition entry for the given date
        const nutritionIndex = state.nutritions.findIndex(
          (nutrition) => nutrition.date === date
        );
        console.log('Nutrition Index:', nutritionIndex);


        // // Create a new MealLog object
        const newMealLog: MealLog = {
          id: resultCreate.id,
          dateTime: resultCreate.dateTime,
          mealType: resultCreate.mealType,
          macronutrients: resultCreate.macronutrients,
          micronutrients: resultCreate.micronutrients,
          createdAt: resultCreate.createdAt,
          updatedAt: resultCreate.updatedAt ?? undefined,
        };

        if (nutritionIndex !== -1) {
          // If the nutrition entry exists, push the new log and update dailyRecord
          const nutrition = state.nutritions[nutritionIndex];
          nutrition.dailyRecord.logs.push(newMealLog);
          nutrition.dailyRecord.logs.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());

          // Accumulate macronutrients (convert strings to numbers)
          for (const key in resultCreate.macronutrients) {
            if (resultCreate.macronutrients.hasOwnProperty(key)) {
              const currentValue = parseFloat(nutrition.dailyRecord.macronutrients[key] || '0');
              const newValue = parseFloat(resultCreate.macronutrients[key] || '0');
              nutrition.dailyRecord.macronutrients[key] = (currentValue + newValue).toString();
            }
          }

          // Accumulate micronutrients (convert strings to numbers)
          for (const key in resultCreate.micronutrients) {
            if (resultCreate.micronutrients.hasOwnProperty(key)) {
              const currentValue = parseFloat(nutrition.dailyRecord.micronutrients[key] || '0');
              const newValue = parseFloat(resultCreate.micronutrients[key] || '0');
              nutrition.dailyRecord.micronutrients[key] = (currentValue + newValue).toString();
            }
          }

          // Update the updatedAt field
          nutrition.dailyRecord.updatedAt = new Date();
        } else {
          // If the nutrition entry does not exist, create a new one
          const newNutrition: Nutrition = {
            date: date,
            dailyRecord: {
              date: date,
              macronutrients: { ...resultCreate.macronutrients }, // Copy macronutrients
              micronutrients: { ...resultCreate.micronutrients }, // Copy micronutrients
              logs: [newMealLog],
              createdAt: resultCreate.createdAt,
              updatedAt: new Date(),
            },
          };
          state.nutritions.push(newNutrition);
          state.nutritions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      }),
    ),
  resetForm: () =>
    set(
      produce((state: AppState) => {
        state.createDto = initialState.createDto;
        state.selectedDate = initialState.selectedDate;
      }),
    ),
  setAllNutritions: (nutritions: Nutrition[]) =>
    set(
      produce((state: AppState) => {
        state.nutritions = nutritions;
      }),
    ),
  setMealType: mealType =>
    set(
      produce((state: AppState) => {
        state.createDto.mealType = mealType;
      }),
    ),
  setCalories: calories =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.calories = calories;
      }),
    ),
  setFats: fats =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.fats = fats;
      }),
    ),
  setProteins: proteins =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.proteins = proteins;
      }),
    ),
  setCarbs: carbs =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.carbs = carbs;
      }),
    ),
  setFiber: fiber =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.fiber = fiber;
      }),
    ),
  setSuger: sugar =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.sugar = sugar;
      }),
    ),
  setVitaminA: vitaminA =>
    set(
      produce((state: AppState) => {
        state.createDto.micronutrients.vitaminA = vitaminA;
      }),
    ),
  setVitaminC: vitaminC =>
    set(
      produce((state: AppState) => {
        state.createDto.micronutrients.vitaminC = vitaminC;
      }),
    ),
  setVitaminD: vitaminD =>
    set(
      produce((state: AppState) => {
        state.createDto.micronutrients.vitaminD = vitaminD;
      }),
    ),
  setVitaminE: vitaminE =>
    set(
      produce((state: AppState) => {
        state.createDto.micronutrients.vitaminE = vitaminE;
      }),
    ),
  setWater: water =>
    set(
      produce((state: AppState) => {
        state.createDto.micronutrients.water = water;
      }),
    ),
  setAIResponse: (aiResponse: CreateAIDto) =>
    set(
      produce((state: AppState) => {
        const res = combineAllItems(aiResponse);
        state.createDto.macronutrients.calories = res.calories.toString();
        state.createDto.macronutrients.fats = res.fats.toString();
        state.createDto.macronutrients.proteins = res.proteins.toString();
        state.createDto.macronutrients.carbs = res.carbs.toString();
        state.createDto.macronutrients.fiber = res.fiber.toString();
        state.createDto.macronutrients.sugar = res.sugar.toString();
        state.createDto.micronutrients.vitaminA = res.vitaminA.toString();
        state.createDto.micronutrients.vitaminC = res.vitaminC.toString();
        state.createDto.micronutrients.vitaminD = res.vitaminD.toString();
        state.createDto.micronutrients.vitaminE = res.vitaminE.toString();
        state.createDto.micronutrients.water = res.water.toString();
      }),
    ),
  reset: () =>
    set(
      produce((state: AppProps) => (state = initialState)
      ),
    ),
  setLoading: (loading, status = LoadingStatus.Idle) =>
    set(
      produce((state: AppState) => {
        state.loading.loading = loading;
        state.loading.status = status;
      }),
    ),
  setNotification: (type, message) => {
    let timer: NodeJS.Timeout;
    set(
      produce((state: AppState) => {
        state.notification.type = type;
        state.notification.message = message;
      }),
    );
    timer = setTimeout(() => {
      set(
        produce((state: AppState) => {
          state.notification.type = NotifyType.Null;
          state.notification.message = '';
          if (timer) {
            clearTimeout(timer);
          }
        }),
      );
    }, 3000);

  },
}));

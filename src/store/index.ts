import {create} from 'zustand';
import {produce} from 'immer';
import {
  CreateDto,
  LoadingStatus,
  MealType,
  NotificationType,
  Nutrition,
  UserInfo,
} from '../types/index.d';
import {User} from '@react-native-google-signin/google-signin';

export const NutritionUnit = {
  calories: 'cal',
  fats: 'g',
  proteins: 'g',
  carbs: 'g',
  fiber: 'g',
  suger: 'g',
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
    type: NotificationType.Null,
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
      suger: '',
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
    type: NotificationType;
    message: string;
  };
}

interface AppState extends AppProps {
  setCurrentUser: (user: User) => void;
  setError: (err: Error) => void;
  setUserId: (userId: string) => void;
  setSelectedDate: (date: Date) => void;
  setShowCalendar: (show: boolean) => void;
  createNutrition: (createDto: CreateDto) => void;
  setMealType: (mealType: MealType) => void;
  setCalories: (calories: string) => void;
  setFats: (fats: string) => void;
  setProteins: (proteins: string) => void;
  setCarbs: (carbs: string) => void;
  setFiber: (fiber: string) => void;
  setSuger: (suger: string) => void;
  setVitaminA: (vitaminA: string) => void;
  setVitaminC: (vitaminC: string) => void;
  setVitaminD: (vitaminD: string) => void;
  setVitaminE: (vitaminE: string) => void;
  setWater: (water: string) => void;
  setLoading: (loading: boolean, status?: LoadingStatus) => void;
  setInfo: (type: NotificationType, message: string) => void;
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
  createNutrition: (createDto: CreateDto) =>
    set(
      produce((state: AppState) => {
        state.nutritions.push(createDto);
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
  setSuger: suger =>
    set(
      produce((state: AppState) => {
        state.createDto.macronutrients.suger = suger;
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
  setLoading: (loading, status = LoadingStatus.Idle) =>
    set(
      produce((state: AppState) => {
        state.loading.loading = loading;
        state.loading.status = status;
      }),
    ),
  setInfo: (type, message) => {
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
          state.notification.type = NotificationType.Null;
          state.notification.message = '';
          if (timer) {
            clearTimeout(timer);
          }
        }),
      );
    }, 3000);
  },
}));

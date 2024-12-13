import {create} from 'zustand';
import {produce} from 'immer';
import {Nutrition, UserInfo} from '../types';
import {User} from '@react-native-google-signin/google-signin';

const initialState: AppProps = {
  user: {
    userInfo: undefined,
    error: undefined,
  },
  userId: '',
  selectedDate: new Date(),
  nutritions: [],
  showCalendar: false,
};

interface AppProps {
  user: UserInfo;
  userId: string;
  selectedDate: Date;
  nutritions: Nutrition[];
  showCalendar: boolean;
}

interface AppState extends AppProps {
  setCurrentUser: (user: User) => void;
  setError: (err: Error) => void;
  setUserId: (userId: string) => void;
  setSelectedDate: (date: Date) => void;
  setShowCalendar: (show: boolean) => void;
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
}));

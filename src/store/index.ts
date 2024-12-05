import { create, StateCreator } from 'zustand';
import { produce } from 'immer';
import { UserInfo } from '../types';
import { User } from '@react-native-google-signin/google-signin';


export const devtools =
    <T>(fn: StateCreator<T>): StateCreator<T> =>
        (set, get, api) =>
            fn(set, get, api); // Pass-through middleware



const initialState: AppProps = {
    user: {
        userInfo: undefined,
        error: undefined,
    },
    userId: '',
}

interface AppProps {
    user: UserInfo;
    userId: string;
}

interface AppState extends AppProps {
    setCurrentUser: (user: User) => void;
    setError: (err: Error) => void;
    setUserId: (userId: string) => void;
}


export const useAppStore = create<AppState>(((set) => ({
    ...initialState,
    setCurrentUser: (user: User) =>
        set(
            produce((state: AppState) => {
                state.user.userInfo = user;
            })
        ),
    setError: (err: Error) =>
        set(
            produce((state: AppState) => {
                state.user.error = err;
            })
        ),
    setUserId: (userId: string) =>
        set(
            produce((state: AppState) => {
                state.userId = userId;
            })
        ),
})));
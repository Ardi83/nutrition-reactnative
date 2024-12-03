import { create, StateCreator } from 'zustand';
import { produce } from 'immer';
import { UserInfo } from '../types';


export const devtools =
    <T>(fn: StateCreator<T>): StateCreator<T> =>
        (set, get, api) =>
            fn(set, get, api); // Pass-through middleware



const initialState: AppProps = {
    user: {
        userInfo: undefined,
        error: undefined,
    },
    number1: 1,
    number2: 2,
}

interface AppProps {
    user: UserInfo;
    number1: number;
    number2: number;
}
interface AppState extends AppProps {
    getCurrentUser: () => void;
    increaseNumber: (n: '1' | '2') => void;
    decreaseNumber: (n: '1' | '2') => void;
}


export const useAppStore = create<AppState>(((set) => ({
    ...initialState,

    getCurrentUser: () => {
        // Your logic for fetching the user
    },
    increaseNumber: (n: '1' | '2') => set(
        produce((state: AppState) => {
            if (n === '1') {
                state.number1 += 1;
            }
            if (n === '2') {
                state.number2 += 1;
            }
        })
    ),
    decreaseNumber: (n: '1' | '2') =>
        set(
            produce((state: AppState) => {
                if (n === '1') {
                    state.number1 -= 1;
                }
                if (n === '2') {
                    state.number2 -= 1;
                }
            })
        ),
}))

);
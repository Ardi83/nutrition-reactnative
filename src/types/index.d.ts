import { User } from '@react-native-google-signin/google-signin';

export type UserInfo = {
    userInfo: User | undefined;
    error: Error | undefined;
};
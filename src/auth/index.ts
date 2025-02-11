import { Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  NativeModuleError,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useAppStore } from '../store';
import { addUserCollection } from '../services/service';
import { CommonActions } from '@react-navigation/native';

export const getCurrentUser = async () => {
  try {
    const { type, data } = await GoogleSignin.signInSilently();
    if (type === 'success') {
      if (!useAppStore.getState().userId) {
        const userId = auth().currentUser?.uid;
        useAppStore.setState({ userId });
      }
      console.log('User Info:', useAppStore.getState().userId);

      useAppStore.setState({ user: { userInfo: data, error: undefined } });
    } else if (type === 'noSavedCredentialFound') {
      useAppStore.setState({
        user: {
          userInfo: undefined,
          error: new Error('User not signed in yet, please sign in :)'),
        },
      });
    }
  } catch (error) {
    const typedError = error as NativeModuleError;
    useAppStore.setState({ user: { userInfo: undefined, error: typedError } });
  }
};

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { type, data } = await GoogleSignin.signIn();
    if (type === 'success') {
      useAppStore.setState({ user: { userInfo: data, error: undefined } });

      const idToken = data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const userCredential = await signInFirebase(idToken);
      await addUserCollection(userCredential);
    } else {
      // sign in was cancelled by user
      setTimeout(() => {
        Alert.alert('Cancelled', 'Sign in was cancelled by user.');
      }, 500);
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      console.log('Error:', error.message);
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert(
            'In Progress',
            'Operation (e.g., sign in) already in progress.',
          );
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert(
            'Play Services Not Available',
            'Play services not available or outdated.',
          );
          break;
        default:
          Alert.alert('Error', `Something went wrong: ${error.toString()}`);
      }
    } else {
      Alert.alert(
        'Error',
        "An error that's not related to Google sign in occurred.",
      );
    }
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // Sign out from Firebase Authentication
    await auth().signOut();
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'Home_mock' }],
    //   })
    // )

    useAppStore.setState({ userId: undefined });
    useAppStore.setState({ user: { userInfo: undefined, error: undefined } });
    console.log('User signed out');
  } catch (error: any) {
    useAppStore.setState({
      user: {
        userInfo: undefined,
        error: new Error('Error signing out: ' + error),
      },
    });
    console.error('Error signing out:', error);
  }
};

export const signInFirebase = async (idToken: string | null) => {
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const userCredential = await auth().signInWithCredential(googleCredential);
  useAppStore.setState({ userId: userCredential.user.uid });
  return userCredential;
};

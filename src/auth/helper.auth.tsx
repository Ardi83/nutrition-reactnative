import {Alert, Button, Text} from 'react-native';
import {
  GoogleSignin,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import config from '../config/config';

export const prettyJson = (value: any) => {
  function sort(object: any) {
    if (!object || typeof object !== 'object' || object instanceof Array)
      return object;
    const keys = Object.keys(object);
    keys.sort();
    const newObject = {};
    for (let i = 0; i < keys.length; i++) {
      // @ts-ignore
      newObject[keys[i]] = sort(object[keys[i]]);
    }
    return newObject;
  }
  return JSON.stringify(sort(value), null, 2);
};

export const PROFILE_IMAGE_SIZE = 150;
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: config.webClientId,
    offlineAccess: true,
    profileImageSize: PROFILE_IMAGE_SIZE,
    scopes: config.scopes,
  });
};

export const RenderHasPreviousSignIn = () => {
  return (
    <Button
      onPress={async () => {
        const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
        Alert.alert(String(hasPreviousSignIn));
      }}
      title="hasPreviousSignIn()?"
    />
  );
};

export const RenderGetCurrentUser = () => {
  return (
    <Button
      onPress={async () => {
        const userInfo = GoogleSignin.getCurrentUser();
        Alert.alert('current user', userInfo ? prettyJson(userInfo) : 'null');
      }}
      title="get current user"
    />
  );
};

export const RenderError = ({
  error,
}: {
  error: (Error & {code?: string}) | undefined | null;
}) => {
  if (error != null) {
    const text =
      error.code === statusCodes.SIGN_IN_CANCELLED
        ? `User cancelled the action`
        : `${error.message} ${error.code ? `code: ${error.code}` : ''}`;
    return (
      <Text selectable style={{color: 'black'}}>
        {text}
      </Text>
    );
  }
  return null;
};

export const getToken = async () => {
  try {
    return await GoogleSignin.getTokens();
  } catch (error) {
    const typedError = error as NativeModuleError;
    console.log('error', typedError);
  }
};

export const renderAddScopes = async () => {
  const user = await GoogleSignin.addScopes({
    scopes: ['https://www.googleapis.com/auth/user.gender.read'],
  });
  return user;
};

export const revokeAccess = async () => {
  try {
    await GoogleSignin.revokeAccess();

    return {userInfo: undefined, error: undefined};
  } catch (error) {
    return {error: error as NativeModuleError};
  }
};

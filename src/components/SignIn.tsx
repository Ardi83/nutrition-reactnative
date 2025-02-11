import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {
  GoogleSigninButton,
  User,
} from '@react-native-google-signin/google-signin';
import {configureGoogleSignIn, RenderError} from '../auth/helper.auth';
import {getCurrentUser, signIn, signOut} from '../auth';
import {useAppStore} from '../store';
import {useStyles} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import useGetAllNutritions from '../hooks/useGetAllNutritions';

export const GoogleSigninSampleApp = () => {
  const {buttons, themeColor} = useStyles();
  const {
    user: {userInfo, error},
    reset,
  } = useAppStore();

  useEffect(() => {
    configureGoogleSignIn();
    if (!userInfo) {
      (async () => {
        await getCurrentUser();
      })();
    }
  }, [userInfo]);

  const renderUserInfo = (userInfo: User) => {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.welcomeText, themeColor.primary]}>
          Welcome, {userInfo.user.name}
        </Text>

        <Pressable
          style={[buttons.button_secondary, {marginLeft: 'auto'}]}
          onPress={() => {
            reset();
            signOut();
          }}>
          <Text>Log out</Text>
        </Pressable>
      </View>
    );
  };

  return userInfo ? (
    renderUserInfo(userInfo)
  ) : (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Light}
        style={{width: 192, height: 48, marginLeft: 'auto'}}
        onPress={signIn}
        accessibilityLabel={'sign in'}
      />
      <RenderError error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    display: 'flex',
  },
  pageContainer: {flex: 1, backgroundColor: 'transparent'},
});

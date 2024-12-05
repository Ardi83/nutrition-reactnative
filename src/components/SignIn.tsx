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
import {buttons, theme} from '../config/theme';
import {getCurrentUser, signIn, signOut} from '../auth';
import {useAppStore} from '../store';

export const GoogleSigninSampleApp = () => {
  const {
    user: {userInfo, error},
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
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, {userInfo.user.name}</Text>

        <Pressable
          style={[buttons.button_secondary, {marginLeft: 'auto'}]}
          onPress={signOut}>
          <Text>Log out</Text>
        </Pressable>
      </View>
    );
  };

  const body = userInfo ? (
    renderUserInfo(userInfo)
  ) : (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Light}
      style={{width: 192, height: 48, marginLeft: 'auto'}}
      onPress={signIn}
      accessibilityLabel={'sign in'}
    />
  );

  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <ScrollView contentContainerStyle={styles.container}>
        {body}
        <RenderError error={error} />
      </ScrollView>
    </SafeAreaView>
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
    color: theme.text_tertiary,
  },
  pageContainer: {flex: 1, backgroundColor: 'transparent'},
});

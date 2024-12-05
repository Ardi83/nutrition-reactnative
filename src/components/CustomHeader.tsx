import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {theme} from '../config/theme';
import {GoogleSigninSampleApp} from './SignIn';

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/images/logo.png')} // Replace with your React logo path
        style={styles.logo}
      />
      <GoogleSigninSampleApp />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.secondary_bg,
  },
  logo: {
    width: 80,
    height: 80,
    margin: 10,
  },
  headerText: {
    position: 'relative',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;

import React from 'react';
import {View, Text, Image, StyleSheet, useColorScheme} from 'react-native';
import {GoogleSigninSampleApp} from './SignIn';
import {useStyles} from '../styles/styles';
import useGetAllNutritions from '../hooks/useGetAllNutritions';

const CustomHeader = () => {
  const {themeColor} = useStyles();
  useGetAllNutritions();

  return (
    <View style={[styles.headerContainer, themeColor.primary]}>
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

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CustomHeader = ({isDarkMode}: {isDarkMode: boolean}) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('./assets/images/gratisography-funflower-800x525.jpg')} // Replace with your React logo path
        style={styles.logo}
      />
      <Text
        style={[styles.headerText, {color: isDarkMode ? 'white' : 'black'}]}>
        Welcome to Nutrition calculator app
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: 150,
    marginRight: 10,
  },
  headerText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;

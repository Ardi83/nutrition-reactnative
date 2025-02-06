import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Routes} from '../Routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {useAppStore} from '../store';
import {NotifyType} from '../types/index.d';
import {useStyles} from '../styles/styles';

type HomeProps = NativeStackScreenProps<Routes, 'Home'>;
const Home: React.FC<HomeProps> = ({navigation}) => {
  const {setNotification} = useAppStore();
  const {variables, themeColor} = useStyles();

  const onClickTab = (tab: string) => {
    if (!auth().currentUser?.uid) {
      return setNotification(
        NotifyType.Error,
        'Please login to view records or graph.',
      );
    } else {
      if (tab === 'records') {
        navigation.navigate('Records');
      }
      if (tab === 'graph') {
        navigation.navigate('Graph');
      }
    }
  };

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={[styles.container, themeColor.primary]}>
        {/* Two-box clickable bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {backgroundColor: variables.colors.primary},
            ]}
            onPress={() => onClickTab('records')}>
            <Text style={[styles.tabText, styles.activeTabText]}>
              Show Records
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              {backgroundColor: variables.colors.primary},
            ]}
            onPress={() => onClickTab('graph')}>
            <Text style={[styles.tabText, styles.activeTabText]}>
              Show Graph
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        <View style={styles.content}>
          <Text style={{color: themeColor.primary.color}}>
            Records Examples come here
          </Text>
          <Text style={{color: themeColor.primary.color}}>
            Graph Examples come here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activeTabButton: {
    backgroundColor: '#6200ee', // Active tab background color
  },
  tabText: {
    fontSize: 16,
    color: '#6200ee', // Inactive tab text color
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff', // Active tab text color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Home;

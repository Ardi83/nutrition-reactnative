import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Routes} from '../Routes';

type HomeMockProps = NativeStackScreenProps<Routes, 'Home_mock'>;
const HomeMock: React.FC<HomeMockProps> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('records'); // State to track active tab

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* Two-box clickable bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'records' && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab('records');
            }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'records' && styles.activeTabText,
              ]}>
              Show Records
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'graph' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('graph')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'graph' && styles.activeTabText,
              ]}>
              Show Graph
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        <View style={styles.content}>
          {activeTab === 'records' ? (
            <Text style={styles.contentText}>Records Content Here</Text>
          ) : (
            <Text style={styles.contentText}>Graph Content Here</Text>
          )}
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
    // backgroundColor: '#fff',
    borderRadius: 10,
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

export default HomeMock;

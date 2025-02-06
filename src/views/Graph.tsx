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
import {useStyles} from '../styles/styles';

const Graph: React.FC<NativeStackScreenProps<Routes, 'Graph'>> = () => {
  const [activeTab, setActiveTab] = useState('records'); // State to track active tab
  const {themeColor, variables, buttons} = useStyles();

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={[themeColor.primary, {flex: 1}]}>
        {/* Two-box clickable bar */}
        <View>
          <TouchableOpacity
            style={[activeTab === 'records' && buttons.button_primary]}
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
    padding: 20,
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  contentText: {
    fontSize: 20,
  },
});

export default Graph;

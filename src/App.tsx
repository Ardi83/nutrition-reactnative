import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {GoogleGenerativeAI} from '@google/generative-ai';
import CustomHeader from './components/CustomHeader';
import {geminiApiKey} from './config/config';
import {darkTheme, lightTheme} from './styles/theme';
import CreateForm from './components/nutritions/forms.tsx/Create-nutrition';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './Routes';
import Home from './views/Home';
import Notification from './components/Notification';
import {useAppStore} from './store';
import auth from '@react-native-firebase/auth';
import Create from './views/Create';
import HomeMock from './views/Home_mock';

const Stack = createNativeStackNavigator<Routes>();

function MyStack() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const {notification, userId} = useAppStore();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme.bar_style}
        backgroundColor={theme.primary_bg}
      />
      <CustomHeader />
      {notification.message && <Notification notification={notification} />}
      <Stack.Navigator
        initialRouteName={auth().currentUser?.uid ? 'Home' : 'Home_mock'}>
        {auth().currentUser?.uid ? (
          <>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
              component={Home}
            />
            <Stack.Screen
              name="Create"
              component={Create}
              options={{
                headerBackground: () => (
                  <View
                    style={{
                      backgroundColor: theme.secondary_accent,
                      flex: 1,
                    }}
                  />
                ),
                headerTintColor: theme.text_primary,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home_mock"
            component={HomeMock}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return <MyStack />;
}

export default App;

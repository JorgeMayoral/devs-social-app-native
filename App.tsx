import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTokenStore } from './src/hooks/useTokenStore';
// Screens
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PublishScreen from './src/screens/PublishScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UserScreen from './src/screens/UserScreen';
import ExploreScreen from './src/screens/ExploreScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const loadToken = useTokenStore((state) => state.load);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'Home' : 'SignIn'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Sign in' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign up' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="Publish"
          component={PublishScreen}
          options={{ title: 'Publish' }}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ title: 'Explore' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ title: 'User' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

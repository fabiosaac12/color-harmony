import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/HomeScreen';
import { useTheme } from '../../providers/Theme';

export type MainStackNavigatorParams = {
  home: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.palette.background,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.palette.background },
          headerTitleStyle: {
            fontSize: 21,
          },
          headerTintColor: theme.palette.text,
          orientation: 'portrait_up',
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: 'RN Architecture TS',
            headerTitleStyle: {
              fontSize: 28,
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

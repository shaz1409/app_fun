import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddQuoteScreen } from './src/screens/AddQuoteScreen';
import { useWallpaperRefresh } from './src/hooks/useWallpaperRefresh';
import { RootStackParamList } from './src/types';
import { quotesService } from './src/services/quotesService';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Initialize wallpaper refresh functionality
  useWallpaperRefresh();

  // Initialize quotes data
  useEffect(() => {
    quotesService.initializeQuotes();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Quote Wallpapers',
          }}
        />
        <Stack.Screen 
          name="AddQuote" 
          component={AddQuoteScreen}
          options={{
            title: 'Add New Quote',
          }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
} 
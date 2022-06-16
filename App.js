import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Episode from './components/Episode';
import Character from './components/Character';
import EpisodeDetails from './components/EpisodeDetails';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Episode" component={Episode} />
          <Stack.Screen name="EpisodeDetails" component={EpisodeDetails} />
          <Stack.Screen name="Character" component={Character} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MonthView, DayView } from './Calendars.js'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Day" component={DayView} />
        <Tab.Screen name="Month" component={MonthView} style={{backgroundColor: 'white',}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as FileSystem from 'expo-file-system';
import { MonthView, DayView } from './Calendars.js';
import TaskList from './Tasks.js';
import DynamicTaskList from './Dynamic.js';
import * as SQLite from 'expo-sqlite';

const Tab = createBottomTabNavigator();

FileSystem.downloadAsync(
  Expo.Asset.fromModule(require('./db.db')).uri,
  `${FileSystem.documentDirectory}SQLite/db.db`
);
const db = SQLite.openDatabase("db.db");

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
	<Tab.Screen name="Month" component={MonthView} />
	  <Tab.Screen name="Tasks" component={TaskList} />
	  <Tab.Screen name="Dynamic" component={DynamicTaskList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

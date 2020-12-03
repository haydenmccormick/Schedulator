import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as FileSystem from 'expo-file-system';
import { DayView } from './Calendars.js';
import TaskList from './Tasks.js';
import DynamicTaskList from './Dynamic.js';
import * as SQLite from 'expo-sqlite';
import { Image } from 'react-native';
import styles from './assets/Styles.js';

const Tab = createBottomTabNavigator();

FileSystem.downloadAsync(
  Expo.Asset.fromModule(require('./db.db')).uri,
  `${FileSystem.documentDirectory}SQLite/db.db`
);
const db = SQLite.openDatabase("db.db");

//tab bar style options
function options() {
  console
  tabBarOptions: { showIcon: true }
  tabBarIcon: (() => {
    return (<Image
      style={{ width: 50, height: 50 }}
      source={{ url: "https://facebook.github.io/react/img/logo_og.png" }} />);
  }
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={options}
      >
        <Tab.Screen name="Agenda" component={DayView}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={styles.icon}
                source={require('./assets/Tab_Icons/agenda-on.png')
                } />
            ),
          }}
        />{/*
        <Tab.Screen name="Tasks" component={TaskList}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.icon}
              source={require('./assets/Tab_Icons/tasks-on.png')                  
              }/>
          ), 
        }}
      />*/}
        <Tab.Screen name="Tasks" component={DynamicTaskList}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={styles.icon}
                source={require('./assets/Tab_Icons/tasks-on.png')
                } />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
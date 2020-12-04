import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as FileSystem from 'expo-file-system';
import { DayView } from './Calendars.js';
import DynamicTaskList from './Dynamic.js';
import * as SQLite from 'expo-sqlite';
import { Image } from 'react-native';
import styles from './assets/Styles.js';
import { useFonts, Roboto_100Thin, Roboto_300Light } from '@expo-google-fonts/roboto';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface'
import { AppLoading } from 'expo';

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
  const [taskEntries, setTaskEntries] = useState({});
  const [dateEntries, setDateEntries] = useState({});
  // Load in expo google fonts
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    AbrilFatface_400Regular
  });
  // If it's not loaded in time, make the user wait
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Refresh tasks to send to agenda. This needs to be here to ensure that it can be accessed by Dynamic.js.
  function findTasks() {
    const tempTasks = {};
    const tempDates = {};
    db.transaction(tx => {
      //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
      tx.executeSql(
        "SELECT taskname, startTime, endTime, date, 'static' AS type FROM tasks UNION SELECT taskname, '' AS startTime, endTime, date, 'dynamic' as type FROM dynamicTasks ORDER BY endTime",
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            newTask = {
              name: results.rows.item(i).taskname,
              startTime: results.rows.item(i).startTime,
              endTime: results.rows.item(i).endTime,
              type: results.rows.item(i).type
            };
            newDate = { marked: true };
            if (tempTasks[results.rows.item(i).date]) {
              tempTasks[results.rows.item(i).date].push(newTask);
            }
            else {
              tempTasks[results.rows.item(i).date] = [newTask];
              tempDates[results.rows.item(i).date] = newDate;
            }
          }
          setTaskEntries(tempTasks);
          setDateEntries(tempDates);
        }
      );
    });
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={options}
      >
        <Tab.Screen name="Agenda" children={() => <DayView findTasks={findTasks} tasks={taskEntries} dates={dateEntries} />}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={styles.icon}
                source={require('./assets/Tab_Icons/agenda-on.png')
                } />
            ),
          }}
        />
        <Tab.Screen name="Tasks" children={() => <DynamicTaskList findTasks={findTasks} />}
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
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
//import RNBackgroundDownloader from 'react-native-background-downloader';

const addr = "(http://[::]:8000/)";

const Tab = createBottomTabNavigator();

FileSystem.downloadAsync(
  Expo.Asset.fromModule(require('./server/db.db')).uri,
  `${FileSystem.documentDirectory}SQLite/db.db`
);

const db = SQLite.openDatabase("db.db");

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
        "SELECT taskname, dateString, startTime, endTime, 'static' AS type FROM tasks UNION SELECT taskname, dateString, '' AS startTime, deadline AS endTime, 'dynamic' AS type FROM dynamicTasks",
        [],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            newTask = {
              name: results.rows.item(i).taskname,
              date: results.rows.item(i).dateString,
              startTime: results.rows.item(i).startTime,
              endTime: results.rows.item(i).endTime,
              type: results.rows.item(i).type
            };
            newDate = { marked: true };
            console.log(newTask);
            if (tempTasks[results.rows.item(i).dateString]) {
              tempTasks[results.rows.item(i).dateString].push(newTask);
            }
            else {
              tempTasks[results.rows.item(i).dateString] = [newTask];
              tempDates[results.rows.item(i).dateString] = newDate;
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
      <Tab.Navigator>
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
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

const addr = "http://192.168.86.27:8000/";

const Tab = createBottomTabNavigator();

FileSystem.downloadAsync(
  Expo.Asset.fromModule(require('./server/db.db')).uri,
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

  const [taskEntries, setTaskEntries] = useState([{}]);
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

  function findTasks() {
    const tempTasks = {};
    db.transaction(tx => {
      //tx.executeSql("insert into tasks(taskname,date,startTime,endTime) values" + values, []);
      tx.executeSql(
	"SELECT taskname, endTime, date, 'static' AS type FROM tasks UNION SELECT taskname, endTime, date, 'dynamic' as type FROM dynamicTasks ORDER BY endTime",
	[],
	(tx, results) => {
	  for (let i = 0; i < results.rows.length; i++) {
	    newTask = {
	      name: results.rows.item(i).taskname,
	      startTime: results.rows.item(i).startTime,
	      endTime: results.rows.item(i).endTime,
	      type: results.rows.item(i).type
	    };
	    if (tempTasks[results.rows.item(i).date]) {
	      tempTasks[results.rows.item(i).date].push(newTask);
	    }
	    else {
	      tempTasks[results.rows.item(i).date] = [newTask];
	    }
	  }
	  setTaskEntries(tempTasks);
	}
      );
    });
  }

  function gettaskEntries() {
    return taskEntries;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
	screenOptions={options}
      >
	<Tab.Screen name="Agenda" children={() => <DayView findTasks={findTasks} tasks={gettaskEntries()} />}
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

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={options}
    >
        <Tab.Screen name="Agenda" children={() => <DayView findTasks={findTasks} tasks={gettaskEntries()} />}
            options={{
                tabBarIcon: ({ color }) => (
                    <Image
                        style={styles.icon}
                        source={require('../assets/Tab_Icons/agenda-on.png')
                        } />
                ),
            }}
        />
        <Tab.Screen name="Tasks" children={() => <DynamicTaskList findTasks={findTasks} tasks={getDynamicTaskEntries()} />}
            options={{
                tabBarIcon: ({ color }) => (
                    <Image
                        style={styles.icon}
                        source={require('../assets/Tab_Icons/tasks-on.png')
                        } />
                ),
            }}
        />
    </Tab.Navigator>
)

export default AppNavigator;
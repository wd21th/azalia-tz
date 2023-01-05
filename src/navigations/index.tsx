import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenOptions} from '../config';
import Main from '../screens/Main';
import AddTask from '../screens/AddTask';

const Stack = createNativeStackNavigator();
function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="New Task"
          component={AddTask}
          options={({route}) => ({title: route?.params?.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

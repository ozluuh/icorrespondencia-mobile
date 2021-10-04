import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserContext } from '../context/UserContext';
import routes from '../routes';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [user, setUser] = useState({});
  const [initialRouteName, setInitialRouteName] = useState('Login');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          {routes.map((route, idx) => (
            <Stack.Screen {...route} key={idx} />
          ))}
        </Stack.Navigator>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

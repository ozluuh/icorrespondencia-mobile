import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ALWAYS_LOGGED_KEY, USER_PUBLIC_ID_LOGGED_KEY } from '../config/keys';
import { UserContext } from '../context/UserContext';
import routes from '../routes';
import { getItem, getObject } from '../utils/storage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [user, setUser] = useState({});
  const [initialRouteName, setInitialRouteName] = useState('Login');

  useEffect(() => {
    async function fetchData() {
      const isUserAlwaysLogged = await getItem(ALWAYS_LOGGED_KEY);

      if (!isUserAlwaysLogged) {
        return;
      }

      const user_id = await getItem(USER_PUBLIC_ID_LOGGED_KEY);
      const userStored = await getObject(user_id);
      
      setUser(userStored);
      setInitialRouteName('Home');
    }

    fetchData();
  }, []);

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

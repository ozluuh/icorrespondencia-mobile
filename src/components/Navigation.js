import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ALWAYS_LOGGED_KEY, USER_PUBLIC_ID_LOGGED_KEY } from '../config/keys';
import { UserContext } from '../context/UserContext';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import SignUp from '../screens/SignUp';
import { getItem, getObject } from '../utils/storage';

import HeaderAction from './HeaderAction';

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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Novo usuário',
              headerBackVisible: false,
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: 'Dashboard',
              headerShown: true,
              headerBackVisible: false,
              headerRight: () => (
                <HeaderAction
                  icon="user"
                  leftText="Perfil"
                  textStyle={{ fontSize: 18 }}
                  onPress={() => navigation.navigate('Profile')}
                />
              ),
            })}
          />

          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

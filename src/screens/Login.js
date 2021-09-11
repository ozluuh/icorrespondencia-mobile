import React, { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import {
  ALWAYS_LOGGED_KEY,
  FIRST_ACCESS_KEY,
  LAST_UPDATE_KEY,
  USERID_LOGGED_KEY,
  USERS_KEY,
} from '../config/keys';
import { destroy, getAllKeys, getObject, purgeAll, store } from '../utils/storage';

export default function Login({ navigation }) {
  const [user, setUser] = useState(null);
  const [alwaysLogged, setAlwaysLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setUsername('');
      setPassword('');
      
      const lastUpdateStored = await getObject(LAST_UPDATE_KEY);
      setLastUpdate(lastUpdateStored);

      const userId = await getObject(USERID_LOGGED_KEY);
      const isLogged = await getObject(ALWAYS_LOGGED_KEY);

      if (userId !== null) {
        console.debug(`Has UserId`);

        if (isLogged) {
          console.debug(`User logged. Redirecting to Home`);
          navigation.navigate('Home', { userId });
        }

        console.debug(`Retrieving user data`);
        const userData = await getObject(USERS_KEY);

        if (userData.public_id === userId) {
          console.log(`Set user`);
          setUser(userData);
        }
        return;
      }
      // await destroy(USERS_KEY);
      console.debug(`Not user found`);

      const k = await getAllKeys();
      console.log(`Keys ${JSON.stringify(k)}`);
    }

    async function fetchAccess() {
      const isFirstAccess = await getObject(FIRST_ACCESS_KEY);

      if (!isFirstAccess && isFirstAccess !== null) {
        console.debug(`Not First Access`);
        return;
      }

      console.debug(`First Access`);
      navigation.navigate('SignUp');
    }

    fetchUser();
    fetchAccess();
  }, [lastUpdate]);

  const showMessage = (title, body) => {
    Alert.alert(title, body);
  };

  const showValidationMessage = body => {
    showMessage('Campo obrigatório não informado', body);
  };

  const redirect = async () => {
    await store(LAST_UPDATE_KEY, new Date());
    console.log(`USER before Login ${JSON.stringify(user)}`);
    if (username.trim().length === 0) {
      showValidationMessage('Usuário não informado');
      return;
    }

    if (password.length === 0) {
      showValidationMessage('Senha não informada');
      return;
    }

    if (user === null) {
      showMessage('Usuário não existente', 'Verifique os dados informados ou crie um novo usuário');
      return;
    }

    if (password !== user.password || username !== user.username) {
      console.log(`Invalid credentials`);

      showMessage(
        'Credenciais inválidas',
        'Usuário ou senha não coincidem. Verifique suas credenciais'
      );
      return;
    }

    user.alwaysLogged = alwaysLogged;

    await store(USERS_KEY, user);

    setUsername('');
    setPassword('');
    console.debug(`USER ${JSON.stringify(user)}`);
    navigation.navigate('Home', { userId: user.public_id });
  };

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <InputText
        placeholder="Usuário"
        style={{ marginBottom: 15 }}
        value={username}
        onChangeText={e => setUsername(e.trim())}
      />
      <InputText
        placeholder="Senha"
        password
        value={password}
        onChangeText={e => setPassword(e.trim())}
      />
      <CheckBox
        style={{ paddingVertical: 20 }}
        onClick={() => setAlwaysLogged(!alwaysLogged)}
        isChecked={alwaysLogged}
        rightText={'Manter logado'}
      />
      <Button title="Acessar" onPress={redirect} />
      <Text style={{ alignSelf: 'center', fontSize: 20, marginVertical: 12 }}>OU</Text>
      <Button title="Cadastrar" onPress={() => navigation.navigate('SignUp')} />
    </Layout>
  );
}

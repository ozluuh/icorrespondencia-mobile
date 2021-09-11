import React, { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import { getObject, setItem } from '../utils/storage';

export default function Login({ navigation }) {
  const KEY = 'isFirstAccess';

  const [user, setUser] = useState();
  const [alwaysLogged, setAlwaysLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const u = await getObject('USER');

      if (u !== null) {
        console.debug(`Has User`);
        setUser(u);

        if (user?.alwaysLogged) {
          console.debug(`User logged. Redirecting to Home`);
          navigation.navigate('Home');
        }
      }
    }

    async function fetchAccess() {
      const t = await getObject(KEY);

      if (!t) {
        console.debug(`Not First Access`);
        return;
      }

      console.debug(`First Access`);
      await setItem(KEY, false);
      navigation.navigate('SignUp');
    }

    fetchUser();
    fetchAccess();
  }, []);

  const showMessage = (title, body) => {
    Alert.alert(title, body);
  };

  const showValidationMessage = body => {
    showMessage('Campo obrigatório não informado', body);
  };

  const redirect = () => {
    if (username.trim().length === 0) {
      showValidationMessage('Usuário não informado');
      return;
    }

    if (password.length === 0) {
      showValidationMessage('Senha não informada');
      return;
    }

    if (password !== user.password || username !== user.username) {
      showMessage(
        'Credenciais inválidas',
        'Usuário ou senha não coincidem. Verifique suas credenciais'
      );
      return;
    }

    user.alwaysLogged = alwaysLogged;

    navigation.navigate('Home', { user });
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

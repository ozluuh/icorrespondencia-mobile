import React, { useContext, useState } from 'react';
import CheckBox from 'react-native-check-box';

import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { ALWAYS_LOGGED_KEY, USER_PUBLIC_ID_LOGGED_KEY } from '../config/keys';
import { UserContext } from '../context/UserContext';
import { getUserByUsernameAndPassword } from '../utils/api';
import { showMessage } from '../utils/message';
import { storeOrUpdate } from '../utils/storage';

export default function Login({ navigation }) {
  const [alwaysLogged, setAlwaysLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(UserContext);

  const validation = () => {
    if (username.length === 0) {
      throw new Error('Usuário deve ser preenchido');
    }
    if (password.length === 0) {
      throw new Error('Senha deve ser preenchida');
    }
  };

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setAlwaysLogged(false);
  };

  const login = async () => {
    try {
      validation();
      const user = await getUserByUsernameAndPassword({ username, password });

      if (user === null) {
        throw new Error('Usuário não registrado');
      }

      context.setUser(user);

      if (alwaysLogged) {
        storeOrUpdate(ALWAYS_LOGGED_KEY, true);
        storeOrUpdate(USER_PUBLIC_ID_LOGGED_KEY, user.public_id);
        storeOrUpdate(user.public_id, user);
      }

      resetFields();

      navigation.navigate('Home');
    } catch (error) {
      showMessage(error.message);
    }
  };

  return (
    <Layout style={{ justifyContent: 'center', paddingHorizontal: 12 }}>
      <InputText
        placeholder="Usuário"
        style={{ marginBottom: 15 }}
        value={username}
        onChangeText={e => setUsername(e.trim())}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <InputText
        placeholder="Senha"
        password
        value={password}
        onChangeText={e => setPassword(e.trim())}
        style={{ marginBottom: 15 }}
      />
      <CheckBox
        style={{ paddingVertical: 20, display: 'none' }}
        onClick={() => setAlwaysLogged(prev => !prev)}
        isChecked={alwaysLogged}
        rightText={'Manter conectado'}
      />
      <Button title="Acessar" onPress={login} />
      <Link title="Ainda não possui acesso?" onClick={() => navigation.navigate('SignUp')} />
    </Layout>
  );
}

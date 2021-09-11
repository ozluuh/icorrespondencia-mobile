import React, { useState } from 'react';
import { Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import { v4 as uuid } from 'uuid';
import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import { FIRST_ACCESS_KEY, LAST_UPDATE_KEY, USERID_LOGGED_KEY, USERS_KEY } from '../config/keys';
import { showMessage, showValidationMessage } from '../utils/message';
import { getObject, store } from '../utils/storage';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysLogged, setAlwaysLogged] = useState(false);

  const register = async () => {
    if (name.trim().length === 0) {
      showValidationMessage('Nome deve ser informado');
      return;
    }
    if (email.trim().length === 0) {
      showValidationMessage('E-mail deve ser informado');
      return;
    }
    if (username.trim().length === 0) {
      showValidationMessage('Usuário deve ser informado');
      return;
    }
    if (password.trim().length === 0) {
      showValidationMessage('Senha deve ser informada');
      return;
    }

    let stored_user = (await getObject(USERS_KEY)) || {};

    if (stored_user !== null) {
      if (stored_user.email === email) {
        showMessage('Email já cadastrado', 'Cadastre outro email ou realize o acesso');
        return;
      }

      if (stored_user.username === username) {
        showMessage('Usuário já cadastrado', 'Cadastre outro usuário ou realize o acesso');
        return;
      }
    }

    const user = { name, email, username, password, public_id: uuid(), alwaysLogged };
    const registerTime = new Date();

    await store(USERS_KEY, user);
    await store(USERID_LOGGED_KEY, user.public_id);
    console.debug(`Registered user: ${user.public_id} at ${registerTime}`);
    await store(FIRST_ACCESS_KEY, false);
    console.debug(`First access set to false`);
    await store(LAST_UPDATE_KEY, registerTime);
    navigation.navigate('Home', { userId: user.public_id });
  };

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <InputText
        placeholder="Nome"
        style={{ marginBottom: 15 }}
        value={name}
        onChangeText={setName}
      />
      <InputText
        placeholder="Email"
        style={{ marginBottom: 15 }}
        value={email}
        onChangeText={e => setEmail(e.trim())}
      />
      <InputText
        placeholder="Usuário"
        style={{ marginBottom: 15 }}
        value={username}
        onChangeText={e => setUsername(e.trim())}
      />
      <InputText
        placeholder="Senha"
        style={{ marginBottom: 15 }}
        value={password}
        onChangeText={e => setPassword(e.trim())}
        password
      />
      <CheckBox
        style={{ marginBottom: 10 }}
        onClick={() => setAlwaysLogged(!alwaysLogged)}
        isChecked={alwaysLogged}
        rightText={'Manter conectado'}
      />
      <Button title="Cadastrar e Acessar" onPress={register} />
      <Text style={{ alignSelf: 'center', fontSize: 20, marginVertical: 12 }}>OU</Text>
      <Button title="Acessar" onPress={navigation.goBack} />
    </Layout>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { v4 as uuid } from 'uuid';
import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import { setItem } from '../utils/storage';

export default function SignUp({ navigation }) {
  const KEY = 'USER';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysLogged, setAlwaysLogged] = useState(false);

  const showValidationMessage = body => {
    Alert.alert('Campo obrigatório não preenchido', body);
  };

  const register = () => {
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

    const user = Object.assign(
      {},
      { name, email, username, password, public_id: uuid(), alwaysLogged }
    );
    setItem(KEY, user);
    console.debug(`Registered user: ${user.public_id}`);
    navigation.navigate('Home', { user: user });
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
        rightText={'Manter logado'}
      />
      <Button title="Cadastrar e Acessar" onPress={() => register()} />
      <Text style={{ alignSelf: 'center', fontSize: 20, marginVertical: 12 }}>OU</Text>
      <Button title="Acessar" onPress={navigation.goBack} />
    </Layout>
  );
}

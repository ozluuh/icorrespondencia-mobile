import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import { FIRST_ACCESS_KEY, LAST_UPDATE_KEY, USERS_KEY } from '../config/keys';
import { getAllKeys, getObject, purgeAll, store } from '../utils/storage';

export default function Profile({ navigation, route }) {
  const { userId } = route.params;
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysLogged, setAlwaysLogged] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const u = await getObject(USERS_KEY);

      setId(u.public_id);
      setName(u.name);
      setUsername(u.username);
      setEmail(u.email);
      setPassword(u.password);
      setAlwaysLogged(u.alwaysLogged);

      console.log(`USER ${JSON.stringify(u)}`);
    }

    fetchUser();
  }, []);

  const showValidationMessage = body => {
    Alert.alert('Campo obrigatório não preenchido', body);
  };

  const update = async () => {
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

    const updated = Object.assign(
      {},
      { name, email, username, password, alwaysLogged, public_id: id }
    );
    const updateTime = new Date();
    await store(USERS_KEY, updated);
    await store(LAST_UPDATE_KEY, updateTime);
    console.debug(`Updated user: ${id} at ${updateTime}`);
    navigation.goBack();
  };
  
  const remove = async () => {
    const firstAccess = await getObject(FIRST_ACCESS_KEY);
    const updateTime = new Date();
    await purgeAll();
    await store(FIRST_ACCESS_KEY, firstAccess);
    await store(LAST_UPDATE_KEY, updateTime);
    const k = await getAllKeys();
    console.debug(`Purged at ${updateTime}`);
    console.log(`Keys ${JSON.stringify(k)}`)
    navigation.popToTop();

  };

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <InputText placeholder="Id" style={{ marginBottom: 15 }} value={id} disabled />
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
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
        <Button title="Atualizar" style={{ marginRight: 10, flex: 1 }} onPress={update} />
        <Button title="Excluir" style={{ flex: 1, backgroundColor: '#F00' }} onPress={remove} />
      </View>
    </Layout>
  );
}

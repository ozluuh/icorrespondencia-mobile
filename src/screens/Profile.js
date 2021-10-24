import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import CheckBox from 'react-native-check-box';

import Button from '../components/Button';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import { ALWAYS_LOGGED_KEY, USER_PUBLIC_ID_LOGGED_KEY } from '../config/keys';
import { UserContext } from '../context/UserContext';
import { updateUser } from '../utils/api';
import { showMessage } from '../utils/message';
import { getObject, storeOrUpdate } from '../utils/storage';

export default function Profile({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysLogged, setAlwaysLogged] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  const context = useContext(UserContext);

  useEffect(() => {
    setLoading(true);

    async function fetchUser() {
      const u = context.user;

      setUser(u);

      setName(u.name);
      setEmail(u.email);
      setPassword(u.password);

      const isLogged = await getObject(ALWAYS_LOGGED_KEY);

      if (isLogged) {
        setAlwaysLogged(u.alwaysLogged);
      }

      setLoading(prev => !prev);
    }

    fetchUser();
  }, []);

  const validate = () => {
    if (name.trim().length === 0) {
      throw new Error('Nome deve ser informado');
    }
    if (email.trim().length === 0) {
      throw new Error('E-mail deve ser informado');
    }
    if (password.trim().length === 0) {
      throw new Error('Senha deve ser informada');
    }
  };

  const update = async () => {
    try {
      validate();
    } catch (error) {
      showMessage(error.message);
    }

    const updated = Object.assign(user, { name, email, password });

    await updateUser(updated);

    if (alwaysLogged) {
      await storeOrUpdate(user.public_id, updated);
      await storeOrUpdate(USER_PUBLIC_ID_LOGGED_KEY, user.public_id);
      await storeOrUpdate(ALWAYS_LOGGED_KEY, true);
    }

    navigation.goBack();
  };

  if (isLoading) {
    return (
      <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </Layout>
    );
  }

  return (
    <Layout style={{ justifyContent: 'center', paddingHorizontal: 12 }}>
      <InputText placeholder="Id" style={{ marginBottom: 15 }} value={user?.public_id} disabled />
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
        value={user?.username}
        disabled
      />
      <InputText
        placeholder="Senha"
        style={{ marginBottom: 15 }}
        value={password}
        onChangeText={e => setPassword(e.trim())}
        password
      />
      <InputText
        placeholder="Condomínio"
        style={{ marginBottom: 15 }}
        value={user?.role?.townhouse?.name}
        disabled
      />
      <InputText
        placeholder="Apartamento"
        style={{ marginBottom: 15 }}
        value={user?.role?.room?.number.toString()}
        disabled
      />
      <CheckBox
        style={{ marginBottom: 15, display: 'none' }}
        onClick={() => setAlwaysLogged(!alwaysLogged)}
        isChecked={alwaysLogged}
        rightText={'Manter conectado'}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          title="Atualizar"
          style={{ marginRight: 10, flex: 1 }}
          textColor="#fff"
          onPress={update}
        />
        <Button
          title="Sair"
          style={{ marginRight: 10, flex: 1 }}
          backgroundColor="#FF474E"
          textColor="#fff"
          onPress={navigation.popToTop}
        />
      </View>
    </Layout>
  );
}

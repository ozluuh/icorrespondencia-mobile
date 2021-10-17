import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-check-box';

import Button from '../components/Button';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { ALWAYS_LOGGED_KEY, USER_PUBLIC_ID_LOGGED_KEY } from '../config/keys';
import { UserContext } from '../context/UserContext';
import { createUser, getTownhouseByPublicId, getTownhouses } from '../utils/api';
import { showMessage } from '../utils/message';
import { store } from '../utils/storage';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysLogged, setAlwaysLogged] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [townhouses, setTownhouses] = useState([]);
  const [selectedTownhouse, setSelectedTownhouse] = useState();

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();

  const context = useContext(UserContext);

  useEffect(() => {
    setLoading(true);

    async function fetchTownhouses() {
      const response = await getTownhouses();

      if (response.length <= 0) {
        return;
      }

      const parsedResponse = response.map(item =>
        Object.assign({}, { label: item.name, value: item.public_id, townhouse: item })
      );

      setTownhouses(parsedResponse);
      setLoading(prev => !prev);
    }

    fetchTownhouses();
  }, []);

  useEffect(() => {
    setLoading(true);

    async function fetchRooms() {
      const response = await getTownhouseByPublicId(selectedTownhouse);

      if (response == null) {
        return;
      }

      const parsedResponse = [];

      response.blocks.map(b =>
        b.rooms.map(r =>
          parsedResponse.push(Object.assign({}, { label: `${r.number} - ${b.name}`, value: r.id, number: r.number }))
        )
      );

      setRooms(parsedResponse);
      setLoading(false);
    }

    fetchRooms();
  }, [selectedTownhouse]);

  const validation = () => {
    if (name.trim().length === 0) {
      throw new Error('Nome deve ser informado');
    }
    if (email.trim().length === 0) {
      throw new Error('E-mail deve ser informado');
    }
    if (username.trim().length === 0) {
      throw new Error('Usuário deve ser informado');
    }
    if (password.trim().length === 0) {
      throw new Error('Senha deve ser informada');
    }
  };

  const register = async () => {
    try {
      validation();
    } catch (error) {
      showMessage(error.message);
      return;
    }

    const newUser = {
      name,
      username,
      password,
      email,
      role: { townhouse: { id: selectedTownhouse }, room: { id: selectedRoom } },
    };

    let response;

    try {
      response = await createUser(newUser);

      response.role.room["number"] = rooms.filter(item => item.value === selectedRoom)[0].number;
      response.role.townhouse = townhouses.filter(item => item.value === selectedTownhouse)[0].townhouse;

      context.setUser(response);

      if (alwaysLogged) {
        store(ALWAYS_LOGGED_KEY, true);
        store(USER_PUBLIC_ID_LOGGED_KEY, response.public_id);
        store(response.public_id, response);
      }

      navigation.navigate('Home');
    } catch (error) {
      showMessage(error.message);
    }
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
      {townhouses.length > 0 && (
        <DropDown
          placeholder={{ value: null, label: 'Selecione o condomínio' }}
          items={townhouses}
          selectedItem={selectedTownhouse}
          onItemChange={setSelectedTownhouse}
          style={{ marginBottom: 15 }}
        />
      )}
      {selectedTownhouse && rooms.length > 0 && (
        <DropDown
          placeholder={{ value: null, label: 'Selecione o apartamento' }}
          items={rooms}
          selectedItem={selectedRoom}
          onItemChange={setSelectedRoom}
          style={{ marginBottom: 15 }}
        />
      )}
      <CheckBox
        style={{ marginBottom: 10 }}
        onClick={() => setAlwaysLogged(prev => !prev)}
        isChecked={alwaysLogged}
        rightText={'Manter conectado'}
      />
      <Button title="Cadastrar" onPress={register} />
      <Link title="Já possui acesso?" textDecoration onClick={() => navigation.navigate('Login')} />
    </Layout>
  );
}

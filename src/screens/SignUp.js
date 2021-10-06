import React, { useEffect, useState } from 'react';
import CheckBox from 'react-native-check-box';

import Button from '../components/Button';
import DropDown from '../components/DropDown';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import Link from '../components/Link';
import { getTownhouses } from '../utils/api';
import { showMessage } from '../utils/message';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysLogged, setAlwaysLogged] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [townhouses, setTownhouses] = useState([]);
  const [selectedTownhouse, setSelectedTownhouse] = useState();

  useEffect(() => {
    setLoading(true);
    async function fetchTownhouses() {
      const response = await getTownhouses();

      setTownhouses(response);
      setLoading(false);
    }

    fetchTownhouses();
  }, []);

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

      console.log('Sucesso');
    } catch (error) {
      showMessage(error.message);
    }
  };

  if (isLoading) {
    return null;
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
      <DropDown
        label="Selecione o condomínio"
        items={townhouses}
        selectedItem={selectedTownhouse}
        onItemChange={setSelectedTownhouse}
        keyExtractor={townhouse => townhouse.public_id}
        itemLabelExtractor={townhouse => townhouse.name}
        itemValueExtractor={townhouse => townhouse.public_id}
        style={{ marginBottom: 15 }}
      />
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

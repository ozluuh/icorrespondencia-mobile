import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button';
import Layout from '../components/Layout';
import { USERS_KEY } from '../config/keys';
import { getObject } from '../utils/storage';

export default function Home({ navigation, route }) {
  const [user, setUser] = useState();
  const { userId } = route.params;

  useEffect(() => {
    async function fetchUser() {
      const userData = await getObject(USERS_KEY);

      setUser(userData);
    }

    fetchUser();
  }, []);

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <Text style={{ fontSize: 22 }}>Bem-vindo, {user?.name}!</Text>
      <Text style={{ fontWeight: 'bold' }}>
        A aplicação encontra-se em versão pre-alpha ainda mas logo você poderá visualizar a
        dashboard aqui.
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
        <Button
          title="Perfil"
          style={{ marginRight: 10, flex: 1 }}
          onPress={() => navigation.navigate('Profile', { user })}
        />
        <Button
          title="Sair"
          style={{ flex: 1, backgroundColor: '#F00' }}
          onPress={navigation.popToTop}
        />
      </View>
    </Layout>
  );
}

import React from 'react';
import { Text } from 'react-native';
import Button from '../components/Button';
import Layout from '../components/Layout';

export default function Home({ navigation, route }) {
  const { user } = route.params;

  return (
    <Layout style={{ justifyContent: 'center' }}>
      <Text>Bem-vindo {user.name}!</Text>
      <Text>
        A aplicação encontra-se em versão pre-alpha ainda mas logo você poderá visualizar suas
        informações aqui.
      </Text>
      <Text>
        Caso tenha visto essa tela direto, saiba que a opção de manter-se logado no sistema se
        encontra ativa, você pode desabilitá-la clicando abaixo.
      </Text>
      <Button title="Limpar acesso" />
      <Button title="Sair" onPress={navigation.popToTop} />
    </Layout>
  );
}

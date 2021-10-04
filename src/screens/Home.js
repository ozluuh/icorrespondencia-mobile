import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import DashCard from '../components/DashCard';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';

export default function Home({ navigation, route }) {

  const context = useContext(UserContext);

  return (
    <Layout>
      <View style={{ marginBottom: 24 }}>
        <Text>condomínio: Alphaville</Text>
        <Text>Bloco: D</Text>
        <Text>Apartamento: 35</Text>
        <Text>User: {context.user?.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <DashCard />
        <DashCard />
      </View>
    </Layout>
  );
}

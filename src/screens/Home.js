import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import DashCard from '../components/DashCard';
import Layout from '../components/Layout';
import ListItem from '../components/ListItem';
import { UserContext } from '../context/UserContext';
import { getMailings } from '../utils/api';

export default function Home() {
  const [mailings, setMailings] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const context = useContext(UserContext);

  useEffect(() => {
    setLoading(true);

    async function fetchMailings() {
      const response = await getMailings(context.user.public_id);

      setMailings(response);
      setLoading(prev => !prev);
    }

    fetchMailings();
  }, []);

  if (isLoading) {
    return (
      <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </Layout>
    );
  }

  return (
    <Layout style={{ paddingHorizontal: 12 }}>
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <DashCard title="Total (Dia)" icon="envelope" value={7} />
        <DashCard title="Total (Mês)" icon="envelope" value={12} style={{ marginLeft: 10 }} />
      </View>

      {mailings.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16 }}>Sem correspondências no momento..</Text>
        </View>
      )}

      {mailings.length > 0 && (
        <FlatList
          keyExtractor={item => `${item.id}`}
          data={mailings}
          renderItem={({ item }) => <ListItem item={item} />}
          ItemSeparatorComponent={() => (
            <View style={{ flex: 1, height: 1, backgroundColor: '#201335' }}></View>
          )}
        />
      )}
    </Layout>
  );
}

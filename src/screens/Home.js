import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import DashCard from '../components/DashCard';
import Layout from '../components/Layout';
import ListItem from '../components/ListItem';
import { UserContext } from '../context/UserContext';
import { getMailings, setMailingRead } from '../utils/api';

export default function Home() {
  const [mailings, setMailings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [mailingDay, setMailingDay] = useState(0);
  const [mailingMonth, setMailingMonth] = useState(0);

  const context = useContext(UserContext);

  const handleReadMailing = async mailing_id => {
    const { public_id: user_id } = context.user;

    await setMailingRead({ user_id, mailing_id });

    setMailings(prev => prev.filter(item => item.id !== mailing_id));
  };

  useEffect(() => {
    setLoading(true);

    async function fetchMailings() {
      const response = await getMailings(context.user.public_id);

      const day = new Date().getDate();
      const month = new Date().getMonth();
      let dayAmount = 0,
        monthAmount = 0;

      response.forEach(item => {
        const delivery = new Date(item.deliveryDate);

        if (delivery.getDate() === day) {
          dayAmount++;
        }

        if (delivery.getMonth() === month) {
          monthAmount++;
        }
      });

      console.log(dayAmount);

      setMailingDay(dayAmount);
      setMailingMonth(monthAmount);

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
        <DashCard title="Total (Dia)" icon="envelope" value={mailingDay} />
        <DashCard
          title="Total (Mês)"
          icon="envelope"
          value={mailingMonth}
          style={{ marginLeft: 10 }}
        />
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
          renderItem={({ item }) => (
            <ListItem item={item} handleLeftOpen={() => handleReadMailing(item.id)} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ flex: 1, height: 1, backgroundColor: '#201335' }}></View>
          )}
        />
      )}
    </Layout>
  );
}

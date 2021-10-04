import React from 'react';
import { Text, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { styles } from './style';

export default function DashCard() {
  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1}}>
        <Text style={{ textAlign: 'center' }}>Total (Dia)</Text>
      </View>
      <View style={[styles.row, styles.alignBaseline]}>
        <FontAwesome name="envelope" size={28} />
        <Text style={styles.text}>7</Text>
      </View>
    </View>
  );
}

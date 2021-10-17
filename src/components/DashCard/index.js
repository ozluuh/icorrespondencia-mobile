import React from 'react';
import { Text, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { styles } from './style';

export default function DashCard({ title, icon, value }) {
  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 1 }}>
        <Text style={{ textAlign: 'center' }}>{title}</Text>
      </View>
      <View style={[styles.row, styles.alignBaseline]}>
        <FontAwesome name={icon} size={28} />
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
}

DashCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  value: PropTypes.any.isRequired,
};

DashCard.defaultProps = {
  icon: 'envelope',
};

import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

import Icon from '../Icon';

import { styles } from './style';
export default function DashCard({ title, icon, value, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={{ borderBottomWidth: 1 }}>
        <Text style={{ textAlign: 'center' }}>{title}</Text>
      </View>
      <View style={[styles.row, styles.alignBaseline]}>
        <Icon name={icon} size={28} />
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
}

DashCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  value: PropTypes.any.isRequired,
  style: ViewPropTypes.style,
};

DashCard.defaultProps = {
  icon: 'envelope',
};

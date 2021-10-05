import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity, ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';


export default function Button({ title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#0af',
  },
  text: {
    fontSize: 16,
  },
  link: {
    backgroundColor: '#a0f',
    padding: 12,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  onPress: () => {},
};

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

export default function Button({ title, style, onPress, textColor, backgroundColor }) {
  return (
    <TouchableOpacity
      style={[styles.container, style, { backgroundColor: backgroundColor || '#0af' }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor || '#fff' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 3,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

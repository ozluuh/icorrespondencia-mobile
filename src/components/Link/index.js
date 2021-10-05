import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from './style';

export default function Link({ title, onClick, textDecoration }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onClick}>
        <Text style={[styles.text, { textDecorationLine: textDecoration ? 'underline' : 'none' }]}>
          {title}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

Link.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  textDecoration: PropTypes.bool,
};

Link.defaultProps = {
  onClick: () => {},
  textDecoration: false,
};

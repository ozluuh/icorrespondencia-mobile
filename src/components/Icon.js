import React from 'react';
import { ViewPropTypes } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default function Icon({ name, size, style }) {
  return <FontAwesome name={name} size={size} style={style} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: ViewPropTypes.style,
};

Icon.defaultProps = {
  size: 18,
};

import React from 'react';
import { Text, ViewPropTypes } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import Icon from '../Icon';

import { styles } from './style';

export default function HeaderAction({ icon, onPress, leftText, rightText, textStyle, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {leftText && <Text style={textStyle}>{leftText}</Text>}
      <Icon name={icon} style={{ marginLeft: leftText ? 5 : 0, marginRight: rightText ? 5 : 0 }} />
      {rightText && <Text style={textStyle}>{rightText}</Text>}
    </TouchableOpacity>
  );
}

HeaderAction.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  textStyle: PropTypes.object,
  style: ViewPropTypes.style,
};

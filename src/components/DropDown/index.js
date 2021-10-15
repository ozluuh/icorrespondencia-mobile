import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import Picker from 'react-native-picker-select';

import PropTypes from 'prop-types';

import { styles } from './style';

export default function DropDown({ selectedItem, onItemChange, items, style, placeholder = {} }) {
  return (
    <View style={[styles.container, style]}>
      <Picker
        placeholder={placeholder}
        value={selectedItem}
        onValueChange={onItemChange}
        items={items}
        style={{ inputAndroid: { color: 'black' } }}
      />
    </View>
  );
}

DropDown.propTypes = {
  selectedItem: PropTypes.any,
  onItemChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  style: ViewPropTypes.style,
  placeholder: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
};

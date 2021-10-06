import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import { styles } from './style';

export default function DropDown({
  label,
  selectedItem,
  onItemChange,
  items,
  keyExtractor,
  itemLabelExtractor,
  itemValueExtractor,
  style
}) {
  return (
    <View style={[styles.container, style]}>
      <Picker
        prompt={label}
        selectedValue={selectedItem}
        onValueChange={onItemChange}
      >
        {label && <Picker.Item label={label} enabled={false} />}

        {items.map(item => (
          <Picker.Item
            key={keyExtractor(item)}
            label={itemLabelExtractor(item)}
            value={itemValueExtractor(item)}
          />
        ))}
      </Picker>
    </View>
  );
}

DropDown.propTypes = {
  label: PropTypes.string,
  selectedItem: PropTypes.any,
  onItemChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  itemLabelExtractor: PropTypes.func.isRequired,
  itemValueExtractor: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

DropDown.defaultProps = {
  label: null,
};

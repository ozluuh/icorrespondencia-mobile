import React from 'react';
import { Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import PropTypes from 'prop-types';

import { styles } from './style';

export default function ListItem({ item, handleLeftOpen }) {
  const parseDate = date => {
    return date.replace(
      /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})[tT](?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})\.?\d+$/,
      '$<day>/$<month>/$<year> $<hour>:$<minute>'
    );
  };

  const LeftActions = () => (
    <View style={styles.leftActionContainer}>
      <Text style={styles.leftActionText}>Lido</Text>
    </View>
  );

  return (
    <Swipeable renderLeftActions={LeftActions} onSwipeableLeftOpen={handleLeftOpen}>
      <View style={styles.container}>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{parseDate(item.deliveryDate)}</Text>
      </View>
    </Swipeable>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    deliveryDate: PropTypes.string.isRequired,
  }),
  handleLeftOpen: PropTypes.func,
};

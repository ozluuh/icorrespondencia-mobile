import React from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from './style';

export default function Layout({ children, style }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

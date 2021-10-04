import React from 'react';
import { SafeAreaView, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from './style';



export default function Layout({ children, style }) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

Layout.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

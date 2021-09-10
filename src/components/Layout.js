import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Layout({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#e7e7e7',
    flex: 1,
  },
});

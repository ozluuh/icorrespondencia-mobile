import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function InputText({
  placeholder,
  enableAutoCorrect,
  onChangeText,
  value,
  style,
  password = false,
  disabled = false
}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={password}
        editable={!disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
});

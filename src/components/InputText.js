import React from 'react';
import { StyleSheet, TextInput, View, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

export default function InputText({
  placeholder,
  onChangeText,
  value,
  style,
  password,
  disabled,
  autoCapitalize,
  correct,
}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={password}
        editable={!disabled}
        autoCapitalize={autoCapitalize}
        autoCorrect={correct}
      />
    </View>
  );
}

InputText.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  password: PropTypes.bool,
  disabled: PropTypes.bool,
  autoCapitalize: PropTypes.oneOf(['sentences', 'characters', 'words', 'none']),
  correct: PropTypes.bool,
};

InputText.defaultProps = {
  placeholder: 'Enter text...',
  password: false,
  disabled: false,
  autoCapitalize: 'sentences',
  correct: true,
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
});

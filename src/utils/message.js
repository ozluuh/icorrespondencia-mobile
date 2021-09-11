import { Alert } from 'react-native';

export const showMessage = (title, message) => Alert.alert(title, message);
export const showValidationMessage = (message, title = null) =>
  showMessage(title || 'Campo obrigatório não preenchido', message);

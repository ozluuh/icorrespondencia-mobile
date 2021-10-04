import { Alert } from 'react-native';

export const showMessage = (message, title = 'Erro') => Alert.alert(title, message);

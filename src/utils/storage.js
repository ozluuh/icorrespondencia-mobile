import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key, callback) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    callback(e);
  }
};

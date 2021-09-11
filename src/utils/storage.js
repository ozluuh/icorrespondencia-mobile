import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw new Error(e || 'Error from getItem');
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error(e || 'Error from setItem');
  }
};

export const getObject = async key => {
  try {
    const response = await getItem(key);
    return JSON.parse(response);
  } catch (e) {
    throw new Error(e);
  }
};

export const purge = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error(e || 'Error from purge');
  }
};

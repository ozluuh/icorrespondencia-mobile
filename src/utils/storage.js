import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw new Error(e || 'Error from getItem');
  }
};

export const store = async (key, value) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    throw new Error(e || 'Error from setItem');
  }
};

export const getObject = async key => {
  try {
    const response = await getItem(key);
    return response !== null ? JSON.parse(response) : null;
  } catch (e) {
    throw new Error(e || 'Error from getObject');
  }
};

export const destroy = async key => {
  try {
    console.debug(`Destroy called`);
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error(e || 'Error from purge');
  }
};

export const purgeAll = async () => {
  try {
    console.debug(`Purge called`);
    await AsyncStorage.clear();
  } catch (e) {
    throw new Error(e || 'Error from purgeAll');
  }
};

export const getAllKeys = async () => {
  try {
    console.debug(`Keys called`);
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    throw new Error(e || 'Error from getAllKeys');
  }
};

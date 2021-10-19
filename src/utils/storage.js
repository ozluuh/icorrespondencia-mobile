import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async key => {
  try {
    console.log(`Retrieved KEY ${key}`);

    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw new Error(e || 'Error from getItem');
  }
};

export const store = async (key, value) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
    console.log(`Stored KEY ${key}`);
  } catch (e) {
    throw new Error(e || 'Error from setItem');
  }
};

export const getObject = async key => {
  try {
    const response = await getItem(key);

    if (response === null) {
      return null;
    }

    return JSON.parse(response);
  } catch (e) {
    throw new Error(e || 'Error from getObject');
  }
};

export const destroy = async key => {
  try {
    console.debug(`Destroyed data of KEY ${key}`);
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error(e || 'Error from purge');
  }
};

export const purgeAll = async () => {
  try {
    console.debug(`Purged all KEYS`);
    await AsyncStorage.clear();
  } catch (e) {
    throw new Error(e || 'Error from purgeAll');
  }
};

export const getAllKeys = async () => {
  try {
    console.debug(`Retrieved all KEYS`);
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    throw new Error(e || 'Error from getAllKeys');
  }
};

export const storeOrUpdate = async (key, value) => {
  try {
    let data = await getItem(key);

    if(data === null) {
      store(key, value);
      return;
    }

    data = JSON.stringify(value);

    console.log(`Merged KEY ${key}`);
    await AsyncStorage.mergeItem(key, data);
  } catch (e) {
    throw new Error(e || 'Error from storeOrUpdate');
  }
}
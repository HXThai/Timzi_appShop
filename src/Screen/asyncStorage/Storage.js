import AsyncStorage from '@react-native-async-storage/async-storage';
export default storage = {
  getItem: async (key) => {
    try {
      let result = await AsyncStorage.getItem(key);
      // console.log(result);
      if (result) {
        // console.log(JSON.parse(result));
        return JSON.parse(result);
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  },
  setItem: async (key, value) => {
    try {
      const item = JSON.stringify(value);
      // console.log(item);
      return await AsyncStorage.setItem(key, item);
    } catch (e) {
      throw e;
    }
  },
};

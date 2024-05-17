import AsyncStorage from "@react-native-async-storage/async-storage";

class localStorage {
  constructor() {}

  async getUserID() {
    let ID = "";
    try {
      const value = await AsyncStorage.getItem("UserID");
      if (value !== null) {
        // We have data!!
        ID = value;
        // console.log('testing => ', value)
        return ID;
      } else {
        console.log("NON data");
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  }

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  }

  async ClearLocalStorage() {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.error(err)
    }
  }
}

const LocalStorage = new localStorage();

export default LocalStorage;

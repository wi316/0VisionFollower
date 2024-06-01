import AsyncStorage from "@react-native-async-storage/async-storage";

class localStorage {
  constructor() {}

  async getUserID() {
    let ID = "";
    try {
      const value = await AsyncStorage.getItem("UserID");
      if (value !== null) {
        
        ID = value;
        
        return ID;
      } else {
        console.log("NON data");
      }
    } catch (error) {
      
      console.error(error);
    }
  }

  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      
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

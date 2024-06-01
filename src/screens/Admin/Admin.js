import { View, Text, FlatList } from "react-native";
import { Style } from "./Admin.Style";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Cards from "../../Components/Cards/Cards";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../../Config/FireBaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";

import LocalStorage from "../../utils/LocalStorage";

const Admin = (props) => {
  const { User } = props;
  const [data, setData] = useState([]);

  const navigation = useNavigation(); 

  useEffect(() => { 
    const getData = async () => { 
      const data = []; 
      const q = query( 
        collection(FIREBASE_FIRESTORE, "users"),
        where("Type", "==", "Patient")
      );

      const querySnapshot = await getDocs(q); 
      querySnapshot.forEach((doc) => { 
        data.push({ id: doc.id, ...doc.data() }); 
      });

      setData(data); 
    };

    getData(); 
  }, []);


  return (
    <View style={Style.container}>
      <View style={Style.AppBar}>
        <Text style={Style.AppBarText}>Hello, {`${User.Name}`} 👋</Text>
        <Button
          title="Logout"
          onPress={() => {
            LocalStorage.ClearLocalStorage() 
            FIREBASE_AUTH.signOut(); 
          }}
        />
      </View>
      <Text style={Style.Patients}>your Patients</Text>
      <View style={Style.Cards}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Cards
              User={item}
              onPress={() => {
                navigation.navigate("ClientDetails", {
                  User: item,
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Admin;

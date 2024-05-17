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

  const navigation = useNavigation(); // Initialisation du hook de navigation

  useEffect(() => { // Utilisation du hook useEffect pour charger les données une seule fois au montage du composant
    const getData = async () => { // Définition de la fonction asynchrone pour récupérer les données des utilisateurs
      const data = []; // Initialisation d'un tableau pour stocker les données récupérées
      const q = query( // Création d'une requête Firestore pour récupérer les utilisateurs de type "Patient"
        collection(FIREBASE_FIRESTORE, "users"),
        where("Type", "==", "Patient")
      );

      const querySnapshot = await getDocs(q); // Exécution de la requête Firestore
      querySnapshot.forEach((doc) => { // Parcours des résultats de la requête
        data.push({ id: doc.id, ...doc.data() }); // Ajout des données de chaque utilisateur au tableau
      });

      setData(data); // Mise à jour de l'état local avec les données récupérées
    };

    getData(); // Appel de la fonction pour récupérer les données au montage du composant
  }, []);


  return (
    <View style={Style.container}>
      <View style={Style.AppBar}>
        <Text style={Style.AppBarText}>Hello, {`${User.Name}`} 👋</Text>
        <Button
          title="Logout"
          onPress={() => {
            LocalStorage.ClearLocalStorage() // Effacement des données de stockage local
            FIREBASE_AUTH.signOut(); // Déconnexion de l'utilisateur
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
